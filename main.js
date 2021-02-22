document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    document.querySelector("#portfolio").style.visibility = "hidden";
    document.querySelector("#loader").style.visibility = "visible";
  } else {
    document.querySelector("#loader").style.display = "none";
    document.querySelector("#portfolio").style.visibility = "visible";

    // GSAP ANMATIONS
    let tl = gsap.timeline();
    gsap.registerPlugin(ScrollTrigger);

    // background animation
    tl.from('#portfolio', { duration: 5, opacity: 0, ease: "slow(0.7, 0.7, false)" })
    // header animation
    gsap.from('.header', { duration: 4, delay: 1, opacity: 0, y: "random(-400, 400)", ease: "back.out(1.7)", stagger: 1 })

    // girl flower animatiomn
    const flower = document.getElementById('flower');
    tl.staggerFromTo(flower.children, 1.1,
      { scale: 0.1, opacity: 0 },
      { scale: 1, opacity: 1 },
      .3
    )

    // about section animation  
    gsap.from('.about-header', {
      scrollTrigger: {
        trigger: '.about-header',
      },
      opacity: 0,
      duration: 4,
      scale: 0,
    });

    // scroll animation - desktop only
    const sections = document.querySelectorAll(".scrollSection");
    function goToSection(section, anim) {
      gsap.to(window, {
        scrollTo: { y: section, autoKill: false },
        duration: 0.8
      });

      if (anim) {
        anim.restart();
      }
    }
    if (window.innerWidth > 737) {
      sections.forEach(section => {
        const intoAnim = gsap.timeline({ paused: true })
          .from(section.querySelector(".portfolio-box"), { xPercent: 50, duration: 1 })

        ScrollTrigger.create({
          trigger: section,
          onEnter: () => goToSection(section, intoAnim),
        });

        ScrollTrigger.create({
          trigger: section,
          start: "bottom bottom",
          onEnterBack: () => goToSection(section),
        });
      });
    }
  }
};