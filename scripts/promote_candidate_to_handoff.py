#!/usr/bin/env python3
"""Copy a validated candidate YAML into handoff/ready_for_strategy_tester.

Usage:
    python scripts/promote_candidate_to_handoff.py candidates/foo.yaml
"""
from __future__ import annotations

import shutil
import sys
from pathlib import Path

try:
    import yaml
except ImportError as exc:
    raise SystemExit("Missing dependency: pyyaml. Install with `pip install pyyaml`.") from exc

ROOT = Path(__file__).resolve().parents[1]
HANDOFF_DIR = ROOT / "handoff" / "ready_for_strategy_tester"


def main(argv: list[str]) -> int:
    if len(argv) != 2:
        print(__doc__)
        return 2
    src = Path(argv[1])
    if not src.is_absolute():
        src = ROOT / src
    if not src.exists():
        print(f"Missing candidate file: {src}")
        return 1
    data = yaml.safe_load(src.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        print("Candidate YAML root must be a mapping")
        return 1
    candidate_id = data.get("candidate_id")
    if not candidate_id:
        print("candidate_id is required")
        return 1
    data["status"] = "ready_for_strategy_tester"
    data.setdefault("handoff_version", 1)
    HANDOFF_DIR.mkdir(parents=True, exist_ok=True)
    dst = HANDOFF_DIR / f"{candidate_id}.yaml"
    dst.write_text(yaml.safe_dump(data, sort_keys=False, allow_unicode=True), encoding="utf-8")
    print(f"Promoted {src.relative_to(ROOT)} -> {dst.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
