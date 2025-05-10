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







//For the Authentication side 
// document.querySelector("button").addEventListener("click", async function () {
//     const name = document.getElementById("fullName").value.trim();
//     const email = document.getElementById("email").value.trim();
//     const password = document.getElementById("password").value;
//     const confirmPassword = document.getElementById("confirmPassword").value;

//     if (!name || !email || !password || !confirmPassword) {
//         alert("Please fill all the fields.");
//         return;
//     }

//     if (password !== confirmPassword) {
//         alert("Passwords do not match.");
//         return;
//     }

//     try {
//         const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
//         const user = userCredential.user;

//         // Save user info to Firestore
//         await firebase.firestore().collection("users").doc(user.uid).set({
//             fullName: name,
//             email: email,
//             createdAt: firebase.firestore.FieldValue.serverTimestamp()
//         });

//         alert("Signup successful! Redirecting to login...");
//         window.location.href = "login.html"; // redirect to login page

//     } catch (error) {
//         console.error("Error signing up:", error.message);
//         alert("Signup failed: " + error.message);
//     }
// });
