const mobileMenu = document.getElementById('mobile-menu');
        const navLinks = document.querySelector('.nav-links');

        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
});

// cards editing
let slider = document.querySelector(".card-slider");
let scrollAmount = 0;
let scrollPerClick = 275; // Amount to scroll per click (adjustable)

function nextSlide() {
    if (scrollAmount <= slider.scrollWidth - slider.clientWidth) {
        scrollAmount += scrollPerClick;
        slider.style.transform = `translateX(-${scrollAmount}px)`;
    }
}

function prevSlide() {
    if (scrollAmount > 0) {
        scrollAmount -= scrollPerClick;
        slider.style.transform = `translateX(-${scrollAmount}px)`;
    }
}
