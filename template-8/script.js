// Main script for Template 8

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the template
    initTemplate();
    
    // Load user data
    loadUserData();
});

// Initialize template functionality
function initTemplate() {
    // Navigation and section handling
    setupNavigation();
    
    // Mobile sidebar toggle
    setupMobileMenu();
    
    // Theme settings
    setupThemeSettings();
    
    // Resume tabs
    setupTabs();
    
    // Project filtering
    setupProjectFilter();
    
    // Testimonial slider
    setupTestimonialSlider();
    
    // Contact form
    setupContactForm();
    
    // Project modals
    setupProjectModals();
    
    // Keyboard shortcuts
    setupKeyboardShortcuts();
    
    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true
        });
    }
}

// Setup navigation to switch between sections
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get target section
            const targetId = this.getAttribute('href');
            
            // Deactivate all sections and nav links
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            // Activate target section and this nav link
            document.querySelector(targetId).classList.add('active');
            this.classList.add('active');
            
            // Close mobile menu if open
            if (window.innerWidth < 768) {
                document.getElementById('sidebar').classList.remove('active');
            }
        });
    });
}

// Setup mobile menu toggle
function setupMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    mobileToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
        document.body.classList.toggle('sidebar-open');
    });
    
    // Close sidebar when clicking overlay
    sidebarOverlay.addEventListener('click', function() {
        sidebar.classList.remove('active');
        mobileToggle.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.classList.remove('sidebar-open');
    });
    
    // Close sidebar when selecting a menu item
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                sidebar.classList.remove('active');
                mobileToggle.classList.remove('active');
                sidebarOverlay.classList.remove('active');
                document.body.classList.remove('sidebar-open');
            }
        });
    });
}

// Setup theme settings panel
function setupThemeSettings() {
    const themeToggle = document.getElementById('themeToggle');
    const themeSettings = themeToggle.closest('.theme-settings');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const colorOptions = document.querySelectorAll('.color-option');
    
    // Theme settings panel toggle
    themeToggle.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent click from bubbling up
        themeSettings.classList.toggle('active');
    });
    
    // Close theme panel when clicking outside
    document.addEventListener('click', function(e) {
        if (themeSettings.classList.contains('active') && !themeSettings.contains(e.target)) {
            themeSettings.classList.remove('active');
        }
    });
    
    // Prevent panel clicks from closing the panel
    document.querySelector('.theme-panel').addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Dark mode toggle
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Color options
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            
            document.documentElement.style.setProperty('--primary-color', color);
            
            // Update darker and lighter variants
            const darker = adjustColor(color, -20);
            const lighter = adjustColor(color, 70);
            
            document.documentElement.style.setProperty('--primary-dark', darker);
            document.documentElement.style.setProperty('--primary-light', lighter);
            
            // Save color preference
            localStorage.setItem('primary-color', color);
            
            // Update active state
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Load saved theme preferences
    loadThemePreferences();
}

// Load saved theme preferences
function loadThemePreferences() {
    const savedTheme = localStorage.getItem('theme');
    const savedColor = localStorage.getItem('primary-color');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.getElementById('darkModeToggle').checked = true;
    }
    
    if (savedColor) {
        document.documentElement.style.setProperty('--primary-color', savedColor);
        
        // Update darker and lighter variants
        const darker = adjustColor(savedColor, -20);
        const lighter = adjustColor(savedColor, 70);
        
        document.documentElement.style.setProperty('--primary-dark', darker);
        document.documentElement.style.setProperty('--primary-light', lighter);
        
        // Update active color option
        document.querySelectorAll('.color-option').forEach(option => {
            if (option.getAttribute('data-color') === savedColor) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }
}

// Adjust color brightness
function adjustColor(color, percent) {
    // Convert hex to RGB
    let r = parseInt(color.substring(1, 3), 16);
    let g = parseInt(color.substring(3, 5), 16);
    let b = parseInt(color.substring(5, 7), 16);
    
    // Adjust brightness
    r = Math.max(0, Math.min(255, r + percent));
    g = Math.max(0, Math.min(255, g + percent));
    b = Math.max(0, Math.min(255, b + percent));
    
    // Convert back to hex
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// Setup tabs (used in Resume section)
function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Deactivate all tabs and contents
            document.querySelectorAll('.tab-btn').forEach(tab => {
                tab.classList.remove('active');
            });
            
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Activate clicked tab and its content
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
}

// Setup project filtering
function setupProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(fb => fb.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            const projects = document.querySelectorAll('.project-item');
            
            projects.forEach(project => {
                if (filter === 'all') {
                    project.style.display = 'block';
                } else {
                    if (project.classList.contains(filter)) {
                        project.style.display = 'block';
                    } else {
                        project.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Setup testimonial slider
function setupTestimonialSlider() {
    let currentSlide = 0;
    const testimonials = document.querySelectorAll('.testimonial-item');
    const wrapper = document.getElementById('testimonialsWrapper');
    const pagination = document.querySelector('.swiper-pagination');
    
    if (testimonials.length === 0) return;
    
    // Create pagination bullets
    testimonials.forEach((_, index) => {
        const bullet = document.createElement('div');
        bullet.className = 'swiper-pagination-bullet';
        if (index === 0) bullet.classList.add('swiper-pagination-bullet-active');
        
        bullet.addEventListener('click', () => {
            goToSlide(index);
        });
        
        pagination.appendChild(bullet);
    });
    
    // Auto slide every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonials.length;
        goToSlide(currentSlide);
    }, 5000);
    
    // Go to specific slide
    function goToSlide(index) {
        wrapper.style.transform = `translateX(${-100 * index}%)`;
        currentSlide = index;
        
        // Update pagination
        document.querySelectorAll('.swiper-pagination-bullet').forEach((bullet, i) => {
            if (i === index) {
                bullet.classList.add('swiper-pagination-bullet-active');
            } else {
                bullet.classList.remove('swiper-pagination-bullet-active');
            }
        });
    }
}

// Setup contact form
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.value.trim() === '') {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    const formContainer = contactForm.parentElement;
                    formContainer.innerHTML = `
                        <div class="success-message">
                            <i class="fas fa-check-circle success-icon"></i>
                            <h3>Message Sent Successfully!</h3>
                            <p>Thank you for contacting me. I'll get back to you soon.</p>
                        </div>
                    `;
                }, 1500);
            }
        });
    }
}

