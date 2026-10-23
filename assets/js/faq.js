/* FAQ content is TEMPORARY - edit this array (or move to markup) with real copy. */
const FAQ=[
["Tickets",[["How do I buy tickets?","Open an event, choose Get tickets, then follow the steps to select your tickets and pay."],["Where will I find my tickets?","Tickets are delivered to the email address used at checkout. Add real delivery details here."],["Can I buy tickets for someone else?","Yes. Add the policy for transferring or naming tickets here."]]],
["Payments",[["Which payment methods are accepted?","List the supported payment methods here."],["Is my payment secure?","Describe the payment provider and security measures here."]]],
["Refunds",[["What happens if an event is cancelled?","Explain the refund process and timelines here."],["Can I get a refund if I can't attend?","State the refund policy per event type here."]]],
["Account",[["Do I need an account to buy?","Describe whether guest checkout is supported here."],["How do I update my details?","Explain how to change account details here."]]]];
document.addEventListener("DOMContentLoaded",()=>{
  const box=document.getElementById("faq"),tabs=document.getElementById("faq-tabs"),s=document.getElementById("faq-search");let cat="All",n=0;
  tabs.innerHTML=["All",...FAQ.map(c=>c[0])].map(c=>`<button class="chip${c=="All"?" is-active":""}" data-c="${c}">${c}</button>`).join("");
  box.innerHTML=FAQ.map(([c,items])=>`<section data-c="${c}" class="mb-4"><h2 class="h4 mb-2">${c}</h2>${items.map(([q,a])=>{n++;return `<div class="faq-item"><h3 class="m-0 fs-6"><button class="faq-q" aria-expanded="false" aria-controls="a${n}" id="q${n}">${q}</button></h3><div class="faq-a" id="a${n}" role="region" aria-labelledby="q${n}"><div><p>${a}</p></div></div></div>`}).join("")}</section>`).join("")+'<p id="faq-none" class="muted" hidden>No matching questions. Try different words or contact support.</p>';
  box.addEventListener("click",e=>{const b=e.target.closest(".faq-q");if(!b)return;const o=b.getAttribute("aria-expanded")!="true";b.setAttribute("aria-expanded",o);document.getElementById(b.getAttribute("aria-controls")).classList.toggle("open",o)});
  function f(){const t=s.value.trim().toLowerCase();let v=0;box.querySelectorAll("section").forEach(sec=>{let any=0;sec.querySelectorAll(".faq-item").forEach(i=>{const m=(cat=="All"||sec.dataset.c==cat)&&i.textContent.toLowerCase().includes(t);i.hidden=!m;any+=m});sec.hidden=!any;v+=any});document.getElementById("faq-none").hidden=v>0}
  tabs.onclick=e=>{const b=e.target.closest("[data-c]");if(!b)return;cat=b.dataset.c;tabs.querySelectorAll(".chip").forEach(x=>x.classList.toggle("is-active",x==b));f()};s.oninput=f;
});
