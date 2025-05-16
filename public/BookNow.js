 // Mobile menu toggle
        const mobileMenu = document.getElementById('mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Initialize EmailJS
        (function () {
            emailjs.init("HBgpGPoTlZLAC5mfS"); // Your public key
            console.log("EmailJS initialized");
        })();

        // Handle form submission
        document.getElementById("contactForm").addEventListener("submit", function (event) {
            event.preventDefault();

            const submitBtn = document.querySelector('.btn-submit');
            submitBtn.disabled = true;
            submitBtn.textContent = "Sending...";

            const formData = {
                first_name: document.getElementById("first_name").value,
                last_name: document.getElementById("last_name").value,
                phone: document.getElementById("phone").value,
                email: document.getElementById("email").value,
                user_email: document.getElementById("email").value, // required for some templates
                address: document.getElementById("address").value || "Not provided",
                event_date: document.getElementById("event_date").value,
                service: document.getElementById("service").value,
                service_duration: document.getElementById("service_duration").value,
                message: document.getElementById("message").value || "No additional message"
            };

            // Send email using updated service ID
            emailjs.send("service_ov7lyn5", "template_unz3xf9", formData)
                .then(function (response) {
                    console.log("Email successfully sent!", response);
                    alert("Thank you! Your booking request has been sent successfully.");
                    document.getElementById("contactForm").reset();
                })
                .catch(function (error) {
                    console.error("Failed to send email:", error);
                    alert("Error: " + JSON.stringify(error));
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = "Book Now";
                });
        });

        // Debug check
        window.addEventListener('load', () => {
            if (typeof emailjs === 'undefined') {
                console.error("EmailJS SDK not loaded!");
            } else {
                console.log("EmailJS SDK loaded successfully");
            }
        });