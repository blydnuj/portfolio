# Portfolio

A static site with no build step: `index.html`, `styles.css`, `app.js`, and `content.js`.

## Edit
- **All copy and case studies live in `content.js`.** The current text is sample copy, so replace it with your real projects. You can have up to 4 cases.
- **Screens:** put them in `images/<case-slug>/` using the file names listed in `content.js`. Until a file exists, a grey placeholder shows the path it expects.

## Preview locally
```bash
cd ~/Documents/Portfolio && python3 -m http.server 4321
```
Then open http://localhost:4321

## Navigation
- Floating dock: previous case, chapter menu, next case. Each case ends with an "Up next" link.
- On wide screens there is also a chapter rail on the left.
- Keys: `←` `→` switch cases, `1`–`4` open a case, `Esc` goes back to all work.
- Every chapter has a shareable link, e.g. `#/work/basket-checkout/reveal`.

## Publish
Upload the folder as-is to Netlify (drag and drop), Vercel, or GitHub Pages.