// Setup project modals
function setupProjectModals() {
    const projectLinks = document.querySelectorAll('.project-details-link');
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.querySelector('.modal-close');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const projectId = this.getAttribute('data-id');
            const project = userData.projects.find(p => p.id === parseInt(projectId));
            
            if (project) {
                // Populate modal with project details
                modalBody.innerHTML = `
                    <div class="project-modal-header">
                        <h2 class="project-modal-title">${project.title}</h2>
                        <div class="project-modal-category">${project.category}</div>
                    </div>
                    <div class="project-modal-image">
                        <img src="${project.image}" alt="${project.title}">
                    </div>
                    <div class="project-modal-details">
                        <p>${project.description}</p>
                    </div>
                    <div class="project-modal-info">
                        <div class="project-info-item">
                            <span class="project-info-label">Client:</span>
                            <span>${project.client || 'Personal Project'}</span>
                        </div>
                        <div class="project-info-item">
                            <span class="project-info-label">Date:</span>
                            <span>${project.date || 'N/A'}</span>
                        </div>
                        <div class="project-info-item">
                            <span class="project-info-label">Technologies:</span>
                            <span>${project.technologies}</span>
                        </div>
                        <div class="project-info-item">
                            <span class="project-info-label">URL:</span>
                            <span><a href="${project.link}" target="_blank">${project.link}</a></span>
                        </div>
                    </div>
                `;
                
                // Show modal
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Re-enable scrolling
    }
}

// Load user data into the template
function loadUserData() {
    // Basic profile info
    document.getElementById('profileName').textContent = userData.name;
    document.getElementById('profileImage').src = userData.avatar;
    document.getElementById('profileTitle').textContent = userData.title;
    
    document.getElementById('heroName').textContent = userData.name;
    document.getElementById('heroTitle').textContent = userData.title;
    document.getElementById('heroDescription').textContent = userData.intro;
    document.getElementById('downloadCV').href = userData.cvLink;
    
    document.getElementById('footerName').textContent = userData.name;
    
    // About section
    document.getElementById('aboutDescription').textContent = userData.about?.description || userData.intro;
    document.getElementById('infoName').textContent = userData.name;
    document.getElementById('infoEmail').textContent = userData.contact.email;
    document.getElementById('infoPhone').textContent = userData.contact.phone;
    document.getElementById('infoLocation').textContent = userData.location;
    document.getElementById('infoExperience').textContent = userData.experience;
    
    // Contact section
    document.getElementById('contactEmail').textContent = userData.contact.email;
    document.getElementById('contactPhone').textContent = userData.contact.phone;
    document.getElementById('contactLocation').textContent = userData.location;
    
    // Load dynamic sections
    loadSkills();
    loadResume();
    loadProjects();
    loadServices();
    loadTestimonials();
    loadSocials();
}

// Load skills section
function loadSkills() {
    const skillsContainer = document.getElementById('skillsContainer');
    if (!skillsContainer) return;
    
    skillsContainer.innerHTML = '';
    
    userData.skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        
        skillItem.innerHTML = `
            <div class="skill-icon">
                <i class="${skill.icon}"></i>
            </div>
            <div class="skill-name">${skill.name}</div>
            <div class="skill-description">${skill.description}</div>
            <div class="skill-progress">
                <div class="skill-progress-bar" style="width: ${skill.percentage}%"></div>
            </div>
        `;
        
        skillsContainer.appendChild(skillItem);
    });
}

