(function () {
    emailjs.init("HBgpGPoTlZLAC5mfS"); // Replace with your EmailJS Public Key
})();

document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        event_date: document.getElementById("event_date").value,
        service: document.getElementById("service").value,
        message: document.getElementById("message").value
    };

    // Send email to admin (Edit service ID & template ID below)
    emailjs.send("service_p3s259m", "template_unz3xf9", formData)
        .then(response => {
            console.log("Admin email sent:", response);

            // Send auto-reply email to the client
            const autoReplyData = {
                to_email: formData.email, // Client's email
                to_name: formData.first_name + " " + formData.last_name, // Client's full name
                service: formData.service // Service name for personalization
            };

            // Send auto-reply (Edit service ID & template ID below)
            return emailjs.send("service_p3s259m", "template_unz3xf9", autoReplyData);
        })
        .then(autoReplyResponse => {
            console.log("Auto-reply email sent:", autoReplyResponse);
            alert("Your request has been received. We will reach out to you soon!");
            document.getElementById("contactForm").reset();
        })
        .catch(error => {
            alert("Error sending message. Check console for details.");
            console.error("EmailJS Error:", error);
        });
});
