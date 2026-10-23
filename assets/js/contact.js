/* Contact form (frontend). To connect a backend: set data-endpoint="https://your-api/..." on #contact-form.
   The form then POSTs JSON; with no endpoint it shows the success state in preview mode and sends nothing. */
document.addEventListener("DOMContentLoaded",()=>{
  const f=document.getElementById("contact-form");if(!f)return;
  const ok=document.getElementById("contact-success"),note=document.getElementById("preview-note"),fail=document.getElementById("form-fail"),P=new URLSearchParams(location.search);
  const rules={
    name:v=>v.trim().length<2?"Enter your full name.":"",
    email:(v,el)=>!v.trim()?"Enter your email address.":(el.validity.typeMismatch||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())?"Enter a valid email address, like name@example.com.":""),
    type:v=>v?"":"Choose a support type.",
    message:v=>v.trim().length<10?"Tell us a little more (at least 10 characters).":""};
  function check(el){const r=rules[el.name];if(!r)return true;const m=r(el.value,el),e=document.getElementById("e-"+el.name);
    el.classList.toggle("is-invalid",!!m);el.setAttribute("aria-invalid",!!m);e.textContent=m;e.hidden=!m;return !m}
  const fields=[...f.elements].filter(el=>rules[el.name]);
  fields.forEach(el=>{el.addEventListener("blur",()=>check(el));el.addEventListener("input",()=>{if(el.classList.contains("is-invalid"))check(el)});el.addEventListener("change",()=>{if(el.classList.contains("is-invalid"))check(el)})});
  // Prefill from links: contact.html?type=Event+Question&event=Name
  const t=P.get("type"),ev=P.get("event");if(t&&[...f.type.options].some(o=>o.value===t))f.type.value=t;if(ev)f.event.value=ev;
  // Support cards preselect the support type
  document.querySelectorAll("[data-type]").forEach(a=>a.addEventListener("click",()=>{f.type.value=a.dataset.type;setTimeout(()=>f.name.focus({preventScroll:true}),400)}));
  f.addEventListener("submit",async e=>{e.preventDefault();fail.hidden=true;
    const bad=fields.filter(el=>!check(el));if(bad.length){bad[0].focus();return}
    const btn=f.querySelector("[type=submit]"),label=btn.textContent;btn.disabled=true;btn.textContent="Sending…";
    try{
      const url=f.dataset.endpoint;
      if(url){const r=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(new FormData(f)))});if(!r.ok)throw new Error(r.status)}
      note.hidden=!!url;f.hidden=true;ok.hidden=false;ok.focus();ok.scrollIntoView({block:"center"});
    }catch(err){fail.hidden=false;fail.focus()}
    finally{btn.disabled=false;btn.textContent=label}
  });
  document.getElementById("send-another").addEventListener("click",()=>{f.reset();fields.forEach(el=>{el.classList.remove("is-invalid");el.removeAttribute("aria-invalid")});f.querySelectorAll(".field-error").forEach(x=>x.hidden=true);ok.hidden=true;f.hidden=false;f.name.focus()});
});
