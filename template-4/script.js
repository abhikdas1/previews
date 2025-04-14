document.addEventListener('DOMContentLoaded', function() {
    // First show boot screen
    showBootScreen();
    
    // The rest of the initialization will happen after boot animation
    setTimeout(function() {
        // Initialize user data
        loadUserData();
        
        // Set up clock
        updateClock();
        setInterval(updateClock, 1000);
        
        // Set up desktop icons
        const desktopIcons = document.querySelectorAll('.desktop-icon');
        desktopIcons.forEach(icon => {
            icon.addEventListener('click', function() {
                const windowName = this.getAttribute('data-window');
                openWindow(windowName);
            });
        });
        
        // Set up start menu with debug
        const startButton = document.getElementById('startButton');
        const startMenu = document.getElementById('startMenu');
        
        // Debug check if elements exist
        console.log('Start button:', startButton);
        console.log('Start menu:', startMenu);
        
        // Fix: Ensure elements exist before adding event listeners
        if (startButton && startMenu) {
            startButton.addEventListener('click', function(e) {
                // Fix: Stop propagation to prevent document click from immediately closing it
                e.stopPropagation();
                console.log('Start button clicked');
                startMenu.classList.toggle('active');
                startButton.classList.toggle('active');
                
                // Close other panels
                closeSystemPanels(['startMenu']);
            });
            
            // Fix: Make sure clicks within the start menu don't close it
            startMenu.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        } else {
            console.error('Start button or menu elements not found!');
        }
        
        // Close start menu when clicking outside
        document.addEventListener('click', function(event) {
            // Fix: More explicit check that we're not clicking on related elements
            const isClickInsideStartButton = startButton && startButton.contains(event.target);
            const isClickInsideStartMenu = startMenu && startMenu.contains(event.target);
            
            if (!isClickInsideStartMenu && !isClickInsideStartButton && startMenu && startMenu.classList.contains('active')) {
                console.log('Closing start menu from document click');
                startMenu.classList.remove('active');
                if (startButton) startButton.classList.remove('active');
            }
        });
        
        // Set up start menu items
        const startMenuItems = document.querySelectorAll('.menu-item');
        startMenuItems.forEach(item => {
            item.addEventListener('click', function() {
                const windowName = this.getAttribute('data-window');
                openWindow(windowName);
                startMenu.classList.remove('active');
                startButton.classList.remove('active');
            });
        });
        
        // Set up action center
        const actionCenterButton = document.getElementById('actionCenterButton');
        const notificationsCenter = document.getElementById('notificationsCenter');
        actionCenterButton.addEventListener('click', function() {
            notificationsCenter.classList.toggle('active');
            // Close other panels
            closeSystemPanels(['notificationsCenter']);
        });
        
        // Close action center when clicking outside
        document.addEventListener('click', function(event) {
            if (!notificationsCenter.contains(event.target) && !actionCenterButton.contains(event.target)) {
                notificationsCenter.classList.remove('active');
            }
        });
        
        // Set up notification close buttons
        const notificationCloseButtons = document.querySelectorAll('.notification-close');
        notificationCloseButtons.forEach(button => {
            button.addEventListener('click', function() {
                this.closest('.notification').remove();
            });
        });
        
        // Clear all notifications
        const clearAllButton = document.querySelector('.clear-all');
        clearAllButton.addEventListener('click', function() {
            document.querySelectorAll('.notification').forEach(notification => {
                notification.remove();
            });
        });
        
        // Set up system panels (WiFi, Volume, etc.)
        setupSystemPanels();
        
        // Set up theme toggle
        setupThemeToggle();
        
        // Set up power options
        setupPowerOptions();
        
        // Window controls
        setupWindows();
        
        // Resume tabs
        const resumeTabs = document.querySelectorAll('.ribbon-tab');
        resumeTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.ribbon-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.resume-tab').forEach(t => t.classList.remove('active'));
                
                this.classList.add('active');
                const tabName = this.getAttribute('data-tab');
                document.getElementById(tabName + '-tab').classList.add('active');
            });
        });
        
        // Project search
        const projectSearch = document.querySelector('.search-box input');
        if (projectSearch) {
            projectSearch.addEventListener('input', function() {
                const searchValue = this.value.toLowerCase();
                const projects = document.querySelectorAll('.project-card');
                
                projects.forEach(project => {
                    const title = project.querySelector('.project-title').textContent.toLowerCase();
                    const category = project.querySelector('.project-category').textContent.toLowerCase();
                    const description = project.querySelector('.project-description').textContent.toLowerCase();
                    
                    if (title.includes(searchValue) || category.includes(searchValue) || description.includes(searchValue)) {
                        project.style.display = '';
                    } else {
                        project.style.display = 'none';
                    }
                });
            });
        }
        
        // Contact form submission
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Show success message
                const formContent = this.innerHTML;
                this.innerHTML = `
                    <div class="text-center py-4">
                        <div style="font-size: 48px; color: #0078d7; margin-bottom: 20px;">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h3>Message Sent Successfully!</h3>
                        <p>Thank you for your message. I will get back to you soon.</p>
                    </div>
                `;
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    this.innerHTML = formContent;
                    this.reset();
                }, 3000);
            });
        }
        
        // Hide boot screen
        hideBootScreen();
    }, 2000); // Wait 2 seconds before hiding boot screen
});

