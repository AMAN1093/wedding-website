// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB4OUv-FrYtb2tKlIu9ZeGTHsI8xkb3K4o",
    authDomain: "teamspc-6f85b.firebaseapp.com",
    projectId: "teamspc-6f85b",
    storageBucket: "teamspc-6f85b.firebasestorage.app",
    messagingSenderId: "442886029783",
    appId: "1:442886029783:web:98b521bcb16801ad584b92",
    measurementId: "G-VHSBGHC0QC"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();  // Initialize Firestore

  // DOM elements
  const arrangementsForm = document.getElementById('arrangementsForm');
  const arrangementOptions = document.querySelectorAll('.arrangement-option');
  const seatingPreferenceInput = document.getElementById('seatingPreference');

  // Seating arrangement selection
  arrangementOptions.forEach(option => {
    option.addEventListener('click', () => {
      arrangementOptions.forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
      seatingPreferenceInput.value = option.getAttribute('data-value');
    });
  });

  // Form submission
  arrangementsForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const customerName = document.getElementById('customerName').value.trim();
    const customerEmail = document.getElementById('customerEmail').value.trim();
    const totalGuests = document.getElementById('totalGuests').value;
    const seatingPreference = seatingPreferenceInput.value;
    
    // Validate required fields
    if (!customerName || !customerEmail || !totalGuests || !seatingPreference) {
      alert('Please fill in all required fields');
      return;
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      // Save to Firestore
      await db.collection('Wedding-Arrangement').add({
        customerName: customerName,
        customerEmail: customerEmail,
        totalGuests: parseInt(totalGuests),
        seatingPreference: seatingPreference,
        specialRequests: document.getElementById('specialRequests').value.trim(),
        submittedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      // Success message
      alert('Thank you for your arrangement preferences!');
      
      // Reset form
      arrangementsForm.reset();
      arrangementOptions.forEach(opt => opt.classList.remove('selected'));
      seatingPreferenceInput.value = '';
      
    } catch (error) {
      console.error('Full error details:', error);
      alert(`Error details: ${error.message}`);
    }
  });