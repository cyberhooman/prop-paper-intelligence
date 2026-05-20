#!/usr/bin/env python3
"""Validate candidate YAML files before handoff to the strategy tester.

Usage:
    python scripts/validate_candidates.py candidates handoff/ready_for_strategy_tester
"""
from __future__ import annotations

import sys
from pathlib import Path
from typing import Any

try:
    import yaml
except ImportError as exc:  # pragma: no cover
    raise SystemExit("Missing dependency: pyyaml. Install with `pip install pyyaml`.") from exc

REQUIRED_TOP_LEVEL = [
    "candidate_id",
    "status",
    "source_papers",
    "strategy_family",
    "target_system",
    "hypothesis",
    "features",
    "data_required",
    "lookahead_risk",
    "validation_required",
    "promotion_rule",
    "handoff",
]

REQUIRED_HANDOFF = ["target_repo", "suggested_script", "expected_outputs"]


def load_yaml(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as fh:
        data = yaml.safe_load(fh)
    if not isinstance(data, dict):
        raise ValueError("YAML root must be a mapping/object")
    return data


def validate_file(path: Path) -> list[str]:
    errors: list[str] = []
    try:
        data = load_yaml(path)
    except Exception as exc:
        return [f"failed to parse YAML: {exc}"]

    for key in REQUIRED_TOP_LEVEL:
        if key not in data or data[key] in (None, "", []):
            errors.append(f"missing or empty top-level field: {key}")

    source_papers = data.get("source_papers")
    if source_papers is not None:
        if not isinstance(source_papers, list) or not source_papers:
            errors.append("source_papers must be a non-empty list")
        else:
            for idx, paper in enumerate(source_papers):
                if not isinstance(paper, dict):
                    errors.append(f"source_papers[{idx}] must be an object")
                    continue
                if not (paper.get("doi") or paper.get("url")):
                    errors.append(f"source_papers[{idx}] needs doi or url")
                if not paper.get("title"):
                    errors.append(f"source_papers[{idx}] needs title")

    features = data.get("features")
    if features is not None:
        if not isinstance(features, list) or not features:
            errors.append("features must be a non-empty list")

    lookahead = data.get("lookahead_risk")
    if lookahead is not None:
        if not isinstance(lookahead, dict):
            errors.append("lookahead_risk must be an object")
        elif not lookahead.get("status"):
            errors.append("lookahead_risk.status is required")

    handoff = data.get("handoff")
    if handoff is not None:
        if not isinstance(handoff, dict):
            errors.append("handoff must be an object")
        else:
            for key in REQUIRED_HANDOFF:
                if key not in handoff or handoff[key] in (None, "", []):
                    errors.append(f"missing or empty handoff field: {key}")

    return errors


def iter_yaml(paths: list[str]) -> list[Path]:
    files: list[Path] = []
    for raw in paths:
        path = Path(raw)
        if path.is_dir():
            files.extend(sorted(path.rglob("*.yaml")))
            files.extend(sorted(path.rglob("*.yml")))
        elif path.suffix.lower() in {".yaml", ".yml"}:
            files.append(path)
    return files


def main(argv: list[str]) -> int:
    targets = argv[1:] or ["candidates", "handoff/ready_for_strategy_tester"]
    files = iter_yaml(targets)
    if not files:
        print("No candidate YAML files found.")
        return 0

    failed = False
    for path in files:
        errors = validate_file(path)
        if errors:
            failed = True
            print(f"FAIL {path}")
            for err in errors:
                print(f"  - {err}")
        else:
            print(f"PASS {path}")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
