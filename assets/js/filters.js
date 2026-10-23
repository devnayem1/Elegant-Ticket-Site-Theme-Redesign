/* Isolated filter module. Home uses OT.chipFilter (swap for the original Isotope init here).
   Contract: buttons [data-filter="*"|"Music"] inside #filters, items inside #grid. */
OT.chipFilter=function(grid,bar){
  bar.addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;
    bar.querySelectorAll("[data-filter]").forEach(x=>{x.classList.toggle("is-active",x===b);x.setAttribute("aria-pressed",x===b)});
    const f=b.dataset.filter;grid.querySelectorAll(".card-ev").forEach(c=>{const show=f==="*"||c.dataset.cat===f;c.classList.toggle("is-filtered-out",!show);if(show){c.classList.remove("is-in");void c.offsetWidth;c.classList.add("is-in")}})});
};
/* Events listing: search + sidebar filters + sort + load more. */
OT.listing=function(){
  const $=s=>document.querySelector(s),P=new URLSearchParams(location.search),PAGE=6;let shown=PAGE;
  const q=$("#q"),city=$("#f-city"),price=$("#f-price"),month=$("#f-month"),sort=$("#sort"),sortM=$("#sort-m");
  [...new Set(OT.events.map(e=>e.city).filter(Boolean))].sort().forEach(c=>city.add(new Option(c,c)));
  q.value=P.get("q")||"";if(P.get("cat")){const c=document.querySelector(`[name=cat][value="${P.get("cat")}"]`);if(c)c.checked=true}
  [...new Set(OT.events.filter(e=>e.date).map(e=>e.date.slice(0,7)))].sort().forEach(m=>month.add(new Option(new Date(m+"-01T00:00").toLocaleDateString("en-ZA",{month:"long",year:"numeric"}),m)));
  function run(){
    const cats=[...document.querySelectorAll("[name=cat]:checked")].map(c=>c.value),t=q.value.trim().toLowerCase(),[lo,hi]=price.value?price.value.split("-").map(Number):[0,1e9];
    let l=OT.events.filter(e=>(!cats.length||cats.includes(e.cat))&&(!city.value||e.city===city.value)&&(!month.value||(e.date||"").startsWith(month.value))&&(!price.value||(e.price>=lo&&e.price<=hi))&&(!t||(e.title+(e.venue||"")+(e.city||"")+e.cat).toLowerCase().includes(t)));
    const s=sort.value;l.sort((a,b)=>s==="price-asc"?(a.price||1e9)-(b.price||1e9):s==="price-desc"?(b.price||0)-(a.price||0):(a.date||"9").localeCompare(b.date||"9"));
    $("#count").textContent=`${l.length} event${l.length==1?"":"s"} found`+(t?` for “${q.value.trim()}”`:"");
    $("#empty").hidden=l.length>0;$("#results").hidden=!l.length;OT.render("#results",l.slice(0,shown));$("#more").hidden=l.length<=shown;
  }
  const reset=()=>{document.querySelectorAll("[name=cat]").forEach(c=>c.checked=false);city.value=price.value=month.value="";q.value="";shown=PAGE;run()};
  document.querySelectorAll(".js-reset").forEach(b=>b.onclick=reset);
  [city,price,month,sort].concat([...document.querySelectorAll("[name=cat]")]).forEach(el=>el.addEventListener("change",()=>{if(el===sort)sortM.value=sort.value;shown=PAGE;run()}));
  sortM.onchange=()=>{sort.value=sortM.value;run()};
  $("#search-form").onsubmit=e=>{e.preventDefault();shown=PAGE;run()};
  $("#more").onclick=()=>{shown+=PAGE;run()};run();
};
document.addEventListener("DOMContentLoaded",()=>{const g=document.getElementById("grid"),b=document.getElementById("filters");if(g&&b)OT.chipFilter(g,b);if(document.getElementById("results"))OT.listing()});
