// Firebase configuration and initialization
document.addEventListener('DOMContentLoaded', function() {
    // Your Firebase configuration
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        databaseURL: "YOUR_DATABASE_URL",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
    };
    
    // Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    
    const database = firebase.database();
    
    // Handle form submission
    const admissionForm = document.getElementById('admissionForm');
    const formStatus = document.getElementById('formStatus');
    
    if (admissionForm) {
        admissionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous status
            formStatus.className = 'form-status';
            formStatus.style.display = 'none';
            formStatus.textContent = '';
            
            // Collect form data
            const formData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                programLevel: document.getElementById('programLevel').value,
                previousSchool: document.getElementById('previousSchool').value,
                address: document.getElementById('address').value,
                message: document.getElementById('message').value,
                timestamp: new Date().toISOString()
            };
            
            // Add strand or course if applicable
            if (formData.programLevel === 'senior-high') {
                formData.strand = document.getElementById('strand').value;
            } else if (formData.programLevel === 'college') {
                formData.course = document.getElementById('course').value;
            }
            
            // Submit to Firebase
            const newSubmissionRef = database.ref('admissions').push();
            
            newSubmissionRef.set(formData)
                .then(() => {
                    // Success
                    formStatus.textContent = 'Application submitted successfully! We will contact you soon.';
                    formStatus.classList.add('success');
                    formStatus.style.display = 'block';
                    
                    // Reset form
                    admissionForm.reset();
                    document.getElementById('strandContainer').style.display = 'none';
                    document.getElementById('courseContainer').style.display = 'none';
                })
                .catch((error) => {
                    // Error
                    formStatus.textContent = 'Error submitting your application. Please try again later.';
                    formStatus.classList.add('error');
                    formStatus.style.display = 'block';
                    console.error("Error writing to Firebase:", error);
                });
        });
    }
});