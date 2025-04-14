document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // Cursor follow effect
    const cursor = document.querySelector('.cursor-follow');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        if (cursor.style.opacity === '0') {
            cursor.style.opacity = '1';
        }
    });
    
    document.addEventListener('mouseout', () => {
        cursor.style.opacity = '0';
    });
    
    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .filters-list li');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });
    
    // Navbar scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    
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
    const filterButtons = document.querySelectorAll('.filters-list li');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            const portfolioItems = document.querySelectorAll('.work-item');
            
            portfolioItems.forEach(item => {
                if (filterValue === '*' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Testimonial Carousel Navigation
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.style.display = 'block';
            } else {
                testimonial.style.display = 'none';
            }
        });
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    if (prevBtn && nextBtn && testimonials.length > 0) {
        prevBtn.addEventListener('click', prevTestimonial);
        nextBtn.addEventListener('click', nextTestimonial);
        showTestimonial(0);
    }
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const inputs = this.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
            });
            
            if (isValid) {
                // Show success message
                this.innerHTML = `
                    <div class="text-center py-5">
                        <i class="fas fa-check-circle text-success fa-4x mb-4"></i>
                        <h3>Message Sent Successfully!</h3>
                        <p>I'll get back to you as soon as possible.</p>
                    </div>
                `;
            }
        });
    }
    
    // Initialize user data
    populateUserData();
    
    // Function to populate user data
    function populateUserData() {
        // Navbar brand
        document.querySelector('.logo-text').textContent = userData.name.split(' ')[0];
        
        // Navigation links
        const navLinks = document.getElementById('navLinks');
        userData.navigation.forEach(item => {
            const li = document.createElement('li');
            li.className = 'nav-item';
            
            const a = document.createElement('a');
            a.className = 'nav-link';
            a.href = item.url;
            a.textContent = item.label;
            
            li.appendChild(a);
            navLinks.appendChild(li);
        });
        
        // Side social
        const sideSocial = document.getElementById('sideSocial');
        userData.social.forEach(item => {
            const li = document.createElement('li');
            
            const a = document.createElement('a');
            a.href = item.url;
            a.target = '_blank';
            a.innerHTML = `<i class="${item.icon}"></i>`;
            
            li.appendChild(a);
            sideSocial.appendChild(li);
        });
        
        // Hero section
        document.getElementById('heroGreeting').textContent = 'Hello, I\'m';
        document.getElementById('heroName').textContent = userData.name;
        document.getElementById('heroTitle').textContent = userData.title;
        document.getElementById('heroDescription').textContent = userData.intro;
        
        // About section
        document.getElementById('aboutImage').src = userData.avatar;
        document.getElementById('experienceBadge').innerHTML = `${userData.experience}<br>Experience`;
        document.getElementById('aboutTitle').textContent = userData.about.title;
        document.getElementById('aboutDescription').textContent = userData.about.description;
        document.getElementById('aboutName').textContent = userData.name;
        document.getElementById('aboutEmail').textContent = userData.contact.email;
        document.getElementById('aboutPhone').textContent = userData.contact.phone;
        document.getElementById('aboutLocation').textContent = userData.location;
        document.getElementById('cvLink').href = userData.cvLink;
        
        // Skills section
        const skillsList = document.getElementById('skillsList');
        userData.skills.forEach((skill, index) => {
            if (index < 6) { // Limit to 6 skills
                const div = document.createElement('div');
                div.className = 'col-md-6 col-lg-4 mb-4';
                div.setAttribute('data-aos', 'fade-up');
                div.setAttribute('data-aos-delay', (index * 100).toString());
                
                div.innerHTML = `
                    <div class="skill-item">
                        <div class="skill-icon"><i class="${skill.icon}"></i></div>
                        <h4 class="skill-title">${skill.name}</h4>
                        <p>${skill.description}</p>
                        <div class="skill-progress">
                            <div class="progress-bar" style="width: ${Math.floor(Math.random() * 30) + 70}%"></div>
                        </div>
                    </div>
                `;
                
                skillsList.appendChild(div);
            }
        });
        
        // Services section
        const servicesList = document.getElementById('servicesList');
        userData.services.forEach((service, index) => {
            const div = document.createElement('div');
            div.className = 'col-md-6 col-lg-4 mb-4';
            div.setAttribute('data-aos', 'fade-up');
            div.setAttribute('data-aos-delay', (index * 100).toString());
            
            div.innerHTML = `
                <div class="service-item">
                    <div class="service-icon"><i class="${service.icon}"></i></div>
                    <h4 class="service-title">${service.title}</h4>
                    <div class="service-text">
                        <p>${service.description}</p>
                    </div>
                </div>
            `;
            
            servicesList.appendChild(div);
        });
        
        // Portfolio section
        const worksFilters = document.getElementById('worksFilters');
        const categories = new Set();
        userData.portfolio.forEach(item => categories.add(item.category));
        
        categories.forEach(category => {
            const li = document.createElement('li');
            li.textContent = category;
            li.setAttribute('data-filter', category.toLowerCase().replace(' ', '-'));
            worksFilters.appendChild(li);
        });
        
        const worksGrid = document.getElementById('worksGrid');
        userData.portfolio.forEach((work, index) => {
            const div = document.createElement('div');
            div.className = `col-md-6 col-lg-4 mb-4 work-item ${work.category.toLowerCase().replace(' ', '-')}`;
            div.setAttribute('data-aos', 'fade-up');
            div.setAttribute('data-aos-delay', (index * 100).toString());
            
            div.innerHTML = `
                <div class="work-img">
                    <img src="${work.image}" alt="${work.title}">
                    <div class="work-overlay">
                        <div class="work-overlay-content">
                            <h4 class="work-title">${work.title}</h4>
                            <p class="work-category">${work.category}</p>
                        </div>
                        <a href="${work.link}" class="work-link" target="_blank">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </div>
            `;
            
            worksGrid.appendChild(div);
        });
        
        // Testimonials section
        const testimonialsWrapper = document.getElementById('testimonialsWrapper');
        userData.testimonials.forEach((testimonial, index) => {
            const div = document.createElement('div');
            div.className = 'testimonial-item';
            
            div.innerHTML = `
                <div class="testimonial-content">
                    <div class="testimonial-text">
                        <p>${testimonial.text}</p>
                    </div>
                    <div class="testimonial-author">
                        <div class="testimonial-author-img">
                            <img src="${testimonial.avatar}" alt="${testimonial.name}">
                        </div>
                        <div class="testimonial-author-info">
                            <h5>${testimonial.name}</h5>
                            <span>${testimonial.position}</span>
                        </div>
                    </div>
                </div>
            `;
            
            testimonialsWrapper.appendChild(div);
            
            if (index > 0) {
                div.style.display = 'none';
            }
        });
        
        // Contact section
        document.getElementById('contactDescription').textContent = userData.contact.description;
        document.getElementById('contactLocation').textContent = userData.location;
        document.getElementById('contactEmail').textContent = userData.contact.email;
        document.getElementById('contactPhone').textContent = userData.contact.phone;
        
        const contactSocial = document.getElementById('contactSocial');
        userData.social.forEach(item => {
            const a = document.createElement('a');
            a.href = item.url;
            a.target = '_blank';
            a.innerHTML = `<i class="${item.icon}"></i>`;
            contactSocial.appendChild(a);
        });
        
        // Footer
        document.getElementById('footerCopyright').textContent = `© ${new Date().getFullYear()} ${userData.name}. All rights reserved.`;
    }
});
