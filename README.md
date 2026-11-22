# VOLKA 2.0 — Rebuilt Starter

A mobile-first React + Vite financial information dashboard. All project files are kept flat in the repository root.

## Included features
- Arabic / English interface with RTL support
- Responsive mobile navigation
- Glass UI with adjustable transparency and motion transitions
- Searchable global company directory (directory entries only; not live stock quotes)
- Reference currency converter powered by Frankfurter / ECB data
- Financial headlines powered by GDELT
- Local rule-based VOLKA assistant for the data currently available in the app
- Render error boundary so a React rendering error displays a recovery screen instead of a silent white page

## Requirements
- Node.js 18 or newer
- npm

## Run locally
1. Extract the ZIP.
2. Open a terminal in this folder.
3. Run `npm install`.
4. Run `npm run dev -- --host 0.0.0.0`.
5. Open the local URL printed by Vite.

## Build for deployment
- `npm run build`
- Upload the contents of the generated `dist` folder to your static hosting provider, or connect this repository to a Vite-compatible deployment service.

## Root file structure
```text
VOLKA-2.0/
├── App.jsx
├── main.jsx
├── style.css
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── README.md
```

## Data and limitations
- Currency rates are reference rates from the upstream Frankfurter service. Availability and update dates depend on that provider. They are not bank buy/sell prices.
- News are retrieved from GDELT. Network restrictions, browser connectivity, or upstream availability may prevent headlines from loading.
- The company directory is a searchable reference list, not a live stock exchange feed.
- Stock, index, gold, silver, and oil prices are intentionally not fabricated. They remain marked as not connected until a licensed/appropriate quote provider is configured.
- VOLKA AI is currently a local rule-based assistant, not a generative language model.

## Troubleshooting
- If the page is blank, first confirm that `npm install` completed successfully and that the browser console does not show missing package errors.
- Use a current mobile browser. Vite's development server is not the production website; deploy the `dist` output for a public URL.
- If an upstream data service is unavailable, the interface should still open; only the relevant data panel will show an error.
