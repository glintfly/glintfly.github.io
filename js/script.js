// Wait for DOM content to load
document.addEventListener("DOMContentLoaded", function() {

  /* --- Scroll Progress Bar --- */
  window.addEventListener("scroll", function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";
  });

  /* --- Intro Fade-Out --- */
  const intro = document.getElementById("intro");
  const enterBtn = document.getElementById("enter-btn");
  const mainInterface = document.getElementById("main-interface");

  enterBtn.addEventListener("click", function() {
    intro.classList.add("fade-out");
    setTimeout(() => {
      intro.style.display = "none";
      mainInterface.classList.remove("hidden");
    }, 1000);
  });

  /* --- Top Navigation Auto Hide/Show Behavior with Timer --- */
  const topNav = document.getElementById("top-nav");
  const navItems = document.querySelectorAll(".top-nav ul li");
  let navAutoHideEnabled = false;
  let hideNavTimeout;

  navItems.forEach(item => {
    item.addEventListener("click", function() {
      navAutoHideEnabled = true;
      navItems.forEach(i => i.classList.remove("active"));
      this.classList.add("active");
      const targetId = this.getAttribute("data-target");
      const currentSection = document.querySelector(".active-section");
      const targetSection = document.getElementById(targetId);
      if (currentSection && targetSection && currentSection !== targetSection) {
        currentSection.classList.remove("active-section");
        currentSection.classList.add("hidden");
        setTimeout(() => {
          targetSection.classList.remove("hidden");
          targetSection.classList.add("active-section");
        }, 500);
      }
      hideNav();
    });
  });

  function hideNav() {
    topNav.classList.add("hidden");
  }

  function showNav() {
    topNav.classList.remove("hidden");
    if (hideNavTimeout) {
      clearTimeout(hideNavTimeout);
      hideNavTimeout = null;
    }
  }

  document.addEventListener("mousemove", function(e) {
    if (navAutoHideEnabled) {
      if (e.clientY < 50) {
        showNav();
      } else {
        if (!hideNavTimeout) {
          hideNavTimeout = setTimeout(() => {
            hideNav();
          }, 1000);
        }
      }
    }
  });

  /* --- Horizontal Timeline Slider (if used) --- */
  const timelineItems = document.querySelectorAll(".timeline-item");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");
  const timelineContainer = document.querySelector(".timeline-items");

  function clearTimelineActive() {
    timelineItems.forEach(item => item.classList.remove("active"));
  }
  timelineItems.forEach(item => {
    item.addEventListener("click", function() {
      clearTimelineActive();
      this.classList.add("active");
      const targetId = this.getAttribute("data-target");
      const currentSection = document.querySelector(".active-section");
      const targetSection = document.getElementById(targetId);
      if (currentSection && targetSection && currentSection !== targetSection) {
        currentSection.classList.remove("active-section");
        currentSection.classList.add("hidden");
        setTimeout(() => {
          targetSection.classList.remove("hidden");
          targetSection.classList.add("active-section");
        }, 500);
      }
    });
  });
  leftArrow.addEventListener("click", function() {
    timelineContainer.scrollBy({ left: -150, behavior: "smooth" });
  });
  rightArrow.addEventListener("click", function() {
    timelineContainer.scrollBy({ left: 150, behavior: "smooth" });
  });

  /* --- Modal Functionality for Event Buttons (if needed) --- */
  const eventBtns = document.querySelectorAll(".event-btn");
  const modal = document.getElementById("event-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalImage = document.getElementById("modal-image");
  const modalText = document.getElementById("modal-text");
  const modalVideo = document.getElementById("modal-video");
  const closeBtn = document.querySelector(".close-btn");

  eventBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      modalTitle.textContent = this.getAttribute("data-title") || "Event Title";
      modalText.textContent = this.getAttribute("data-text") || "Event description goes here...";
      const imageSrc = this.getAttribute("data-image");
      modalImage.src = imageSrc ? imageSrc : "";
      const videoSrc = this.getAttribute("data-video");
      if (videoSrc) {
        modalVideo.src = videoSrc;
        document.getElementById("modal-video-container").style.display = "block";
      } else {
        modalVideo.src = "";
        document.getElementById("modal-video-container").style.display = "none";
      }
      modal.classList.add("show");
      modal.style.display = "block";
    });
  });

  closeBtn.addEventListener("click", function() {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.style.display = "none";
      modalVideo.src = "";
    }, 500);
  });

  window.addEventListener("click", function(e) {
    if (e.target === modal) {
      modal.classList.remove("show");
      setTimeout(() => {
        modal.style.display = "none";
        modalVideo.src = "";
      }, 500);
    }
  });
});
