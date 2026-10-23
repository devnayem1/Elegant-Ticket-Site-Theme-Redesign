/* Shared: sample data, card template, header/footer injection, header shrink.
   SAMPLE DATA ONLY - replace OT.events with real data / server-rendered cards. */
const OT={events:[
{id:1,title:"Appel: Soos Net Hy Kan",cat:"Music",date:"2026-11-06",venue:"Boardwalk Hotel & Casino",city:"Port Elizabeth"},
{id:2,title:"Going Back West",cat:"Music",date:"2026-11-07",venue:"Tarlton Raceway",city:"Tarlton",price:155},
{id:3,title:"Kempie Fees: Die Heuwels Fantasties",cat:"Music",date:"2026-10-31",venue:"Hoërskool Kempton Park Sportgronde",city:"Kempton Park",price:250},
{id:4,title:"Somer Fees",cat:"Music",date:"2026-11-21",t:"Gates open 12:00",venue:"Hoërskool Florida",city:"Florida"},
{id:5,title:"Mamelodi Sundowns vs Durban City",cat:"Sports",date:"2026-10-31",t:"20:15"},
{id:6,title:"CAF Champions League: Mamelodi Sundowns vs Wiliete SC",cat:"Sports",date:"2026-10-23",t:"20:00"},
{id:7,title:"CAF Champions League: Orlando Pirates vs African Stars",cat:"Sports",date:"2026-10-23",t:"20:00"},
{id:8,title:"Carling Knockout Cup: Orlando Pirates vs Milford",cat:"Sports",date:"2026-10-27",t:"19:00",venue:"Orlando Amstel Arena",city:"Johannesburg"},
{id:9,title:"Carling Knockout Cup: Sekhukhune United vs Richards Bay",cat:"Sports",date:"2026-10-25",t:"18:00",venue:"New Peter Mokaba Stadium",city:"Polokwane"},
{id:10,title:"Carling Knockout Cup: Kruger United vs AmaZulu",cat:"Sports",date:"2026-10-25",t:"15:00",venue:"Mbombela Stadium",city:"Mbombela"},
{id:11,title:"Carling Knockout Cup: Kaizer Chiefs vs TS Galaxy",cat:"Sports",date:"2026-10-27",t:"19:00",venue:"FNB Stadium",city:"Johannesburg"},
{id:12,title:"Carling Knockout Cup: Polokwane City vs Siwelele",cat:"Sports",date:"2026-10-24",t:"18:00",venue:"Old Peter Mokaba Stadium",city:"Polokwane"},
{id:13,title:"Carling Knockout Cup: Durban City vs Stellenbosch",cat:"Sports",date:"2026-10-28",t:"19:00",venue:"Chatsworth Stadium",city:"Durban"},
{id:14,title:"Carling Knockout Cup: Lamontville Golden Arrows vs Chippa United",cat:"Sports",date:"2026-10-24",t:"15:00",venue:"King Zwelithini Stadium",city:"Durban"},
{id:15,title:"Carling Knockout Cup: Mamelodi Sundowns vs Marumo Gallants",cat:"Sports",date:"2026-10-27",t:"19:00",venue:"Loftus Versfeld Stadium",city:"Pretoria"},
{id:16,title:"Midlands Wanderers vs Upington City",cat:"Sports",date:"2026-10-23",t:"15:30",venue:"Sugar Ray Xulu Stadium",city:"Durban"},
{id:17,title:"Orlando Pirates 2026/27 Season Ticket",cat:"Sports",dl:"Now available"},
{id:18,title:"SA 4x4 & Outdoor Show: Weekend",cat:"Shows",date:"2026-10-23",dl:"23–25 Oct 2026",venue:"Sandringham",city:"Stellenbosch"},
{id:19,title:"SA 4x4 & Outdoor Show: Friday",cat:"Shows",date:"2026-10-23",venue:"Sandringham",city:"Stellenbosch"},
{id:20,title:"SA 4x4 & Outdoor Show: Saturday",cat:"Shows",date:"2026-10-24",venue:"Sandringham",city:"Stellenbosch"},
{id:21,title:"SA 4x4 & Outdoor Show: Sunday",cat:"Shows",date:"2026-10-25",venue:"Sandringham",city:"Stellenbosch"},
{id:22,title:"The Collective Fashion Show",cat:"Shows",date:"2026-10-24",venue:"Nelson Mandela University"},
{id:23,title:"Interskole Reeks 2026: Massa Aflos",cat:"Schools",dl:"2026 series"},
{id:24,title:"Interskole Reeks 2026: Hoops en Sewes",cat:"Schools",dl:"2026 series"},
{id:25,title:"Black Swan Africa Extravaganza",cat:"Shows",dl:"Date on banner"},
{id:26,title:"Senior Old Boys Ete / Lunch",cat:"Schools",dl:"Date on banner",venue:"Paul Roos Gymnasium",city:"Stellenbosch"},
{id:27,title:"Lede-aansluiting / Hernuwing 2026",cat:"Schools",dl:"2026"}],
today:new Date().toISOString().slice(0,10),
img:e=>`assets/images/events/event-${String(e.id).padStart(2,"0")}.jpg`,
when:e=>e.dl||(new Date(e.date+"T00:00").toLocaleDateString("en-ZA",{weekday:"short",day:"numeric",month:"short",year:"numeric"})+(e.t?" · "+e.t:"")),
where:e=>[e.venue,e.city].filter(Boolean).join(", "),
past:e=>!!e.date&&e.date<OT.today,
card(e){const p=OT.past(e);return `<article class="card-ev" data-cat="${e.cat}"><a class="card-ev__img" href="event-detail.html?id=${e.id}" tabindex="-1" aria-hidden="true"><img src="${OT.img(e)}" alt="" loading="lazy" width="1210" height="450"><span class="badge-cat">${p?"Ended":e.cat}</span></a><div class="card-ev__body"><time${e.date?` datetime="${e.date}"`:""}>${OT.when(e)}</time><h3><a href="event-detail.html?id=${e.id}">${e.title}</a></h3><span class="muted">${OT.where(e)||"Details on the event banner"}</span><div class="card-ev__foot"><span class="price">${e.price?"From R"+e.price:""}</span><a class="btn btn-ot btn-sm" href="event-detail.html?id=${e.id}">${p?"View event":"Get tickets"}</a></div></div></article>`},
render(sel,list){document.querySelector(sel).innerHTML=list.map(OT.card).join("")},
sorted:()=>OT.events.slice().sort((a,b)=>(a.date||"9").localeCompare(b.date||"9"))};
(function(){
const page=location.pathname.split("/").pop()||"index.html";
const L=[["index.html","Home"],["events.html","Events"],["faqs.html","FAQs"],["contact.html","Contact"]];
const h=document.getElementById("site-header");
if(h)h.outerHTML=`<header class="site-header"><nav class="navbar navbar-expand-lg" aria-label="Main"><div class="container"><a class="navbar-brand brand" href="index.html"><img src="assets/images/logo/logo.png" alt="OpenTickets home" width="84" height="44"></a><button class="navbar-toggler border-0" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle menu"><span class="navbar-toggler-icon"></span></button><div class="collapse navbar-collapse" id="nav"><ul class="navbar-nav ms-lg-4 me-auto">${L.map(l=>`<li><a class="nav-link${page==l[0]?" active":""}" href="${l[0]}">${l[1]}</a></li>`).join("")}</ul><form class="nav-search" action="events.html" role="search"><input type="search" name="q" placeholder="Search events" aria-label="Search events"><button class="btn btn-ot">Search</button></form><div class="auth-btns"><a class="btn btn-ghost-light" href="login.html">Log in</a><a class="btn btn-ot" href="signup.html">Sign up</a></div></div></div></nav></header>`;
const f=document.getElementById("site-footer");
if(f)f.outerHTML=`<footer class="site-footer"><div class="container"><div class="row g-4"><div class="col-lg-5"><img src="assets/images/logo/logo.png" alt="OpenTickets" height="44"><p class="mt-3 pe-lg-5">Find events and get your tickets. Footer copy is temporary and replaceable.</p></div><div class="col-6 col-lg-2"><h2>Explore</h2><ul><li><a href="index.html">Home</a></li><li><a href="events.html">All events</a></li><li><a href="faqs.html">FAQs</a></li></ul></div><div class="col-6 col-lg-2"><h2>Categories</h2><ul>${["Music","Sports","Shows","Schools"].map(c=>`<li><a href="events.html?cat=${c}">${c}</a></li>`).join("")}</ul></div><div class="col-lg-3"><h2>Support</h2><ul><li><a href="faqs.html">Help centre</a></li><li><a href="contact.html">Contact support</a></li><li><a href="#">Terms (add link)</a></li><li><a href="#">Privacy (add link)</a></li></ul></div></div><p class="small mt-4 mb-0 border-top pt-3" style="border-color:#3a4358!important">© <span id="yr"></span> OpenTickets</p></div></footer>`;
const y=document.getElementById("yr");if(y)y.textContent=new Date().getFullYear();
let t=false;const on=()=>document.documentElement.classList.toggle("is-shrunk",scrollY>40);
addEventListener("scroll",()=>{if(!t){t=true;requestAnimationFrame(()=>{on();t=false})}},{passive:true});on();
})();
