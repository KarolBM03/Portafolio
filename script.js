// ===== Navigation Toggle =====
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
  document.body.style.overflow = navMenu.classList.contains("active")
    ? "hidden"
    : "";
});

// Close menu when clicking a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.style.overflow = "";
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    !navMenu.contains(e.target) &&
    !navToggle.contains(e.target) &&
    navMenu.classList.contains("active")
  ) {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.style.overflow = "";
  }
});

// ===== Header Scroll Effect =====
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll("section[id]");

function updateActiveLink() {
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add("active");
      } else {
        navLink.classList.remove("active");
      }
    }
  });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();

// ===== Skill Bars Animation =====
const skillBars = document.querySelectorAll(".skill-progress");
let skillsAnimated = false;

function animateSkills() {
  const skillsSection = document.getElementById("habilidades");
  if (!skillsSection) return;

  const sectionTop = skillsSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (sectionTop < windowHeight * 0.8 && !skillsAnimated) {
    skillBars.forEach((bar) => {
      const progress = bar.style.getPropertyValue("--progress");
      bar.style.width = "0";
      setTimeout(() => {
        bar.style.width = progress;
      }, 100);
    });
    skillsAnimated = true;
  }
}

window.addEventListener("scroll", animateSkills);
animateSkills();

// ===== Scroll Reveal Animation =====
function revealOnScroll() {
  const reveals = document.querySelectorAll(
    ".project-card, .skill-category, .info-card, .contact-form, .contact-item",
  );

  reveals.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight * 0.9) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
}

// Initialize elements for scroll reveal
document
  .querySelectorAll(
    ".project-card, .skill-category, .info-card, .contact-form, .contact-item",
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// ===== Contact Form Handling =====
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  // Show loading state
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = "<span>Enviando...</span>";
  submitBtn.disabled = true;

  // Simulate form submission
  setTimeout(() => {
    // Create success message
    const successMessage = document.createElement("div");
    successMessage.className = "form-success";
    successMessage.style.cssText = `
      background: rgba(34, 197, 94, 0.1);
      border: 1px solid rgba(34, 197, 94, 0.3);
      border-radius: 0.75rem;
      padding: 1rem;
      margin-bottom: 1.5rem;
      color: #22c55e;
      text-align: center;
      animation: fadeInUp 0.3s ease;
    `;
    successMessage.textContent =
      "¡Mensaje enviado correctamente! Te responderé pronto.";

    // Insert at top of form
    contactForm.insertBefore(successMessage, contactForm.firstChild);

    // Reset form
    contactForm.reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;

    // Remove success message after 5 seconds
    setTimeout(() => {
      successMessage.remove();
    }, 5000);
  }, 1500);
});

// ===== Smooth Scroll for Safari =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ===== Typing Effect for Hero (Optional) =====
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = "";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// ===== Initialize on Load =====
window.addEventListener("load", () => {
  // Add loaded class to body for animations
  document.body.classList.add("loaded");
});

// ===== Responsive Enhancements =====

// Handle window resize for mobile menu
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 1024) {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  }, 250);
});

// Handle orientation change
window.addEventListener("orientationchange", () => {
  // Close mobile menu on orientation change
  setTimeout(() => {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.style.overflow = "";
  }, 100);
});

// Touch-friendly project cards
if ("ontouchstart" in window) {
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("touchstart", function () {
      this.classList.add("touch-active");
    });

    card.addEventListener("touchend", function () {
      this.classList.remove("touch-active");
    });
  });
}

// Improve scroll performance on mobile
let ticking = false;

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateActiveLink();
      animateSkills();
      revealOnScroll();

      // Header scroll effect
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }

      ticking = false;
    });
    ticking = true;
  }
}

// Replace multiple scroll listeners with one optimized listener
window.removeEventListener("scroll", updateActiveLink);
window.removeEventListener("scroll", animateSkills);
window.removeEventListener("scroll", revealOnScroll);
window.addEventListener("scroll", onScroll, { passive: true });

// Prevent zoom on double tap for iOS
let lastTouchEnd = 0;
document.addEventListener(
  "touchend",
  (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      e.preventDefault();
    }
    lastTouchEnd = now;
  },
  { passive: false },
);

// Handle safe area insets for notched devices
function updateSafeAreas() {
  const header = document.querySelector(".header");
  const hero = document.querySelector(".hero");

  if (CSS.supports("padding-top", "env(safe-area-inset-top)")) {
    header.style.paddingTop = "env(safe-area-inset-top)";
    hero.style.paddingTop = "calc(6rem + env(safe-area-inset-top))";
  }
}

updateSafeAreas();
