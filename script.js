gsap.registerPlugin(ScrollTrigger);

window.onbeforeunload = () => window.scrollTo(0, 0);
const nav = document.querySelector('nav');
const NAV_HEIGHT = () => nav ? nav.offsetHeight : 64;

gsap.from(".hero h1", { y:50, opacity:0, scale:0.95, duration:1, ease:"power2.out" });
gsap.from(".hero p", { y:50, opacity:0, scale:0.95, duration:1, delay:0.25, ease:"power2.out" });

ScrollTrigger.matchMedia({
  "(min-width: 901px)": () => {
    gsap.to(".hero", {
      backgroundPosition: "50% 30%", ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
    });
  }
});

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

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if(menuToggle && navLinks){
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("open");
    document.body.classList.toggle("menu-open");
  });

  navLinks.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if(!target) return;
      navLinks.classList.remove("active");
      menuToggle.classList.remove("open");
      document.body.classList.remove("menu-open");
      const y = target.getBoundingClientRect().top + window.pageYOffset - NAV_HEIGHT();
      window.scrollTo({ top:y, behavior:"smooth" });
    });
  });

  document.addEventListener('keydown', e => {
    if(e.key === 'Escape' && navLinks.classList.contains('active')){
      navLinks.classList.remove("active");
      menuToggle.classList.remove("open");
      document.body.classList.remove("menu-open");
    }
  });
}

document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e){
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if(target){
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.pageYOffset - NAV_HEIGHT();
      window.scrollTo({ top:y, behavior:'smooth' });
    }
  });
});

const topBtn = document.querySelector(".back-to-top");
if(topBtn){
  const updateTopBtn = () => { topBtn.style.display = (window.scrollY > 100) ? "flex" : "none"; };
  let debounceTimer;
  const debouncedUpdate = () => { clearTimeout(debounceTimer); debounceTimer=setTimeout(updateTopBtn,50); };
  window.addEventListener('scroll',debouncedUpdate);
  window.addEventListener('resize',debouncedUpdate);
  window.addEventListener('load',updateTopBtn);
  topBtn.addEventListener("click", ()=>{ window.scrollTo({ top:0, behavior:"smooth" }); });
}
