# Raw paper PDFs

Place selected PDF files here. Use the `paper_id` from `metadata/selected_30_high_value_papers.csv` as the filename prefix.

OpenAlex exposed only a small number of direct PDF URLs. Most SSRN papers expose landing pages only, so browser download may be required.

## PDF Status

Final status as of 2026-05-20: 25 of 30 PDFs collected. The 5 misses are all genuine source-side blocks, not workflow gaps:

- Removed from SSRN ("under review or removed at the request of the author, SSRN, or the rights holder"): `paper_02`, `paper_05`, `paper_16`, `paper_26` — verified by direct re-fetch of each DOI on 2026-05-20.
- Paywalled with no open mirror: `paper_29` (Wiley, $49 PPV, no OA location per OpenAlex). Would require institutional/library access.

BrowserMCP workflow used for the SSRN papers:

1. Navigate to the SSRN abstract page (DOI redirects to `papers.ssrn.com`).
2. Click `Open PDF in Browser` (the `type=2` variant).
3. The browser redirects to a short-lived AWS S3 signed URL (`download.ssrn.com/...&X-Amz-Signature=...&X-Amz-Expires=300`).
4. Capture that URL from the page state and save it to this folder with `Invoke-WebRequest -OutFile paper_XX.pdf`.

The signed URL expires after ~5 minutes and SSRN rate-limits after several rapid hits (clicks start timing out). Pace at ~1 paper per 15-30s if redoing this run.

- `paper_01` - oa_landing_found; downloaded; local: `paper_01.pdf` (570 KB)
- `paper_02` - oa_landing_found; unavailable - SSRN reports the paper is under review or removed; local: ``
- `paper_03` - oa_landing_found; downloaded; local: `paper_03.pdf` (396 KB)
- `paper_04` - oa_landing_found; downloaded; local: `paper_04.pdf` (590 KB)
- `paper_05` - oa_landing_found; unavailable - same SSRN removal notice as paper_02; local: ``
- `paper_06` - oa_landing_found; downloaded; local: `paper_06.pdf` (1.3 MB)
- `paper_07` - oa_landing_found; downloaded via AUT Open Repository; local: `paper_07.pdf` (378 KB)
- `paper_08` - oa_landing_found; downloaded via University of Auckland ResearchSpace; local: `paper_08.pdf` (1.9 MB)
- `paper_09` - oa_landing_found; downloaded via SMU InK repository/browser cache; local: `paper_09.pdf` (1.3 MB)
- `paper_10` - oa_landing_found; downloaded via indexed PDF mirror; local: `paper_10.pdf` (724 KB)
- `paper_11` - oa_landing_found; downloaded via SSRN/browser cache; local: `paper_11.pdf` (298 KB)
- `paper_12` - oa_landing_found; downloaded via SSRN/browser cache; local: `paper_12.pdf` (677 KB)
- `paper_13` - oa_landing_found; downloaded via SSRN/browser cache; local: `paper_13.pdf` (802 KB)
- `paper_14` - oa_pdf_found; downloaded via Authorea with Chrome impersonation; local: `paper_14.pdf` (1.2 MB)
- `paper_15` - oa_landing_found; downloaded via SSRN/browser cache; local: `paper_15.pdf` (321 KB)
- `paper_16` - oa_landing_found; unavailable - SSRN reports removed/unavailable; no open PDF found in follow-up search; local: ``
- `paper_17` - oa_landing_found; downloaded via SSRN/browser cache; local: `paper_17.pdf` (857 KB)
- `paper_18` - oa_landing_found; downloaded via SSRN/browser cache; local: `paper_18.pdf` (1.5 MB)
- `paper_19` - oa_landing_found; downloaded via SSRN/browser cache; local: `paper_19.pdf` (2.4 MB)
- `paper_20` - oa_landing_found; downloaded via SSRN/browser cache; local: `paper_20.pdf` (2.0 MB)
- `paper_21` - oa_landing_found; downloaded via SSRN/browser cache; local: `paper_21.pdf` (110 KB)
- `paper_22` - oa_landing_found; downloaded via AgEcon Search; local: `paper_22.pdf` (1.1 MB)
- `paper_23` - oa_landing_found; downloaded via SSRN/browser cache; local: `paper_23.pdf` (140 KB)
- `paper_24` - oa_landing_found; downloaded via SSRN/browser cache; local: `paper_24.pdf` (1.0 MB)
- `paper_25` - oa_landing_found; downloaded via SSRN/browser cache; local: `paper_25.pdf` (546 KB)
- `paper_26` - oa_landing_found; unavailable - SSRN reports removed/unavailable; no open PDF found in follow-up search; local: ``
- `paper_27` - oa_landing_found; downloaded via SSRN/browser cache; local: `paper_27.pdf` (355 KB)
- `paper_28` - oa_landing_found; downloaded via SSRN/browser cache; local: `paper_28.pdf` (539 KB)
- `paper_29` - no_oa_location; Wiley/paywalled; no open PDF found yet; local: ``
- `paper_30` - oa_landing_found; downloaded via SSRN/browser cache; local: `paper_30.pdf` (819 KB)