// Show boot screen
function showBootScreen() {
    const bootScreen = document.getElementById('bootScreen');
    bootScreen.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Hide boot screen
function hideBootScreen() {
    const bootScreen = document.getElementById('bootScreen');
    bootScreen.classList.remove('active');
    setTimeout(() => {
        bootScreen.style.display = 'none';
        document.body.style.overflow = '';
    }, 500); // Wait for transition to complete
}

// Setup System Panels
function setupSystemPanels() {
    // WiFi button
    const wifiButton = document.getElementById('wifiButton');
    const wifiPanel = document.getElementById('wifiPanel');
    
    wifiButton.addEventListener('click', function(e) {
        e.stopPropagation();
        wifiPanel.classList.toggle('active');
        // Close other panels
        closeSystemPanels(['wifiPanel']);
    });
    
    // WiFi toggle
    const wifiToggle = document.getElementById('wifiToggle');
    wifiToggle.addEventListener('change', function() {
        const wifiIcon = wifiButton.querySelector('i');
        if (this.checked) {
            wifiIcon.className = 'fas fa-wifi';
        } else {
            wifiIcon.className = 'fas fa-wifi-slash';
        }
    });
    
    // WiFi network selection
    const wifiNetworks = document.querySelectorAll('.wifi-network');
    wifiNetworks.forEach(network => {
        network.addEventListener('click', function() {
            wifiNetworks.forEach(n => n.classList.remove('connected'));
            this.classList.add('connected');
        });
    });
    
    // Volume button
    const volumeButton = document.getElementById('volumeButton');
    const volumePanel = document.getElementById('volumePanel');
    
    volumeButton.addEventListener('click', function(e) {
        e.stopPropagation();
        volumePanel.classList.toggle('active');
        // Close other panels
        closeSystemPanels(['volumePanel']);
    });
    
    // Volume slider
    const volumeSlider = document.getElementById('volumeSlider');
    volumeSlider.addEventListener('input', function() {
        const volumeIcon = volumeButton.querySelector('i');
        if (this.value == 0) {
            volumeIcon.className = 'fas fa-volume-mute';
        } else if (this.value < 50) {
            volumeIcon.className = 'fas fa-volume-down';
        } else {
            volumeIcon.className = 'fas fa-volume-up';
        }
    });
    
    // Close panels when clicking outside
    document.addEventListener('click', function(event) {
        if (!wifiButton.contains(event.target) && !wifiPanel.contains(event.target)) {
            wifiPanel.classList.remove('active');
        }
        
        if (!volumeButton.contains(event.target) && !volumePanel.contains(event.target)) {
            volumePanel.classList.remove('active');
        }
    });
}

// Setup Theme Toggle
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('win10Theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.querySelector('i').className = 'fas fa-sun';
    } else {
        themeToggle.querySelector('i').className = 'fas fa-moon';
    }
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('win10Theme', 'dark');
            this.querySelector('i').className = 'fas fa-sun';
        } else {
            localStorage.setItem('win10Theme', 'light');
            this.querySelector('i').className = 'fas fa-moon';
        }
    });
}

