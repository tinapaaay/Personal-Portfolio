# Typewriter Calculator

A standalone calculator with paper tape, generated Web Audio, keyboard input, and pointer effects. Arithmetic and tape are in-memory; only the sound preference persists under `tc-sound`. This uses JavaScript floating-point arithmetic.

## Run locally

From this folder, run `python3 -m http.server 5500` and open [localhost:5500](http://localhost:5500). No build or package installation is required. Alternatively, serve the repository root and navigate to this folder.

## Edit

Edit `index.html`, `style.css`, and `script.js`. External fonts include Special Elite, Space Grotesk, and DSEG.

## Manual checks

Check 2 + 3 = 5, repeated equals, negative values, decimals, clear/backspace, 200 + 10%, and divide by zero. Test keyboard input, tape tear, mute persistence, and reduced motion.

These are suggested checks, not a record of completed browser QA. Use a separate origin/browser profile for destructive storage checks.

## Deploy

Serve this folder and its assets as static files, preserving relative paths. Check external resources and the controls on the actual deployed URL.
