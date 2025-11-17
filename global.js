// ===== CONFIG =====
const MIN_OVERLAY_TIME = 1200; // ms - minimum time overlay should be visible
let overlayShownAt = performance.now(); // approximate start time for this page

// Start the paw animation as soon as the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("pageOverlay");
  if (!overlay) return;

  // If overlay is visible (not .hidden), start paws on THIS page
  if (!overlay.classList.contains("hidden")) {
    startPawAnimation();
  }
});

// Fade OUT overlay when the page is fully loaded
window.addEventListener("load", () => {
  const overlay = document.getElementById("pageOverlay");
  if (!overlay) return;

  const elapsed = performance.now() - overlayShownAt;
  const remaining = Math.max(0, MIN_OVERLAY_TIME - elapsed);

  setTimeout(() => {
    // Stop paws once we're ready to hide
    stopPawAnimation();

    // Fade overlay out
    requestAnimationFrame(() => {
      overlay.classList.add("hidden");  // opacity -> 0 (CSS transition)
    });
  }, remaining);
});

// ===== Navigation helper =====
function goTo(url) {
  const overlay = document.getElementById("pageOverlay");

  if (!overlay) {
    window.location.href = url;
    return;
  }

  // Show overlay on the current page for a nicer transition
  overlay.classList.remove("hidden");

  // (Optional) start animation here too so you see paws before navigation
  startPawAnimation();

  // Navigate immediately; the NEW page will:
  //  - start its own animation on DOMContentLoaded
  //  - hide overlay on window.load (with MIN_OVERLAY_TIME)
  window.location.href = url;
}


// ===== Your existing helpers (unchanged) =====
function startPawAnimation() {
  const paws = document.querySelectorAll(".paw");
  const overlay = document.getElementById("pageOverlay");
  if (!overlay || paws.length === 0) return;

  // Remove running first to ensure a clean restart
  paws.forEach(paw => {
    paw.classList.remove("running");
    paw.style.opacity = ""; // let animation control opacity
  });

  // Force a reflow so the browser registers the class removal
  void overlay.offsetWidth;

  // Add running class to start from frame 0
  paws.forEach(paw => {
    paw.classList.add("running");
  });
}

function stopPawAnimation() {
  const paws = document.querySelectorAll(".paw");
  paws.forEach(paw => {
    paw.classList.remove("running");
    paw.style.opacity = "0";  // make sure none are visible
  });
}
