// Firebase Configuration - Replace with your actual config
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

function calculateAverageRating() {
    const averageRatingDiv = document.getElementById('averageRating');
    averageRatingDiv.innerHTML = '<p>Calculating average rating...</p>';

    db.collection("reviews")
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                averageRatingDiv.innerHTML = '<p>No ratings yet.</p>';
                return;
            }

            let totalRating = 0;
            let reviewCount = 0;

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.rating && !isNaN(data.rating)) {
                    totalRating += data.rating;
                    reviewCount++;
                }
            });

            if (reviewCount === 0) {
                averageRatingDiv.innerHTML = '<p>No valid ratings found.</p>';
                return;
            }

            const averageRating = (totalRating / reviewCount).toFixed(1);
            const fullStars = Math.floor(averageRating);
            const hasHalfStar = averageRating - fullStars >= 0.5;

            let starDisplay = '★'.repeat(fullStars);
            if (hasHalfStar) starDisplay += '½';
            starDisplay += '☆'.repeat(5 - fullStars - (hasHalfStar ? 1 : 0));

            averageRatingDiv.innerHTML = `
                <div style="margin-bottom: 0.5rem">
                    <span style="font-weight: bold;">Average Rating:</span> 
                    <span style="color: #FFD700; font-size: 1.5rem;">${starDisplay}</span> 
                    <span style="font-weight: bold;">(${averageRating}/5)</span>
                </div>
                <p>Based on ${reviewCount} customer ${reviewCount === 1 ? 'review' : 'reviews'}</p>
            `;
        })
        .catch((error) => {
            console.error("Error calculating average rating:", error);
            averageRatingDiv.innerHTML = `<p>Error calculating average rating.</p>`;
        });
}

// Global variables for review management
let lastVisibleDoc = null;
let allReviewsLoaded = false;
let currentReviewCount = 0;
let loadedReviews = []; // Store loaded review data
const reviewsPerPage = 3; // Initial reviews to load
const moreReviewsPerLoad = 5; // Additional reviews to load on button click

// Load and Display Reviews
function loadReviews() {
    const container = document.getElementById('reviewsContainer');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const showLessBtn = document.getElementById('showLessBtn');

    container.innerHTML = '<p class="loading">Loading reviews...</p>';

    // Reset stored reviews
    loadedReviews = [];
    currentReviewCount = 0;
    lastVisibleDoc = null;
    allReviewsLoaded = false;

    // Hide both buttons initially
    loadMoreBtn.style.display = 'none';
    showLessBtn.style.display = 'none';

    let query = db.collection("reviews")
        .orderBy("timestamp", "desc")
        .limit(reviewsPerPage);

    query.get()
        .then((querySnapshot) => {
            container.innerHTML = '';

            if (querySnapshot.empty) {
                container.innerHTML = '<p class="no-reviews">No reviews yet. Be the first to review!</p>';
                return;
            }

            // Store and display reviews
            querySnapshot.forEach(doc => {
                loadedReviews.push({ id: doc.id, data: doc.data() });
            });
            currentReviewCount = loadedReviews.length;
            displayStoredReviews(container);

            // Save the last visible document
            lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

            // Check if there are more reviews to load
            checkForMoreReviews();
        })
        .catch((error) => {
            console.error("Error loading reviews:", error);
            container.innerHTML = `<p class="error">Error loading reviews: ${error.message}</p>`;
        });
}

function loadMoreReviews() {
    const container = document.getElementById('reviewsContainer');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    // If we have already loaded more reviews than we're currently displaying
    if (loadedReviews.length > currentReviewCount) {
        // We already have more reviews loaded but not displayed
        // Just increase the current count to show more of the already loaded reviews
        currentReviewCount = Math.min(currentReviewCount + moreReviewsPerLoad, loadedReviews.length);
        displayStoredReviews(container);

        // Show the "Show Less" button since we're showing more than the initial set
        document.getElementById('showLessBtn').style.display = 'inline-block';

        // If we've now displayed all loaded reviews, check if there are more to fetch
        if (currentReviewCount >= loadedReviews.length && !allReviewsLoaded) {
            checkForMoreReviews();
        }
        return;
    }

    // If we need to fetch more reviews from the database
    if (allReviewsLoaded) return;

    loadMoreBtn.textContent = 'Loading...';
    loadMoreBtn.disabled = true;

    db.collection("reviews")
        .orderBy("timestamp", "desc")
        .startAfter(lastVisibleDoc)
        .limit(moreReviewsPerLoad)
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                loadMoreBtn.textContent = 'No More Reviews';
                loadMoreBtn.disabled = true;
                allReviewsLoaded = true;
                return;
            }

            // Store the additional reviews
            querySnapshot.forEach(doc => {
                loadedReviews.push({ id: doc.id, data: doc.data() });
            });

            // Update the last visible document
            lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

            // Update current count and display
            currentReviewCount = loadedReviews.length;
            displayStoredReviews(container);

            // Reset button state
            loadMoreBtn.textContent = 'Load More Reviews';
            loadMoreBtn.disabled = false;

            // Always show the "Show Less" button once we've loaded more reviews
            document.getElementById('showLessBtn').style.display = 'inline-block';

            // Check if there are more reviews to load
            checkForMoreReviews();
        })
        .catch((error) => {
            console.error("Error loading more reviews:", error);
            loadMoreBtn.textContent = 'Error Loading More';
            loadMoreBtn.disabled = true;
        });
}

