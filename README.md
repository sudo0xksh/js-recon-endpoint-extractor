# 🔍 JS Recon Endpoint Extractor

JS Recon Endpoint Extractor is a Node.js-based reconnaissance tool that
fetches a target webpage, extracts linked JavaScript files, and searches
them for exposed API endpoints.

The tool saves all findings into a single output file for easy review.

---

## Overview

Modern web applications often expose internal API endpoints inside
client-side JavaScript files.

During reconnaissance, analyzing these files can reveal:
- Undocumented API routes
- Internal application structure
- Hidden functionality

This tool automates that basic analysis.

---

## What This Tool Does

- Fetches the target webpage
- Extracts all linked `.js` files
- Downloads each JavaScript file
- Searches for `/api/` style endpoints
- Saves results to a text file

---

## Output

All results are saved in:
recon_output.txt


The output includes:
- Target URL
- JavaScript files discovered
- Endpoints found inside each JS file
- Errors for unreachable files

---

## Usage

Run the script using Node.js:
```bash
node js_recon.js <url>


Example:

node js_recon.js https://example.com
