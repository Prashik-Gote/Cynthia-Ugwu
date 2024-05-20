const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

// function circlemouseFollower() {
//   window.addEventListener("mousemove", function (details) {
//     console.log(details.clientX, details.clientY);
//   });
// }
// circlemouseFollower();

// FIRST PAGE ANIMATION
function firstpageAnimation() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".effectelem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .from(".herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
}

var timeout;

function circleFlat() {
  // define default scale value
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;
  window.addEventListener("mousemove", function (details) {
    // var xdiff = dets.clientX - xprev;
    // var ydiff = dets.clientY - yprev;
    this.clearTimeout(timeout);
    xscale = gsap.utils.clamp(0.8, 1.2, details.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, details.clientY - yprev);

    xprev = details.clientX;
    yprev = details.clientY;

    circlemouseFollower(xscale, yscale);
    timeout = setTimeout(function () {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${details.clientX}px , ${details.clientY}px) scale(1, 1)`;
    }, 100);
  });
}

//CIRCLE MOUSE FOLLOWER
function circlemouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (details) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${details.clientX}px , ${details.clientY}px) scale(${xscale}, ${yscale})`;
  });
}
circleFlat();
circlemouseFollower();
firstpageAnimation();

document.querySelectorAll(".element").forEach(function (element) {
  var rotate = 0;
  var diffrot = 0;

  element.addEventListener("mouseleave", function (details) {
    gsap.to(element.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      // duration: 0.5,
    });
  });

  element.addEventListener("mousemove", function (details) {
    var diff = details.clientY - element.getBoundingClientRect().top;

    diffrot = details.clientX - rotate;
    rotate = details.clientX;

    gsap.to(element.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: details.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.6),
    });
  });
});

function updateTime() {
  const clock = document.getElementById("clock");
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  hours = String(hours).padStart(2, "0");

  clock.textContent = `${hours}:${minutes} ${ampm}`;
}

setInterval(updateTime, 1000);
updateTime();
