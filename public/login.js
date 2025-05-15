// Toggle menu for mobile
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// JavaScript for Slider Functionality
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

// Function to update the slider position
function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Next Slide
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
});

// Previous Slide
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
});

// Autoplay
let autoplayInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
}, 5000); // Change slide every 5 seconds

// Pause Autoplay on Hover
slider.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
});

// Resume Autoplay on Mouse Leave
slider.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }, 5000);
});



// for the login authentication for the user

// import { auth } from '../firebase-init.js';

// document.addEventListener("DOMContentLoaded", () => {
//     const loginButton = document.querySelector("button");

//     loginButton.addEventListener("click", async (e) => {
//         e.preventDefault();  // Stop auto refresh

//         const email = document.getElementById("email").value.trim();
//         const password = document.getElementById("password").value.trim();

//         if (!email || !password) {
//             alert("Enter both fields");
//             return;
//         }

//         try {
//             await auth.signInWithEmailAndPassword(email, password);
//             alert("Login successful!");
//             window.location.href = "Home.html"; // or your homepage
//         } catch (error) {
//             alert("Error: " + error.message);
//             console.error(error);
//         }
//     });
// });


// //log out button
// firebase.auth().signOut().then(() => {
//     window.location.href = "login.html";
//   });
  