// Load resume section
function loadResume() {
    const experienceTimeline = document.getElementById('experienceTimeline');
    const educationTimeline = document.getElementById('educationTimeline');
    
    if (experienceTimeline) {
        experienceTimeline.innerHTML = '';
        
        userData.experience_list.forEach(exp => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            
            timelineItem.innerHTML = `
                <h3 class="timeline-title">${exp.position}</h3>
                <p class="timeline-place">${exp.company}</p>
                <span class="timeline-date">${exp.years}</span>
                <div class="timeline-description">
                    <p>${exp.description}</p>
                </div>
            `;
            
            experienceTimeline.appendChild(timelineItem);
        });
    }
    
    if (educationTimeline) {
        educationTimeline.innerHTML = '';
        
        userData.education.forEach(edu => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            
            timelineItem.innerHTML = `
                <h3 class="timeline-title">${edu.degree}</h3>
                <p class="timeline-place">${edu.institution}</p>
                <span class="timeline-date">${edu.years}</span>
                <div class="timeline-description">
                    <p>${edu.description}</p>
                </div>
            `;
            
            educationTimeline.appendChild(timelineItem);
        });
    }
}

// Load projects section
function loadProjects() {
    const projectsContainer = document.getElementById('projectsContainer');
    if (!projectsContainer) return;
    
    projectsContainer.innerHTML = '';
    
    userData.projects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = `project-item ${project.category.toLowerCase().replace(' ', '-')}`;
        
        projectItem.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-overlay">
                <div class="project-details">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-category">${project.category}</p>
                    <div class="project-actions">
                        <a href="#" class="project-link project-details-link" data-id="${project.id}">
                            <i class="fas fa-search"></i>
                        </a>
                        <a href="${project.link}" class="project-link" target="_blank">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        projectsContainer.appendChild(projectItem);
    });
    
    // Re-initialize project modals after loading projects
    setupProjectModals();
}

// Load services section
function loadServices() {
    const servicesContainer = document.getElementById('servicesContainer');
    if (!servicesContainer) return;
    
    servicesContainer.innerHTML = '';
    
    userData.services.forEach(service => {
        const serviceItem = document.createElement('div');
        serviceItem.className = 'service-item';
        
        serviceItem.innerHTML = `
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>
            <h3 class="service-title">${service.title}</h3>
            <p>${service.description}</p>
        `;
        
        servicesContainer.appendChild(serviceItem);
    });
}

// Load testimonials section
function loadTestimonials() {
    const testimonialsWrapper = document.getElementById('testimonialsWrapper');
    if (!testimonialsWrapper) return;
    
    testimonialsWrapper.innerHTML = '';
    
    if (userData.testimonials && userData.testimonials.length) {
        userData.testimonials.forEach(testimonial => {
            const testimonialItem = document.createElement('div');
            testimonialItem.className = 'testimonial-item';
            
            testimonialItem.innerHTML = `
                <p class="testimonial-text">${testimonial.text}</p>
                <div class="testimonial-author">
                    <div class="testimonial-avatar">
                        <img src="${testimonial.avatar}" alt="${testimonial.name}">
                    </div>
                    <div class="testimonial-info">
                        <h4 class="testimonial-name">${testimonial.name}</h4>
                        <p class="testimonial-position">${testimonial.position}</p>
                    </div>
                </div>
            `;
            
            testimonialsWrapper.appendChild(testimonialItem);
        });
        
        // Reinitialize testimonial slider
        setupTestimonialSlider();
    }
}

// Load social media links
function loadSocials() {
    const socialLinks = document.querySelector('.social-links');
    if (!socialLinks) return;
    
    socialLinks.innerHTML = '';
    
    userData.social.forEach(item => {
        const link = document.createElement('a');
        link.href = item.url;
        link.className = 'social-icon';
        link.target = '_blank';
        link.innerHTML = `<i class="${item.icon}"></i>`;
        
        socialLinks.appendChild(link);
    });
}

// Setup keyboard shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // ESC to close theme settings panel
        if (e.key === 'Escape') {
            document.querySelector('.theme-settings').classList.remove('active');
        }
        
        // Toggle theme settings with keyboard (Ctrl + T)
        if (e.ctrlKey && e.key === 't') {
            e.preventDefault();
            document.querySelector('.theme-settings').classList.toggle('active');
        }
        
        // Toggle dark mode with keyboard (Ctrl + D)
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            const darkModeToggle = document.getElementById('darkModeToggle');
            darkModeToggle.checked = !darkModeToggle.checked;
            
            // Trigger the change event
            const event = new Event('change');
            darkModeToggle.dispatchEvent(event);
        }
    });
}

// Add section visibility detection for better UX
function setupScrollSpy() {
    if (window.innerWidth >= 768) {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= sectionTop - 300) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// Check if an element is in viewport - utility function
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) && 
        rect.bottom >= 0
    );
}