// Setup Power Options
function setupPowerOptions() {
    const powerButton = document.querySelector('.power-button');
    const powerPanel = document.getElementById('powerPanel');
    
    powerButton.addEventListener('click', function(e) {
        e.stopPropagation();
        powerPanel.classList.toggle('active');
    });
    
    // Close panel when clicking outside
    document.addEventListener('click', function(event) {
        if (!powerButton.contains(event.target) && !powerPanel.contains(event.target)) {
            powerPanel.classList.remove('active');
        }
    });
    
    // Sleep option
    const sleepOption = document.getElementById('sleepOption');
    sleepOption.addEventListener('click', function() {
        showBootScreen();
        setTimeout(function() {
            hideBootScreen();
        }, 3000);
    });
    
    // Shutdown option
    const shutdownOption = document.getElementById('shutdownOption');
    shutdownOption.addEventListener('click', function() {
        showBootScreen();
        setTimeout(function() {
            window.location.href = '../../index.html';
        }, 2000);
    });
    
    // Restart option
    const restartOption = document.getElementById('restartOption');
    restartOption.addEventListener('click', function() {
        showBootScreen();
        setTimeout(function() {
            window.location.reload();
        }, 2000);
    });
}

// Close System Panels except for the specified ones - Fixed function
function closeSystemPanels(exceptions = []) {
    const panels = [
        { id: 'startMenu', button: 'startButton' },
        { id: 'notificationsCenter', button: 'actionCenterButton' },
        { id: 'wifiPanel', button: 'wifiButton' },
        { id: 'volumePanel', button: 'volumeButton' },
        { id: 'powerPanel', button: null }
    ];
    
    panels.forEach(panel => {
        if (!exceptions.includes(panel.id)) {
            const panelElement = document.getElementById(panel.id);
            if (panelElement) {
                console.log(`Closing panel: ${panel.id}`);
                panelElement.classList.remove('active');
            }
            
            if (panel.button) {
                const buttonElement = document.getElementById(panel.button);
                if (buttonElement) buttonElement.classList.remove('active');
            }
        }
    });
}

// Window Management Functions
function setupWindows() {
    const windows = document.querySelectorAll('.window');
    
    windows.forEach(win => {
        // Window dragging
        const titlebar = win.querySelector('.window-titlebar');
        let isDragging = false;
        let offsetX, offsetY;
        
        titlebar.addEventListener('mousedown', function(e) {
            if (e.target === titlebar || e.target === titlebar.querySelector('.window-titlebar-title')) {
                isDragging = true;
                offsetX = e.clientX - win.offsetLeft;
                offsetY = e.clientY - win.offsetTop;
            }
        });
        
        document.addEventListener('mousemove', function(e) {
            if (isDragging && !win.classList.contains('maximized')) {
                win.style.left = (e.clientX - offsetX) + 'px';
                win.style.top = (e.clientY - offsetY) + 'px';
            }
        });
        
        document.addEventListener('mouseup', function() {
            isDragging = false;
        });
        
        // Window controls
        const minimizeButton = win.querySelector('.window-minimize');
        const maximizeButton = win.querySelector('.window-maximize');
        const closeButton = win.querySelector('.window-close');
        
        minimizeButton.addEventListener('click', function() {
            minimizeWindow(win.getAttribute('data-name'));
        });
        
        maximizeButton.addEventListener('click', function() {
            toggleMaximize(win);
        });
        
        closeButton.addEventListener('click', function() {
            closeWindow(win.getAttribute('data-name'));
        });
        
        // Window activation
        win.addEventListener('mousedown', function() {
            activateWindow(this);
        });
    });
    
    // Initial window positioning
    positionWindowsInitially();
}

function positionWindowsInitially() {
    const desktop = document.querySelector('.desktop');
    const windows = document.querySelectorAll('.window');
    const desktopWidth = desktop.clientWidth;
    const desktopHeight = desktop.clientHeight;
    
    windows.forEach((win, index) => {
        // Position windows in a cascade pattern
        win.style.top = (50 + index * 30) + 'px';
        win.style.left = (50 + index * 30) + 'px';
        
        // Ensure windows are within desktop bounds
        if (parseInt(win.style.top) + 300 > desktopHeight) {
            win.style.top = (desktopHeight - 350) + 'px';
        }
        
        if (parseInt(win.style.left) + 400 > desktopWidth) {
            win.style.left = (desktopWidth - 450) + 'px';
        }
    });
}

