gsap.registerPlugin(ScrollTrigger);

// Garante que a página comece no topo ao atualizar
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// Hero - fade-in inicial com leve escala
gsap.from(".hero h1", { y:50, opacity:0, scale:0.95, duration:1, ease:"power2.out" });
gsap.from(".hero p", { y:50, opacity:0, scale:0.95, duration:1, delay:0.3, ease:"power2.out" });

// Hero - efeito parallax na imagem de fundo
gsap.to(".hero", {
  backgroundPosition: "50% 30%", 
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});

// Seções - efeito de subida com profundidade e stagger nos elementos internos
gsap.utils.toArray('.full-screen').forEach((section, i) => {
  ScrollTrigger.create({
    trigger: section,
    start: 'top 80%',
    onEnter: () => {
      gsap.fromTo(section, 
        { y: 80, opacity:0, scale:0.98 }, 
        { y:0, opacity:1, scale:1, duration:1, ease:"power3.out", delay: i*0.1 }
      );
      const elems = section.querySelectorAll('h2, p, .portfolio-item, .testimonial, li');
      gsap.fromTo(elems, 
        { y:40, opacity:0 }, 
        { y:0, opacity:1, duration:1, stagger:0.25, ease:"power3.out", delay: i*0.1 }
      );
    }
  });
});

// Scroll suave navbar
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').replace('#','');
    const targetSection = document.getElementById(targetId);
    if(targetSection){
      const yOffset = -80; 
      const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});

// Botão voltar ao topo - aparece apenas no final da página
const topBtn = document.querySelector(".back-to-top");

function checkTopBtn() {
  const scrollPosition = window.scrollY + window.innerHeight;
  const pageHeight = document.documentElement.scrollHeight;

  // Mostra botão somente quando chegar ao fim da página
  if(scrollPosition >= pageHeight - 5){ 
    topBtn.style.display = "flex";
  } else {
    topBtn.style.display = "none";
  }
}

window.addEventListener('scroll', checkTopBtn);
window.addEventListener('resize', checkTopBtn);
window.addEventListener('load', checkTopBtn);

// Clique no botão
topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
