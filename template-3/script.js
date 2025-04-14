document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // Populate content from user data
    populateContent();
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Typewriter effect for hero description
    const heroDescription = document.getElementById('heroDescription');
    const text = heroDescription.textContent;
    heroDescription.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroDescription.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typewriter after a short delay
    setTimeout(typeWriter, 1000);
    
    // Back to top button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Portfolio filtering
    const portfolioFilters = document.querySelectorAll('.filter-list li');
    portfolioFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            portfolioFilters.forEach(item => item.classList.remove('active'));
            
            // Add active class to current filter
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            
            portfolioItems.forEach(item => {
                if (filterValue === '*' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Testimonial slider
    let currentTestimonial = 0;
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    
    function showTestimonial(index) {
        testimonialItems.forEach(item => item.classList.remove('active'));
        testimonialItems[index].classList.add('active');
    }
    
    if (testimonialItems.length > 0) {
        // Show first testimonial initially
        showTestimonial(currentTestimonial);
        
        // Previous testimonial
        testimonialPrev.addEventListener('click', () => {
            currentTestimonial--;
            if (currentTestimonial < 0) {
                currentTestimonial = testimonialItems.length - 1;
            }
            showTestimonial(currentTestimonial);
        });
        
        // Next testimonial
        testimonialNext.addEventListener('click', () => {
            currentTestimonial++;
            if (currentTestimonial >= testimonialItems.length) {
                currentTestimonial = 0;
            }
            showTestimonial(currentTestimonial);
        });
    }
    
    // Form submission handler
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        let isValid = true;
        const formInputs = this.querySelectorAll('.form-control');
        
        formInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });
        
        if (isValid) {
            // Show success message (in a real app, you'd send data to a server)
            this.innerHTML = `
                <div class="text-center py-5">
                    <div class="mb-4">
                        <i class="fas fa-check-circle" style="font-size: 50px; color: var(--success);"></i>
                    </div>
                    <h3>MESSAGE TRANSMITTED</h3>
                    <p>Your message has been successfully sent. I'll get back to you soon.</p>
                </div>
            `;
        }
    });
    
    // Helper function to populate content from user data
    function populateContent() {
        // Set logo text
        document.querySelector('#logo .logo-text').textContent = userData.name.split(' ')[0];
        
        // Navigation links
        const navLinks = document.getElementById('navLinks');
        userData.navigation.forEach(item => {
            const li = document.createElement('li');
            li.className = 'nav-item';
            
            const link = document.createElement('a');
            link.className = 'nav-link';
            link.href = item.url;
            link.textContent = item.label;
            
            li.appendChild(link);
            navLinks.appendChild(li);
        });
        
        // Hero section
        document.getElementById('heroName').textContent = userData.name;
        document.getElementById('heroTitle').textContent = userData.title;
        document.getElementById('heroDescription').textContent = userData.intro;
        document.getElementById('heroImage').src = userData.avatar;
        
        // About section
        document.getElementById('aboutTitle').textContent = userData.about.title;
        document.getElementById('aboutDescription').textContent = userData.about.description;
        document.getElementById('aboutName').textContent = userData.name;
        document.getElementById('aboutLocation').textContent = userData.location;
        document.getElementById('aboutEmail').textContent = userData.contact.email;
        document.getElementById('aboutExperience').textContent = userData.experience;
        document.getElementById('aboutImage').src = userData.avatar;
        document.getElementById('cvButton').href = userData.cvLink;
        
        // Skills section
        const skillsList = document.getElementById('skillsList');
        userData.skills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.setAttribute('data-aos', 'fade-up');
            
            skillItem.innerHTML = `
                <div class="skill-icon"><i class="${skill.icon}"></i></div>
                <h3 class="skill-title">${skill.name}</h3>
                <p>${skill.description}</p>
            `;
            
            skillsList.appendChild(skillItem);
        });
        
        // Experience section
        const experienceList = document.getElementById('experienceList');
        userData.experience_list.forEach(exp => {
            const expItem = document.createElement('div');
            expItem.className = 'resume-item';
            expItem.setAttribute('data-aos', 'fade-up');
            
            expItem.innerHTML = `
                <div class="resume-date">${exp.years}</div>
                <h4 class="resume-position">${exp.position}</h4>
                <div class="resume-company">${exp.company}</div>
                <p>${exp.description}</p>
            `;
            
            experienceList.appendChild(expItem);
        });
        
        // Education section
        const educationList = document.getElementById('educationList');
        userData.education.forEach(edu => {
            const eduItem = document.createElement('div');
            eduItem.className = 'resume-item';
            eduItem.setAttribute('data-aos', 'fade-up');
            
            eduItem.innerHTML = `
                <div class="resume-date">${edu.years}</div>
                <h4 class="resume-position">${edu.degree}</h4>
                <div class="resume-company">${edu.institution}</div>
                <p>${edu.description}</p>
            `;
            
            educationList.appendChild(eduItem);
        });
        
        // Portfolio section
        // Add filters
        const portfolioFilters = document.getElementById('portfolioFilters');
        const categories = new Set();
        userData.portfolio.forEach(item => categories.add(item.category));
        
        categories.forEach(category => {
            const filterItem = document.createElement('li');
            filterItem.textContent = category.toUpperCase();
            filterItem.setAttribute('data-filter', category.toLowerCase().replace(' ', '-'));
            portfolioFilters.appendChild(filterItem);
        });
        
        // Add portfolio items
        const portfolioGrid = document.getElementById('portfolioGrid');
        userData.portfolio.forEach(project => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = `portfolio-item ${project.category.toLowerCase().replace(' ', '-')}`;
            portfolioItem.setAttribute('data-aos', 'fade-up');
            
            portfolioItem.innerHTML = `
                <div class="portfolio-image">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="portfolio-overlay">
                        <div class="portfolio-category">${project.category}</div>
                        <h3 class="portfolio-title">${project.title}</h3>
                        <div class="portfolio-links">
                            <a href="${project.link}" class="portfolio-link" target="_blank">
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="portfolio-info">
                    <h4 class="portfolio-title">${project.title}</h4>
                    <div class="portfolio-category">${project.category}</div>
                </div>
            `;
            
            portfolioGrid.appendChild(portfolioItem);
        });
        
        // Services section
        const servicesList = document.getElementById('servicesList');
        userData.services.forEach((service, index) => {
            const serviceItem = document.createElement('div');
            serviceItem.className = 'service-item';
            serviceItem.setAttribute('data-aos', 'fade-up');
            
            serviceItem.innerHTML = `
                <div class="service-icon"><i class="${service.icon}"></i></div>
                <h3 class="service-title">${service.title}</h3>
                <p class="service-description">${service.description}</p>
                <div class="service-number">0${index + 1}</div>
            `;
            
            servicesList.appendChild(serviceItem);
        });
        
        // Testimonials section
        const testimonialsList = document.getElementById('testimonialsList');
        userData.testimonials.forEach(testimonial => {
            const testimonialItem = document.createElement('div');
            testimonialItem.className = 'testimonial-item';
            
            testimonialItem.innerHTML = `
                <div class="testimonial-content">
                    <div class="testimonial-text">
                        <p>${testimonial.text}</p>
                    </div>
                    <div class="testimonial-author">
                        <div class="testimonial-avatar">
                            <img src="${testimonial.avatar}" alt="${testimonial.name}">
                        </div>
                        <div class="testimonial-info">
                            <h5>${testimonial.name}</h5>
                            <span>${testimonial.position}</span>
                        </div>
                    </div>
                </div>
            `;
            
            testimonialsList.appendChild(testimonialItem);
        });
        
        // Contact section
        document.getElementById('contactDescription').textContent = userData.contact.description;
        document.getElementById('contactLocation').textContent = userData.location;
        document.getElementById('contactEmail').textContent = userData.contact.email;
        document.getElementById('contactPhone').textContent = userData.contact.phone;
        
        // Social links
        const socialLinks = document.getElementById('socialLinks');
        userData.social.forEach(social => {
            const socialLink = document.createElement('a');
            socialLink.href = social.url;
            socialLink.target = '_blank';
            socialLink.innerHTML = `<i class="${social.icon}"></i>`;
            socialLinks.appendChild(socialLink);
        });
        
        // Footer copyright
        document.getElementById('footerCopyright').textContent = `© ${new Date().getFullYear()} ${userData.name}. All Rights Reserved.`;
    }
});