function openWindow(windowName) {
    const win = document.getElementById(windowName + '-window');
    
    if (win) {
        // Check if minimized
        if (win.classList.contains('minimized')) {
            win.classList.remove('minimized');
            win.classList.add('visible');
        } else if (!win.classList.contains('visible')) {
            win.classList.add('visible');
        }
        
        // Update taskbar
        updateTaskbar(windowName);
        
        // Activate window
        activateWindow(win);
    }
}

function minimizeWindow(windowName) {
    const win = document.getElementById(windowName + '-window');
    
    if (win) {
        win.classList.add('minimized');
        win.classList.remove('visible');
        
        // Update taskbar (keep button active)
        const taskbarApp = document.querySelector(`.taskbar-app[data-window="${windowName}"]`);
        if (taskbarApp) {
            taskbarApp.classList.add('active');
        }
    }
}

function closeWindow(windowName) {
    const win = document.getElementById(windowName + '-window');
    
    if (win) {
        win.classList.remove('visible', 'minimized', 'maximized', 'active');
        
        // Remove from taskbar
        const taskbarApp = document.querySelector(`.taskbar-app[data-window="${windowName}"]`);
        if (taskbarApp) {
            taskbarApp.remove();
        }
    }
}

function toggleMaximize(win) {
    win.classList.toggle('maximized');
}

function activateWindow(win) {
    // Deactivate all windows
    document.querySelectorAll('.window').forEach(w => {
        w.classList.remove('active');
    });
    
    // Activate current window
    win.classList.add('active');
    
    // Update taskbar
    updateTaskbarActive(win.getAttribute('data-name'));
}

function updateTaskbar(windowName) {
    const taskbarApps = document.getElementById('taskbarApps');
    let taskbarApp = document.querySelector(`.taskbar-app[data-window="${windowName}"]`);
    
    // If app icon doesn't exist in taskbar, add it
    if (!taskbarApp) {
        taskbarApp = document.createElement('div');
        taskbarApp.className = 'taskbar-app';
        taskbarApp.setAttribute('data-window', windowName);
        
        // Get icon from desktop icon
        const desktopIcon = document.querySelector(`.desktop-icon[data-window="${windowName}"]`);
        if (desktopIcon) {
            const iconHtml = desktopIcon.querySelector('.icon-img').innerHTML;
            taskbarApp.innerHTML = iconHtml;
        }
        
        // Add click event
        taskbarApp.addEventListener('click', function() {
            const win = document.getElementById(windowName + '-window');
            
            if (win.classList.contains('minimized')) {
                win.classList.remove('minimized');
                win.classList.add('visible');
                activateWindow(win);
            } else if (win.classList.contains('active')) {
                minimizeWindow(windowName);
            } else {
                activateWindow(win);
            }
        });
        
        taskbarApps.appendChild(taskbarApp);
    }
    
    // Set taskbar app as active
    document.querySelectorAll('.taskbar-app').forEach(app => {
        app.classList.remove('active');
    });
    taskbarApp.classList.add('active');
}

function updateTaskbarActive(windowName) {
    document.querySelectorAll('.taskbar-app').forEach(app => {
        app.classList.remove('active');
    });
    
    const taskbarApp = document.querySelector(`.taskbar-app[data-window="${windowName}"]`);
    if (taskbarApp) {
        taskbarApp.classList.add('active');
    }
}

function updateClock() {
    const now = new Date();
    
    // Update taskbar time
    const taskbarTime = document.getElementById('taskbarTime');
    taskbarTime.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Update taskbar date
    const taskbarDate = document.getElementById('taskbarDate');
    taskbarDate.textContent = now.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' });
}

