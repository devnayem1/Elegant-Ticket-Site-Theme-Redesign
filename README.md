# OpenTickets redesign (frontend, placeholder brand)
Serve with any static server (`python3 -m http.server`) and open `index.html`. Bootstrap 5.3 is bundled locally; no other dependencies.
- **Assets**: `assets/images/{logo,banners,events,venues}`. `logo/logo.png` (white logo on transparent, so the header is dark), `banners/hero-01.jpg` (home hero), `events/event-NN.jpg` (NN = event id in `OT.events`). Images come from the client Open_Tickets.zip.
- **Retheme**: colours, fonts, type scale, spacing, radii, shadows live in `assets/css/variables.css`. Colours are temporary, not official.
- **JS**: `main.js` (sample data, card template, header/footer, shrink on scroll), `filters.js` (filters/search/sort), `faq.js` (FAQ content + accordion).
- **Isotope**: the original Isotope markup/JS was NOT provided and is NOT preserved. The demo filter is isolated in `OT.chipFilter` (`filters.js`); it expects `[data-filter]` buttons in `#filters` and cards in `#grid`. Replace it with the original init and classes.
- **Add an event**: add an object to `OT.events` in `main.js` (and an image `event-0N.jpg`), or paste a `.card-ev` block into a grid.
- **Add FAQ items**: edit the `FAQ` array in `faq.js`.
- **Future seat map**: mount inside `#ticket-flow` on `event-detail.html`.
- Header/footer are injected by `main.js`; move them into theme partials when integrating.

- **Auth pages**: `login.html`, `signup.html`, `assets/js/auth.js`. Validation works; submit is a demo message until a server endpoint is wired (see comment in auth.js).
- Event data in `main.js` is taken from the client banners; prices are only set where the banner states one. Some banner dates have already passed and show an "Ended" badge.

## Contact page
- `contact.html` + `assets/js/contact.js`. "Contact Support" links across the site (header nav, footer, FAQs, home, event detail) navigate to this page; no modals.
- Form validation is client-side. Connect a backend by setting `data-endpoint` on `#contact-form` (it POSTs JSON: name, email, type, booking, event, message). With no endpoint it shows a success state in **preview mode** and sends nothing.
- Links can prefill: `contact.html?type=Event+Question&event=Event+Name`.
- **Placeholders to replace** in `contact.html` (elements with `data-replace`): support email, phone, support hours. Only the website www.opentickets.co.za is real (taken from the supplied banners).
