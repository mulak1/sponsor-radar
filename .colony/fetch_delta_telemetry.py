#!/usr/bin/env python3
"""
Fetches and reports ONLY the live human telemetry (is_test == 0, is_owner == 0, is_crawler == 0)
that occurred between the previous query timestamp (stored in telemetry_watermark.json)
and the current query execution timestamp, formatted in PST (America/Los_Angeles).
"""
import json
import os
import subprocess
from collections import Counter
from datetime import datetime, timezone
from zoneinfo import ZoneInfo

WATERMARK_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "telemetry_watermark.json")
RAW_STATE_URL = "https://www.sponsorradar.io/api/telemetry/raw-state"
PST_TZ = ZoneInfo("America/Los_Angeles")


def iso_to_pst(iso_str: str) -> str:
    if not iso_str:
        return ""
    try:
        dt = datetime.fromisoformat(iso_str.replace("Z", "+00:00"))
        pst = dt.astimezone(PST_TZ)
        return pst.strftime("%Y-%m-%d %I:%M:%S %p %Z")
    except Exception:
        return iso_str


def is_human(row: dict) -> bool:
    return (
        int(row.get("is_test") or 0) == 0
        and int(row.get("is_owner") or 0) == 0
        and int(row.get("is_crawler") or 0) == 0
    )


def main():
    default_start = "2026-11-07T00:22:09.264Z"
    last_ts = default_start
    if os.path.exists(WATERMARK_PATH):
        try:
            with open(WATERMARK_PATH, "r", encoding="utf-8") as f:
                last_ts = json.load(f).get("last_query_ts", default_start)
        except Exception:
            pass

    now_dt = datetime.now(timezone.utc)
    now_ts = now_dt.strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z"
    out = subprocess.check_output(
        ["curl", "-sL", "-H", "X-Playwright-Test: 1", RAW_STATE_URL],
        timeout=15,
    ).decode("utf-8", errors="replace")
    data = json.loads(out)

    delta_events = []
    for e in data.get("events", []):
        if not is_human(e):
            continue
        ts = str(e.get("created_at", ""))
        if last_ts < ts <= now_ts:
            meta = e.get("meta") or {}
            if isinstance(meta, str):
                try:
                    meta = json.loads(meta)
                except Exception:
                    meta = {}
            delta_events.append({
                "id": e.get("id"),
                "created_at_pst": iso_to_pst(ts),
                "created_at_utc": ts,
                "event_type": e.get("event_type"),
                "page_url": e.get("page_url") or meta.get("path") or "/",
                "device_type": e.get("device_type") or "",
                "utm_source": e.get("utm_source") or meta.get("source") or "",
            })

    delta_leads = [
        {
            "id": l.get("id"),
            "created_at_pst": iso_to_pst(str(l.get("created_at", ""))),
            "utm_source": l.get("utm_source"),
            "summary_text": l.get("summary_text"),
        }
        for l in data.get("leads", [])
        if is_human(l) and last_ts < str(l.get("created_at", "")) <= now_ts
    ]

    delta_orders = [
        {
            "id": o.get("id"),
            "created_at_pst": iso_to_pst(str(o.get("created_at", ""))),
            "tier": o.get("tier"),
            "amount_usd": o.get("amount_usd"),
            "status": o.get("status"),
        }
        for o in data.get("orders", [])
        if is_human(o) and last_ts < str(o.get("created_at", "")) <= now_ts
    ]

    delta_events.sort(key=lambda x: x["created_at_utc"])
    counts = Counter(e["event_type"] for e in delta_events)

    with open(WATERMARK_PATH, "w", encoding="utf-8") as f:
        json.dump({"last_query_ts": now_ts, "previous_query_ts": last_ts}, f, indent=2)

    summary = {
        "window_start_pst": iso_to_pst(last_ts),
        "window_end_pst": iso_to_pst(now_ts),
        "window_start_utc": last_ts,
        "window_end_utc": now_ts,
        "human_events_in_window": len(delta_events),
        "counts_by_type": {
            "visit": counts.get("visit", 0),
            "hydrated": counts.get("hydrated", 0) + counts.get("visit_hydrated", 0),
            "calculate": counts.get("calculate", 0) + counts.get("studio_interact", 0),
            "lead_capture": len(delta_leads) or (counts.get("lead_capture", 0) + counts.get("lead", 0)),
            "paywall_view": counts.get("paywall_view", 0) + counts.get("view_paywall", 0),
            "checkout_intent": counts.get("checkout_intent", 0) + counts.get("human_stripe_checkout", 0),
            "paid_order": sum(1 for o in delta_orders if o.get("status") == "paid") or counts.get("paid_order", 0),
        },
        "events": delta_events,
        "leads": delta_leads,
        "orders": delta_orders,
    }
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
