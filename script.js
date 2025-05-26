document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navLinksItems = document.querySelectorAll(".nav-links a");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  navLinksItems.forEach((item) => {
    item.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Sticky Header
  const header = document.querySelector(".header");
  window.addEventListener("scroll", function () {
    header.classList.toggle("scrolled", window.scrollY > 50);
  });

  // Active Navigation Link
  const sections = document.querySelectorAll("section");
  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinksItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href").includes(current)) {
        item.classList.add("active");
      }
    });
  });

  // Testimonial Slider
  const testimonialSlides = document.querySelectorAll(".testimonial-slide");
  const sliderDots = document.querySelector(".slider-dots");
  const prevBtn = document.querySelector(".slider-prev");
  const nextBtn = document.querySelector(".slider-next");
  let currentSlide = 0;

  // Create dots
  testimonialSlides.forEach((slide, index) => {
    const dot = document.createElement("div");
    dot.classList.add("slider-dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    sliderDots.appendChild(dot);
  });

  function showSlide(index) {
    testimonialSlides.forEach((slide) => slide.classList.remove("active"));
    testimonialSlides[index].classList.add("active");

    const dots = document.querySelectorAll(".slider-dot");
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[index].classList.add("active");

    currentSlide = index;
  }

  function goToSlide(index) {
    showSlide(index);
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide =
      (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
    showSlide(currentSlide);
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Auto slide change
  setInterval(nextSlide, 5000);

  // Counter Animation
  const counters = document.querySelectorAll(".counter");
  const speed = 200;

  function animateCounters() {
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(animateCounters, 1);
      } else {
        counter.innerText = target;
      }
    });
  }

  // Start counter animation when stats section is in view
  // const statsSection = document.querySelector('.stats');
  // const observer = new IntersectionObserver((entries) => {
  //     if (entries[0].isIntersecting) {
  //         animateCounters();
  //         observer.unobserve(statsSection);
  //     }
  // }, { threshold: 0.5 });

  // observer.observe(statsSection);

  // Start counter animation on page load
  const statCards = document.querySelectorAll(".stat-card");

  // Function to start counting when element is in viewport
  const startCounting = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target.querySelector(".counter");
        const target = +counter.getAttribute("data-target");
        const speed = 2000; // Animation duration in ms
        const increment = target / (speed / 16); // 60fps

        let current = 0;
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current) + "+";
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target + "+";
          }
        };

        updateCounter();
        observer.unobserve(entry.target);
      }
    });
  };

  // Set up Intersection Observer
  const observer = new IntersectionObserver(startCounting, {
    threshold: 0.5,
    rootMargin: "0px 0px -50px 0px",
  });

  // Observe each stat card
  statCards.forEach((card) => {
    observer.observe(card);
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Update copyright year
  document.getElementById("year").textContent = new Date().getFullYear();
});