// User Data Functions
function loadUserData() {
    // Basic profile info
    document.getElementById('aboutName').textContent = userData.name;
    document.getElementById('aboutTitle').textContent = userData.title;
    document.getElementById('aboutLocation').textContent = userData.location;
    document.getElementById('aboutImage').src = userData.avatar;
    document.getElementById('aboutDescription').textContent = userData.about.description;
    document.getElementById('aboutEmail').textContent = userData.contact.email;
    document.getElementById('aboutPhone').textContent = userData.contact.phone;
    document.getElementById('aboutExperience').textContent = userData.experience;
    document.getElementById('cvButton').href = userData.cvLink;
    
    // Start menu data
    document.getElementById('startMenuAvatar').src = userData.avatar;
    document.getElementById('startMenuName').textContent = userData.name;
    document.getElementById('startMenuTitle').textContent = userData.title;
    
    // Social links
    loadSocialLinks();
    
    // Skills
    loadSkills();
    
    // Resume
    loadResume();
    
    // Portfolio
    loadPortfolio();
    
    // Services
    loadServices();
    
    // Contact
    loadContact();
}

function loadSocialLinks() {
    // About page social links
    const socialLinks = document.getElementById('socialLinks');
    
    userData.social.forEach(social => {
        const link = document.createElement('a');
        link.href = social.url;
        link.className = 'social-icon';
        link.target = '_blank';
        link.innerHTML = `<i class="${social.icon}"></i>`;
        socialLinks.appendChild(link);
    });
    
    // Start menu social links
    const startMenuSocial = document.getElementById('startMenuSocial');
    
    userData.social.forEach(social => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <div class="menu-icon"><i class="${social.icon}"></i></div>
            <div class="menu-text">${social.platform}</div>
        `;
        menuItem.addEventListener('click', function() {
            window.open(social.url, '_blank');
        });
        startMenuSocial.appendChild(menuItem);
    });
}

function loadSkills() {
    const skillsGrid = document.getElementById('skillsGrid');
    
    userData.skills.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        skillCard.innerHTML = `
            <div class="skill-icon"><i class="${skill.icon}"></i></div>
            <div class="skill-name">${skill.name}</div>
            <div class="skill-desc">${skill.description}</div>
        `;
        skillsGrid.appendChild(skillCard);
    });
}

function loadResume() {
    // Experience timeline
    const experienceTimeline = document.getElementById('experienceTimeline');
    
    userData.experience_list.forEach(exp => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="timeline-header">
                <div class="timeline-date">${exp.years}</div>
                <h4 class="timeline-title">${exp.position}</h4>
                <div class="timeline-subtitle">${exp.company}</div>
            </div>
            <div class="timeline-content">
                <p>${exp.description}</p>
            </div>
        `;
        experienceTimeline.appendChild(timelineItem);
    });
    
    // Education timeline
    const educationTimeline = document.getElementById('educationTimeline');
    
    userData.education.forEach(edu => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="timeline-header">
                <div class="timeline-date">${edu.years}</div>
                <h4 class="timeline-title">${edu.degree}</h4>
                <div class="timeline-subtitle">${edu.institution}</div>
            </div>
            <div class="timeline-content">
                <p>${edu.description}</p>
            </div>
        `;
        educationTimeline.appendChild(timelineItem);
    });
}

function loadPortfolio() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    
    userData.portfolio.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-body">
                <h3 class="project-title">${project.title}</h3>
                <span class="project-category">${project.category}</span>
                <p class="project-description">${project.description}</p>
                <a href="${project.link}" target="_blank" class="project-link">View Project <i class="fas fa-external-link-alt"></i></a>
            </div>
        `;
        portfolioGrid.appendChild(projectCard);
    });
}

function loadServices() {
    const servicesGrid = document.getElementById('servicesGrid');
    
    userData.services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        serviceCard.innerHTML = `
            <div class="service-icon"><i class="${service.icon}"></i></div>
            <h3 class="service-title">${service.title}</h3>
            <p class="service-description">${service.description}</p>
        `;
        servicesGrid.appendChild(serviceCard);
    });
}

function loadContact() {
    document.getElementById('contactDescription').textContent = userData.contact.description;
    document.getElementById('contactEmail').textContent = userData.contact.email;
    document.getElementById('contactPhone').textContent = userData.contact.phone;
    document.getElementById('contactLocation').textContent = userData.location;
}
