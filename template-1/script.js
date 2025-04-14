document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // Populate content from user_data.js
    populateContent();
    
    // Navbar active link handling
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Portfolio filtering
    document.querySelectorAll('.portfolio-filters button').forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active button
            document.querySelectorAll('.portfolio-filters button').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            
            // Filter items
            document.querySelectorAll('.portfolio-item').forEach(item => {
                if (filter === '*' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formElements = this.elements;
        let isValid = true;
        
        // Simple validation
        for (let i = 0; i < formElements.length; i++) {
            if (formElements[i].tagName === 'INPUT' || formElements[i].tagName === 'TEXTAREA') {
                if (!formElements[i].value.trim()) {
                    isValid = false;
                    formElements[i].classList.add('is-invalid');
                } else {
                    formElements[i].classList.remove('is-invalid');
                }
            }
        }
        
        if (isValid) {
            // Show success message (in a real application, you would send the data to a server)
            this.innerHTML = `
                <div class="text-center py-5">
                    <i class="fas fa-check-circle text-success fa-4x mb-3"></i>
                    <h3>Message Sent!</h3>
                    <p class="mb-0">Thank you for your message. I'll get back to you soon!</p>
                </div>
            `;
        }
    });
    
    // Helper function to create elements with data from user_data.js
    function populateContent() {
        // Navigation
        document.getElementById('navbarBrand').textContent = userData.name;
        
        const navLinksContainer = document.getElementById('navLinks');
        userData.navigation.forEach(item => {
            const li = document.createElement('li');
            li.className = 'nav-item';
            
            const a = document.createElement('a');
            a.className = 'nav-link';
            a.href = item.url;
            a.textContent = item.label;
            
            li.appendChild(a);
            navLinksContainer.appendChild(li);
        });
        
        // Hero Section
        document.getElementById('heroName').textContent = userData.name;
        document.getElementById('heroTitle').textContent = userData.title;
        document.getElementById('heroDescription').textContent = userData.intro;
        document.getElementById('heroImage').src = userData.avatar;
        
        // About Section
        document.getElementById('aboutTitle').textContent = userData.about.title;
        document.getElementById('aboutDescription').textContent = userData.about.description;
        document.getElementById('aboutName').textContent = userData.name;
        document.getElementById('aboutEmail').textContent = userData.contact.email;
        document.getElementById('aboutPhone').textContent = userData.contact.phone;
        document.getElementById('aboutLocation').textContent = userData.location;
        document.getElementById('aboutExperience').textContent = userData.experience;
        document.getElementById('aboutCvButton').href = userData.cvLink;
        
        // Skills Section
        const skillsList = document.getElementById('skillsList');
        userData.skills.forEach(skill => {
            const col = document.createElement('div');
            col.className = 'col-md-6 col-lg-4';
            col.setAttribute('data-aos', 'fade-up');
            
            col.innerHTML = `
                <div class="skill-item text-center">
                    <div class="skill-icon mx-auto">
                        <i class="${skill.icon}"></i>
                    </div>
                    <h4 class="skill-title">${skill.name}</h4>
                    <p class="text-muted mb-0">${skill.description}</p>
                </div>
            `;
            
            skillsList.appendChild(col);
        });
        
        // Education Section
        const educationList = document.getElementById('educationList');
        userData.education.forEach(edu => {
            const div = document.createElement('div');
            div.className = 'resume-item';
            div.setAttribute('data-aos', 'fade-up');
            
            div.innerHTML = `
                <span class="date">${edu.years}</span>
                <h4>${edu.degree}</h4>
                <h5>${edu.institution}</h5>
                <p>${edu.description}</p>
            `;
            
            educationList.appendChild(div);
        });
        
        // Experience Section
        const experienceList = document.getElementById('experienceList');
        userData.experience_list.forEach(exp => {
            const div = document.createElement('div');
            div.className = 'resume-item';
            div.setAttribute('data-aos', 'fade-up');
            
            div.innerHTML = `
                <span class="date">${exp.years}</span>
                <h4>${exp.position}</h4>
                <h5>${exp.company}</h5>
                <p>${exp.description}</p>
            `;
            
            experienceList.appendChild(div);
        });
        
        // Portfolio Section
        // Add filters first
        const portfolioFilters = document.getElementById('portfolioFilters');
        const categories = new Set();
        userData.portfolio.forEach(item => categories.add(item.category));
        
        categories.forEach(category => {
            const li = document.createElement('li');
            li.className = 'list-inline-item';
            
            const button = document.createElement('button');
            button.className = 'btn';
            button.textContent = category;
            button.setAttribute('data-filter', category.toLowerCase().replace(' ', '-'));
            
            li.appendChild(button);
            portfolioFilters.appendChild(li);
        });
        
        // Add portfolio items
        const portfolioItems = document.getElementById('portfolioItems');
        userData.portfolio.forEach(item => {
            const col = document.createElement('div');
            col.className = `col-md-6 col-lg-4 portfolio-item ${item.category.toLowerCase().replace(' ', '-')}`;
            col.setAttribute('data-aos', 'fade-up');
            
            col.innerHTML = `
                <div class="portfolio-wrapper">
                    <img src="${item.image}" alt="${item.title}" class="portfolio-img">
                    <div class="portfolio-info">
                        <h4>${item.title}</h4>
                        <p>${item.description}</p>
                        <a href="${item.link}" class="btn btn-primary btn-sm mt-3" target="_blank">View Project</a>
                    </div>
                </div>
            `;
            
            portfolioItems.appendChild(col);
        });
        
        // Services Section
        const servicesList = document.getElementById('servicesList');
        userData.services.forEach(service => {
            const col = document.createElement('div');
            col.className = 'col-md-6 col-lg-4 mb-4';
            col.setAttribute('data-aos', 'fade-up');
            
            col.innerHTML = `
                <div class="service-item text-center">
                    <div class="service-icon">
                        <i class="${service.icon}"></i>
                    </div>
                    <h4 class="service-title">${service.title}</h4>
                    <p class="mb-0">${service.description}</p>
                </div>
            `;
            
            servicesList.appendChild(col);
        });
        
        // Testimonials Section
        const testimonialsList = document.getElementById('testimonialsList');
        userData.testimonials.forEach(testimonial => {
            const div = document.createElement('div');
            div.className = 'testimonial-item';
            div.setAttribute('data-aos', 'fade-up');
            
            div.innerHTML = `
                <p class="testimonial-text">${testimonial.text}</p>
                <div class="testimonial-author">
                    <div class="testimonial-avatar">
                        <img src="${testimonial.avatar}" alt="${testimonial.name}">
                    </div>
                    <div class="testimonial-info">
                        <h5 class="testimonial-name">${testimonial.name}</h5>
                        <p class="testimonial-position mb-0">${testimonial.position}</p>
                    </div>
                </div>
            `;
            
            testimonialsList.appendChild(div);
        });
        
        // Contact Section
        document.getElementById('contactDescription').textContent = userData.contact.description;
        document.getElementById('contactLocation').textContent = userData.location;
        document.getElementById('contactEmail').textContent = userData.contact.email;
        document.getElementById('contactPhone').textContent = userData.contact.phone;
        
        // Social Links
        const contactSocials = document.getElementById('contactSocials');
        userData.social.forEach(social => {
            const a = document.createElement('a');
            a.className = 'contact-social';
            a.href = social.url;
            a.target = '_blank';
            a.innerHTML = `<i class="${social.icon}"></i>`;
            
            contactSocials.appendChild(a);
        });
        
        // Footer
        document.getElementById('footerCopyright').textContent = `© ${new Date().getFullYear()} ${userData.name}. All Rights Reserved.`;
    }
});
