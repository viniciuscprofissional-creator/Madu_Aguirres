// GSAP e ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Força a página iniciar no topo
window.onbeforeunload = () => window.scrollTo(0, 0);

// NAVBAR (altura fixa)
const nav = document.querySelector('nav');
const NAV_HEIGHT = () => nav ? nav.offsetHeight : 64;

// Hero fade-in
gsap.from(".hero h1", { y:50, opacity:0, scale:0.95, duration:1, ease:"power2.out" });
gsap.from(".hero p", { y:50, opacity:0, scale:0.95, duration:1, delay:0.25, ease:"power2.out" });

// Fade-up das seções
gsap.utils.toArray('.full-screen').forEach((section, i) => {
  ScrollTrigger.create({
    trigger: section,
    start: 'top 80%',
    onEnter: () => {
      gsap.fromTo(section, { y:80, opacity:0, scale:0.98 }, { y:0, opacity:1, scale:1, duration:1, ease:"power3.out", delay:i*0.06 });
      const elems = section.querySelectorAll('h2, p, .portfolio-item, .testimonial, li');
      gsap.fromTo(elems, { y:40, opacity:0 }, { y:0, opacity:1, duration:1, stagger:0.2, ease:"power3.out", delay:i*0.06 });
    }
  });
});

// Botão voltar ao topo
const topBtn = document.querySelector(".back-to-top");
if(topBtn){
  const updateTopBtn = () => { topBtn.style.display = (window.scrollY > 100) ? "flex" : "none"; };
  window.addEventListener('scroll', updateTopBtn);
  window.addEventListener('load', updateTopBtn);
  topBtn.addEventListener("click", ()=>{ window.scrollTo({ top:0, behavior:"smooth" }); });
}


