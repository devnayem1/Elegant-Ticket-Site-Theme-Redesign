/* Login / sign-up behaviour (frontend only).
   To connect a backend: set data-endpoint on the <form> and replace the demo block in submit handler with fetch(). */
document.addEventListener("DOMContentLoaded",()=>{
  document.querySelectorAll("[data-toggle-pw]").forEach(b=>b.addEventListener("click",()=>{const i=document.getElementById(b.dataset.togglePw),s=i.type==="password";i.type=s?"text":"password";b.textContent=s?"Hide":"Show";b.setAttribute("aria-pressed",s)}));
  document.querySelectorAll("form.auth-form").forEach(form=>{
    const pw=form.querySelector("[name=password]"),cf=form.querySelector("[name=confirm]"),out=form.querySelector(".auth-msg");
    const sync=()=>{if(cf)cf.setCustomValidity(cf.value&&cf.value!==pw.value?"Passwords do not match":"")};
    if(cf){pw.addEventListener("input",sync);cf.addEventListener("input",sync)}
    form.addEventListener("submit",e=>{e.preventDefault();sync();form.classList.add("was-validated");
      if(!form.checkValidity()){const bad=form.querySelector(":invalid");bad&&bad.focus();return}
      /* DEMO ONLY: no server is connected. Replace with fetch(form.dataset.endpoint,{method:"POST",body:new FormData(form)}) */
      out.hidden=false;out.className="auth-msg alert alert-success mt-3";out.textContent=form.dataset.demo;out.focus&&out.setAttribute("tabindex","-1");out.focus();
    });
  });
  const lnk=document.getElementById("show-reset"),rs=document.getElementById("reset-box"),lg=document.getElementById("login-box");
  if(lnk)lnk.addEventListener("click",e=>{e.preventDefault();rs.hidden=false;lg.hidden=true;document.getElementById("reset-email").focus()});
  const back=document.getElementById("back-login");if(back)back.addEventListener("click",e=>{e.preventDefault();rs.hidden=true;lg.hidden=false});
});