function showLessReviews() {
    const container = document.getElementById('reviewsContainer');
    const showLessBtn = document.getElementById('showLessBtn');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    // If we're already at or below the initial count, do nothing
    if (currentReviewCount <= reviewsPerPage) {
        return;
    }

    // Reduce the current count to show only initial set
    currentReviewCount = reviewsPerPage;

    // Display the reduced set of reviews
    displayStoredReviews(container);

    // Update button states
    loadMoreBtn.textContent = 'Load More Reviews';
    loadMoreBtn.disabled = false;
    loadMoreBtn.style.display = 'inline-block';
    showLessBtn.style.display = 'none';

    // We don't need to reset allReviewsLoaded here since we might still have all reviews loaded
    // We just need to make sure the Load More button is visible
}

function displayStoredReviews(container) {
    // Clear the container
    container.innerHTML = '';

    // Display only the current number of reviews
    for (let i = 0; i < Math.min(currentReviewCount, loadedReviews.length); i++) {
        const review = loadedReviews[i];
        const data = review.data;

        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = `
            <div class="review-header">
                <span class="reviewer-name">${data.name || "Anonymous"}</span>
                <span class="review-date">${formatDate(data.timestamp)}</span>
            </div>
            <div class="rating">
                ${createStarRating(data.rating)} (${data.rating}/5)
            </div>
            <p class="review-text">${data.text || "No review text provided"}</p>
            <div class="service-used">Service: ${data.service || "Not specified"}</div>
        `;
        container.appendChild(card);
    }

    // Update button visibility based on current state
    updateButtonVisibility();
}

function updateButtonVisibility() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const showLessBtn = document.getElementById('showLessBtn');

    // Show Less button should be visible only when we're showing more than the initial page
    if (currentReviewCount > reviewsPerPage) {
        showLessBtn.style.display = 'inline-block';
    } else {
        showLessBtn.style.display = 'none';
    }

    // Load More button logic
    if (currentReviewCount < loadedReviews.length || !allReviewsLoaded) {
        // Show Load More if we have more reviews loaded but not displayed,
        // or if we haven't loaded all reviews from the database
        loadMoreBtn.style.display = 'inline-block';
        loadMoreBtn.disabled = false;
        loadMoreBtn.textContent = 'Load More Reviews';
    } else {
        // Hide Load More if we're showing all loaded reviews and there are no more in the database
        loadMoreBtn.style.display = allReviewsLoaded ? 'none' : 'inline-block';
    }
}

function checkForMoreReviews() {
    // If we already know there are more reviews loaded but not displayed
    if (loadedReviews.length > currentReviewCount) {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        loadMoreBtn.style.display = 'inline-block';
        loadMoreBtn.textContent = 'Load More Reviews';
        loadMoreBtn.disabled = false;
        updateButtonVisibility();
        return;
    }

    // Otherwise check the database for more
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    if (!lastVisibleDoc) {
        loadMoreBtn.style.display = 'none';
        return;
    }

    db.collection("reviews")
        .orderBy("timestamp", "desc")
        .startAfter(lastVisibleDoc)
        .limit(1)
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                allReviewsLoaded = true;
            } else {
                allReviewsLoaded = false;
            }

            // Update button visibility
            updateButtonVisibility();
        })
        .catch((error) => {
            console.error("Error checking for more reviews:", error);
            loadMoreBtn.style.display = 'none';
        });
}

// Handle Form Submission
document.getElementById('reviewForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const rating = parseInt(document.getElementById('rating').value);
    const service = document.getElementById('service').value;
    const text = document.getElementById('review').value.trim();

    if (!name || isNaN(rating) || !service || !text) {
        alert('Please fill all required fields correctly.');
        return;
    }

    try {
        await db.collection("reviews").add({
            name,
            email: email || null,
            rating,
            service,
            text,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            approved: true // Setting approved to true by default
        });

        alert('Thank you! Your review has been submitted.');
        e.target.reset();

        // Reload reviews and average rating to reflect the new submission
        loadReviews();
        calculateAverageRating();
    } catch (error) {
        console.error("Error submitting review:", error);
        alert('Submission failed. Please try again.');
    }
});

// Initialize when page loads
window.addEventListener('DOMContentLoaded', () => {
    loadReviews();
    calculateAverageRating();

    // Add event listeners for buttons
    document.getElementById('loadMoreBtn').addEventListener('click', loadMoreReviews);
    document.getElementById('showLessBtn').addEventListener('click', showLessReviews);
});
