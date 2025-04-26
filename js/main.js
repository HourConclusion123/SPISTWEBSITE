document.addEventListener('DOMContentLoaded', function() {
    // Program tabs functionality
    const programTabs = document.querySelectorAll('.program-tab');
    const programPanels = document.querySelectorAll('.program-panel');
    
    programTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            programTabs.forEach(t => t.classList.remove('active'));
            programPanels.forEach(p => p.classList.remove('active'));
            
            this.classList.add('active');
            
            const program = this.getAttribute('data-program');
            document.getElementById(`${program}-panel`).classList.add('active');
        });
    });
    
    // Updated strand information toggle
    window.toggleInfo = function(infoId) {
        const clickedInfo = document.getElementById(infoId);
        const allInfo = document.querySelectorAll('.strand-info');
        
        // Remove active class from all info sections
        allInfo.forEach(info => {
            if (info !== clickedInfo) {
                info.classList.remove('active');
            }
        });
        
        // Toggle active class on clicked info
        clickedInfo.classList.toggle('active');
    };
    
    // Toggle news information
    window.toggleNews = function(infoId) {
        const info = document.getElementById(infoId);
        const allInfo = document.querySelectorAll('.news-info');
        
        allInfo.forEach(item => {
            if (item !== info) {
                item.classList.remove('active');
            }
        });
        
        info.classList.toggle('active');
    };
    
    // Modal functionality
    window.openModal = function(modalId) {
        document.getElementById(modalId).style.display = "block";
        document.body.style.overflow = "hidden";
    };
    
    window.closeModal = function(modalId) {
        document.getElementById(modalId).style.display = "none";
        document.body.style.overflow = "auto";
    };
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });
    });
    
    // Dynamic form fields
    const programLevel = document.getElementById('programLevel');
    const strandContainer = document.getElementById('strandContainer');
    const courseContainer = document.getElementById('courseContainer');
    
    if (programLevel) {
        programLevel.addEventListener('change', function() {
            strandContainer.style.display = 'none';
            courseContainer.style.display = 'none';
            
            if (this.value === 'senior-high') {
                strandContainer.style.display = 'block';
                document.getElementById('strand').setAttribute('required', '');
            } else if (this.value === 'college') {
                courseContainer.style.display = 'block';
                document.getElementById('course').setAttribute('required', '');
            } else {
                document.getElementById('strand').removeAttribute('required');
                document.getElementById('course').removeAttribute('required');
            }
        });
    }
    
    // Smooth scrolling
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Active navigation on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});