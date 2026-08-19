const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const body=document.body,preloader=$("#preloader"),header=$("#header"),progress=$("#progress"),hamb=$("#hamburger"),mobile=$("#mobileMenu");
window.addEventListener("load",()=>setTimeout(()=>{preloader.classList.add("done");body.classList.remove("loading")},700));

function scrollUpdate(){
  header.classList.toggle("scrolled",scrollY>40);
  const max=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=(max?scrollY/max*100:0)+"%";
  const hero=$(".hero-bg"),view=$(".view-bg");
  if(hero)hero.style.transform=`translateY(${Math.min(scrollY*.1,80)}px) scale(1.08)`;
  if(view){const r=view.parentElement.getBoundingClientRect();view.style.transform=`translateY(${Math.max(-60,Math.min(60,(innerHeight/2-r.top)*.07))}px) scale(1.08)`}
}
addEventListener("scroll",scrollUpdate,{passive:true});scrollUpdate();

hamb.addEventListener("click",()=>{mobile.classList.toggle("open");hamb.classList.toggle("open")});
$$(".mobile-menu a").forEach(a=>a.addEventListener("click",()=>mobile.classList.remove("open")));

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.12,rootMargin:"0px 0px -40px"});
$$(".reveal,.reveal-scale").forEach(e=>io.observe(e));

$$(".tabs button").forEach(btn=>btn.addEventListener("click",()=>{
  $$(".tabs button").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
  $$(".menu").forEach(m=>m.classList.remove("active"));
  const p=$("#"+btn.dataset.tab);p.classList.add("active");
  $$("#"+btn.dataset.tab+" article").forEach((a,i)=>a.animate([{opacity:0,transform:"translateY(18px)"},{opacity:1,transform:"none"}],{duration:500,delay:i*70,fill:"both",easing:"cubic-bezier(.2,.75,.2,1)"}));
}));

const counter=$("[data-count]");let counted=false;
const cio=new IntersectionObserver(es=>{if(es[0].isIntersecting&&!counted){counted=true;const target=+counter.dataset.count,start=performance.now();function tick(t){const p=Math.min((t-start)/1200,1),e=1-Math.pow(1-p,3);counter.textContent=(target*e).toFixed(1)+"★";if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick);cio.disconnect()}},{threshold:.6});
if(counter)cio.observe(counter);

const date=$("#date");if(date)date.min=new Date().toISOString().split("T")[0];
const form=$("#bookingForm"),modal=$("#modal");
form.addEventListener("submit",e=>{e.preventDefault();modal.classList.add("open")});
$("#close").onclick=()=>modal.classList.remove("open");$("#done").onclick=()=>modal.classList.remove("open");
modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.remove("open")});
document.addEventListener("keydown",e=>{if(e.key==="Escape")modal.classList.remove("open")});

if(matchMedia("(pointer:fine)").matches){
 const dot=$("#cursorDot"),ring=$("#cursorRing");let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
 addEventListener("pointermove",e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+"px";dot.style.top=my+"px"});
 (function loop(){rx+=(mx-rx)*.16;ry+=(my-ry)*.16;ring.style.left=rx+"px";ring.style.top=ry+"px";requestAnimationFrame(loop)})();
 $$("a,button,.card").forEach(el=>{el.onmouseenter=()=>ring.classList.add("active");el.onmouseleave=()=>ring.classList.remove("active")});
 $$("a,.submit").forEach(el=>{el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.08}px,${(e.clientY-r.top-r.height/2)*.08}px)`});el.addEventListener("pointerleave",()=>el.style.transform="")});
}