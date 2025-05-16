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

//content of the review  js

 const firebaseConfig = {
            apiKey: "AIzaSyCVqccX7ErOA-TJPv4b2kLw76sDSUGtXQM",
            authDomain: "review-firebase--app.firebaseapp.com",
            projectId: "review-firebase--app",
            storageBucket: "review-firebase--app.appspot.com",
            messagingSenderId: "1077615941552",
            appId: "1:1077615941552:web:15e1d4aae8c410664e6875"
        };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

// Helper Functions
function formatDate(timestamp) {
    if (!timestamp?.toDate) return "Date not available";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return timestamp.toDate().toLocaleDateString('en-US', options);
}
       
function createStarRating(rating) {
    if (!rating) return "☆☆☆☆☆";
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

// Load and Display Featured Reviews (only 3)
        function loadFeaturedReviews() {
            const container = document.getElementById('featuredReviewsContainer');

            container.innerHTML = '<p class="loading">Loading featured reviews...</p>';

            db.collection("reviews")
                .orderBy("timestamp", "desc")
                .limit(3)
                .get()
                .then((querySnapshot) => {
                    container.innerHTML = '';

                    if (querySnapshot.empty) {
                        container.innerHTML = '<p class="no-reviews">No reviews yet.</p>';
                        return;
                    }

                    querySnapshot.forEach(doc => {
                        const data = doc.data();
                        const card = document.createElement('div');
                        card.className = 'featured-review-card';
                        card.innerHTML = `
                            <div class="featured-review-header">
                                <span class="featured-reviewer-name">${data.name || "Anonymous"}</span>
                                <span class="featured-review-date">${formatDate(data.timestamp)}</span>
                            </div>
                            <div class="featured-rating">
                                ${createStarRating(data.rating)} (${data.rating}/5)
                            </div>
                            <p class="featured-review-text">${data.text || "No review text provided"}</p>
                            <div class="featured-service-used">Service: ${data.service || "Not specified"}</div>
                        `;
                        container.appendChild(card);
                    });
                })
                .catch((error) => {
                    console.error("Error loading featured reviews:", error);
                    container.innerHTML = `<p class="error">Error loading reviews: ${error.message}</p>`;
                });
        }

        // Initialize when page loads
        window.addEventListener('DOMContentLoaded', () => {
            loadFeaturedReviews();
        });