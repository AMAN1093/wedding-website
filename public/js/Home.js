//  toggle menu for the mobile phones
const mobileMenu = document.getElementById('mobile-menu');
        const navLinks = document.querySelector('.nav-links');

        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
// functions for the book now button
function bookNow() {
    alert("Book your slot . Our team will contact you soon.");
    window.location.href = "BookNow.html"; // Redirect to contact.html
}


// the photography and the videography service that we offers 

function revealOnScroll() {
    const elements = document.querySelectorAll('.photo-video-box');
    const windowHeight = window.innerHeight;

    elements.forEach(el => {
        const positionFromTop = el.getBoundingClientRect().top;

        if (positionFromTop - windowHeight <= -50) {
            el.classList.add('show');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);


// after the landing page the animation part of javascript is :


function handleScrollAnimation() {
    const textContent = document.querySelector(".text-content");
    const imageContainer = document.querySelector(".image-container");
    const section = document.querySelector(".team-section");

    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) { // Trigger before fully visible
        textContent.classList.add("show");
        imageContainer.classList.add("show");
    }
}

window.addEventListener("scroll", handleScrollAnimation);
window.addEventListener("load", handleScrollAnimation); // Trigger on page load

// about us




