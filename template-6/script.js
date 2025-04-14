document.addEventListener('DOMContentLoaded', function() {
    // Loading and Login screens
    showLoadingScreen();
    
    // Loading timeout to simulate boot process
    setTimeout(() => {
        hideLoadingScreen();
        showLoginScreen();
        setupLoginScreen();
    }, 3000);
    
    // Initialize user data in login screen
    function setupLoginScreen() {
        document.getElementById('loginAvatar').src = userData.avatar;
        document.getElementById('loginName').textContent = userData.name;
    }
    
    // Terminal commands
    const terminalForm = document.getElementById('terminalForm');
    if (terminalForm) {
        terminalForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const command = document.getElementById('terminalCommand').value;
            executeCommand(command);
            document.getElementById('terminalCommand').value = '';
        });
    }
    
    // Initialize Windows
    initializeWindows();
    
    // Fix for WiFi icon toggle
    const wifiToggle = document.getElementById('wifiToggle');
    const networkIndicator = document.getElementById('networkIndicator');
    
    if (wifiToggle && networkIndicator) {
        // Initial state setup
        const icon = networkIndicator.querySelector('i') || document.createElement('i');
        icon.className = wifiToggle.checked ? 'fas fa-wifi' : 'fas fa-wifi-slash';
        
        if (!networkIndicator.contains(icon)) {
            networkIndicator.appendChild(icon);
        }
        
        wifiToggle.addEventListener('change', function() {
            const icon = networkIndicator.querySelector('i');
            if (icon) {
                icon.className = this.checked ? 'fas fa-wifi' : 'fas fa-wifi-slash';
            }
        });
    }
    
    // Fix for volume slider and indicator
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeIndicator = document.getElementById('volumeIndicator');
    
    if (volumeSlider && volumeIndicator) {
        // Set initial value
        volumeSlider.value = 75;
        
        volumeSlider.addEventListener('input', function() {
            const value = this.value;
            
            // Update icon based on volume
            const icon = volumeIndicator.querySelector('i');
            if (icon) {
                if (value == 0) {
                    icon.className = 'fas fa-volume-mute';
                } else if (value < 50) {
                    icon.className = 'fas fa-volume-down';
                } else {
                    icon.className = 'fas fa-volume-up';
                }
            }
        });
    }
    
    // Fix for brightness slider
    const brightnessSlider = document.getElementById('brightnessSlider');
    if (brightnessSlider) {
        // Set initial value
        brightnessSlider.value = 80;
        
        brightnessSlider.addEventListener('input', function() {
            // Optional: implement screen brightness adjustment
            // This example just shows the slider working
            const brightness = this.value;
            document.documentElement.style.filter = `brightness(${brightness/100 * 0.5 + 0.5})`;
        });
    }
});

// Loading Screen Functions
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.style.display = 'flex';
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Login Screen Functions
function showLoginScreen() {
    const loginScreen = document.getElementById('loginScreen');
    if (loginScreen) {
        loginScreen.style.display = 'flex';
    }
}

function hideLoginScreen() {
    const loginScreen = document.getElementById('loginScreen');
    if (loginScreen) {
        loginScreen.classList.add('hidden');
        setTimeout(() => {
            loginScreen.style.display = 'none';
            showDesktop();
        }, 500);
    }
}

function showDesktop() {
    const desktop = document.getElementById('desktop');
    if (desktop) {
        desktop.classList.add('active');
        loadUserData();
    }
}

// Login Form Handler
document.getElementById('loginButton').addEventListener('click', function() {
    const passwordField = document.getElementById('passwordField');
    if (passwordField.value.trim() !== '') {
        hideLoginScreen();
    } else {
        passwordField.classList.add('error');
        setTimeout(() => {
            passwordField.classList.remove('error');
        }, 500);
    }
});

// Password field enter key handler
document.getElementById('passwordField').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('loginButton').click();
    }
});

// Restart and Shutdown buttons
document.getElementById('restartButton').addEventListener('click', function() {
    showLoadingScreen();
    setTimeout(() => {
        location.reload();
    }, 2000);
});

document.getElementById('shutdownButton').addEventListener('click', function() {
    showLoadingScreen();
    setTimeout(() => {
        window.location.href = '../../index.html';
    }, 2000);
});

// System menu options
document.getElementById('logoutButton').addEventListener('click', function() {
    showLoginScreen();
    document.getElementById('desktop').classList.remove('active');
    systemControls.classList.remove('active');
});

document.getElementById('restartMenuButton').addEventListener('click', function() {
    showLoadingScreen();
    setTimeout(() => {
        location.reload();
    }, 2000);
    systemControls.classList.remove('active');
});

document.getElementById('shutdownMenuButton').addEventListener('click', function() {
    showLoadingScreen();
    setTimeout(() => {
        window.location.href = '../../index.html';
    }, 2000);
    systemControls.classList.remove('active');
});

// Load user data into UI
function loadUserData() {
    // Terminal data
    document.getElementById('terminal-skills').innerHTML = userData.terminalSkills;
    document.getElementById('terminalName').textContent = userData.name.toLowerCase();
    
    // About window data
    document.getElementById('aboutName').textContent = userData.name;
    document.getElementById('aboutTitle').textContent = userData.title;
    document.getElementById('aboutLocation').textContent = userData.location;
    document.getElementById('aboutDescription').textContent = userData.about?.description || userData.intro;
    document.getElementById('aboutImage').src = userData.avatar;
    document.getElementById('aboutEmail').textContent = userData.contact.email;
    document.getElementById('aboutPhone').textContent = userData.contact.phone;
    document.getElementById('aboutExperience').textContent = userData.experience;
    document.getElementById('aboutFullName').textContent = userData.name;
    document.getElementById('cvButton').href = userData.cvLink;
    
    // System controls
    document.getElementById('systemUserName').textContent = userData.name;
    document.getElementById('systemUserEmail').textContent = userData.contact.email;
    
    // Contact information
    document.getElementById('contactDescription').textContent = userData.contact.description;
    document.getElementById('contactEmail').textContent = userData.contact.email;
    document.getElementById('contactPhone').textContent = userData.contact.phone;
    document.getElementById('contactLocation').textContent = userData.location;
    
    // Load other sections
    loadSocialLinks();
    loadSkills();
    loadResume();
    loadProjects();
    loadServices();
}

// Load social links
function loadSocialLinks() {
    const socialLinks = document.getElementById('socialLinks');
    
    if (socialLinks && userData.social) {
        socialLinks.innerHTML = '';
        
        userData.social.forEach(social => {
            const socialItem = document.createElement('div');
            socialItem.className = 'social-item';
            
            socialItem.innerHTML = `
                <div class="social-icon">
                    <i class="${social.icon}"></i>
                </div>
                <div>${social.platform}</div>
            `;
            
            socialItem.addEventListener('click', function() {
                window.open(social.url, '_blank');
            });
            
            socialLinks.appendChild(socialItem);
        });
    }
}

// Load skills
function loadSkills() {
    const skillsGrid = document.getElementById('skillsGrid');
    
    if (skillsGrid && userData.skills) {
        skillsGrid.innerHTML = '';
        
        userData.skills.forEach(skill => {
            const skillCard = document.createElement('div');
            skillCard.className = 'skill-card';
            
            skillCard.innerHTML = `
                <div class="skill-icon">
                    <i class="${skill.icon}"></i>
                </div>
                <div class="skill-name">${skill.name}</div>
                <div class="skill-desc">${skill.description}</div>
            `;
            
            skillsGrid.appendChild(skillCard);
        });
    }
    
    // Set up skill search
    const skillSearch = document.getElementById('skillSearch');
    if (skillSearch) {
        skillSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            document.querySelectorAll('#skillsGrid .skill-card').forEach(card => {
                const name = card.querySelector('.skill-name').textContent.toLowerCase();
                const desc = card.querySelector('.skill-desc').textContent.toLowerCase();
                
                if (name.includes(searchTerm) || desc.includes(searchTerm)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Load resume (experience and education)
function loadResume() {
    // Experience
    const experienceTimeline = document.getElementById('experienceTimeline');
    
    if (experienceTimeline && userData.experience_list) {
        experienceTimeline.innerHTML = '';
        
        userData.experience_list.forEach(exp => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            
            timelineItem.innerHTML = `
                <h3>${exp.position}</h3>
                <h4>${exp.company}</h4>
                <div class="timeline-year">${exp.years}</div>
                <p>${exp.description}</p>
            `;
            
            experienceTimeline.appendChild(timelineItem);
        });
    }
    
    // Education
    const educationTimeline = document.getElementById('educationTimeline');
    
    if (educationTimeline && userData.education) {
        educationTimeline.innerHTML = '';
        
        userData.education.forEach(edu => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            
            timelineItem.innerHTML = `
                <h3>${edu.degree}</h3>
                <h4>${edu.institution}</h4>
                <div class="timeline-year">${edu.years}</div>
                <p>${edu.description}</p>
            `;
            
            educationTimeline.appendChild(timelineItem);
        });
    }
}

// Load projects
function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    const projectFilters = document.getElementById('projectFilters');
    
    if (projectsGrid && userData.projects) {
        projectsGrid.innerHTML = '';
        
        // Create project cards
        userData.projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.setAttribute('data-category', project.category.toLowerCase().replace(/\s+/g, '-'));
            
            projectCard.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-details">
                    <div class="project-title">${project.title}</div>
                    <div class="project-category">${project.category}</div>
                    <div class="project-description">${project.description}</div>
                    <div class="project-technologies"><strong>Tech:</strong> ${project.technologies}</div>
                    <div class="project-actions">
                        <a href="${project.link}" class="ubuntu-button" target="_blank">View Project</a>
                    </div>
                </div>
            `;
            
            projectsGrid.appendChild(projectCard);
        });
        
        // Create category filters
        if (projectFilters) {
            // Get unique categories
            const categories = ['All'];
            userData.projects.forEach(project => {
                if (!categories.includes(project.category)) {
                    categories.push(project.category);
                }
            });
            
            // Add "All" filter
            projectFilters.innerHTML = '<div class="filter-chip active" data-filter="all">All</div>';
            
            // Add category filters
            categories.slice(1).forEach(category => {
                const chip = document.createElement('div');
                chip.className = 'filter-chip';
                chip.setAttribute('data-filter', category.toLowerCase().replace(/\s+/g, '-'));
                chip.textContent = category;
                
                projectFilters.appendChild(chip);
            });
            
            // Add filter functionality
            document.querySelectorAll('.filter-chip').forEach(chip => {
                chip.addEventListener('click', function() {
                    const filter = this.getAttribute('data-filter');
                    
                    // Update active state
                    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Filter projects
                    if (filter === 'all') {
                        document.querySelectorAll('.project-card').forEach(card => {
                            card.style.display = '';
                        });
                    } else {
                        document.querySelectorAll('.project-card').forEach(card => {
                            if (card.getAttribute('data-category') === filter) {
                                card.style.display = '';
                            } else {
                                card.style.display = 'none';
                            }
                        });
                    }
                });
            });
        }
        
        // Set up project search
        const projectSearch = document.getElementById('projectSearch');
        if (projectSearch) {
            projectSearch.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                
                document.querySelectorAll('.project-card').forEach(card => {
                    const title = card.querySelector('.project-title').textContent.toLowerCase();
                    const category = card.querySelector('.project-category').textContent.toLowerCase();
                    const description = card.querySelector('.project-description').textContent.toLowerCase();
                    
                    if (title.includes(searchTerm) || category.includes(searchTerm) || description.includes(searchTerm)) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                // Reset filter chips
                document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
                document.querySelector('.filter-chip[data-filter="all"]').classList.add('active');
            });
        }
        
        // Set up view toggle
        document.querySelectorAll('.view-option').forEach(option => {
            option.addEventListener('click', function() {
                const viewType = this.getAttribute('data-view');
                
                // Update active state
                document.querySelectorAll('.view-option').forEach(o => o.classList.remove('active'));
                this.classList.add('active');
                
                // Apply view type
                if (viewType === 'list') {
                    projectsGrid.classList.add('list-view');
                } else {
                    projectsGrid.classList.remove('list-view');
                }
            });
        });
    }
}

// Load services
function loadServices() {
    const servicesGrid = document.getElementById('servicesGrid');
    
    if (servicesGrid && userData.services) {
        servicesGrid.innerHTML = '';
        
        userData.services.forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card';
            
            serviceCard.innerHTML = `
                <div class="service-icon">
                    <i class="${service.icon}"></i>
                </div>
                <div class="service-title">${service.title}</div>
                <div class="service-description">${service.description}</div>
                <button class="ubuntu-button">Learn More</button>
            `;
            
            servicesGrid.appendChild(serviceCard);
        });
    }
    
    // Set up service search
    const serviceSearch = document.getElementById('serviceSearch');
    if (serviceSearch) {
        serviceSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            document.querySelectorAll('.service-card').forEach(card => {
                const title = card.querySelector('.service-title').textContent.toLowerCase();
                const description = card.querySelector('.service-description').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Set up service categories
    document.querySelectorAll('.software-categories .category').forEach(category => {
        category.addEventListener('click', function() {
            document.querySelectorAll('.category').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // You could add category filtering here if services have categories
        });
    });
}

// Handle terminal commands
function executeCommand(command) {
    const terminal = document.querySelector('.terminal-output');
    
    // Add the command to the terminal output
    const promptLine = document.createElement('div');
    promptLine.className = 'terminal-line terminal-prompt';
    promptLine.innerHTML = `
        <span class="user-host">user@ubuntu</span>:<span class="directory">~</span>$
        <span class="command">${command}</span>
    `;
    terminal.appendChild(promptLine);
    
    // Process the command and generate output
    let output;
    switch(command.toLowerCase()) {
        case 'help':
            output = `
                <div class="terminal-line">Available commands:</div>
                <div class="terminal-line">whoami - Display your name</div>
                <div class="terminal-line">ls - List files</div>
                <div class="terminal-line">cat skills.txt - Show skills</div>
                <div class="terminal-line">cat projects.txt - Show projects</div>
                <div class="terminal-line">contact - Show contact info</div>
                <div class="terminal-line">clear - Clear terminal</div>
                <div class="terminal-line">help - Show this help message</div>
            `;
            break;
        case 'whoami':
            output = `<div class="terminal-line">${userData.name.toLowerCase()}</div>`;
            break;
        case 'ls':
            output = `
                <div class="terminal-line">total 40</div>
                <div class="terminal-line">drwxr-xr-x 2 user user 4096 Feb 10 12:34 .</div>
                <div class="terminal-line">drwxr-xr-x 4 user user 4096 Feb 10 12:34 ..</div>
                <div class="terminal-line">-rw-r--r-- 1 user user 220 Feb 10 12:34 .bash_logout</div>
                <div class="terminal-line">-rw-r--r-- 1 user user 3771 Feb 10 12:34 .bashrc</div>
                <div class="terminal-line">drwx------ 2 user user 4096 Feb 10 12:34 .cache</div>
                <div class="terminal-line">drwxr-xr-x 3 user user 4096 Feb 10 12:34 Documents</div>
                <div class="terminal-line">drwxr-xr-x 2 user user 4096 Feb 10 12:34 Downloads</div>
                <div class="terminal-line">drwxr-xr-x 2 user user 4096 Feb 10 12:34 Pictures</div>
                <div class="terminal-line">drwxr-xr-x 2 user user 4096 Feb 10 12:34 Projects</div>
                <div class="terminal-line">-rw-r--r-- 1 user user 6258 Feb 10 12:34 skills.txt</div>
                <div class="terminal-line">-rw-r--r-- 1 user user 4815 Feb 10 12:34 projects.txt</div>
            `;
            break;
        case 'cat skills.txt':
            output = `<div class="terminal-line">${userData.terminalSkills}</div>`;
            break;
        case 'cat projects.txt':
            let projectsList = '<div class="terminal-line">My Projects:</div>';
            userData.projects.forEach(project => {
                projectsList += `<div class="terminal-line">• ${project.title} - ${project.description}</div>`;
            });
            output = projectsList;
            break;
        case 'contact':
            output = `
                <div class="terminal-line">Contact Information:</div>
                <div class="terminal-line">• Email: ${userData.contact.email}</div>
                <div class="terminal-line">• Phone: ${userData.contact.phone}</div>
                <div class="terminal-line">• Location: ${userData.location}</div>
            `;
            break;
        case 'clear':
            terminal.innerHTML = '';
            return;
        default:
            output = `<div class="terminal-line">Command not found: ${command}</div>`;
    }
    
    terminal.innerHTML += output;
    
    // Add a new prompt line
    const newPrompt = document.createElement('div');
    newPrompt.className = 'terminal-line terminal-prompt';
    newPrompt.innerHTML = `
        <span class="user-host">user@ubuntu</span>:<span class="directory">~</span>$
        <span class="cursor"></span>
    `;
    terminal.appendChild(newPrompt);
    
    // Scroll to bottom of terminal
    terminal.scrollTop = terminal.scrollHeight;
}

// Initialize windows functionality
function initializeWindows() {
    // Top panel clock update
    updateClock();
    setInterval(updateClock, 1000);
    
    // Activities button
    document.getElementById('activitiesButton').addEventListener('click', function() {
        toggleActivitiesView();
    });
    
    // Set up activities search
    const activitiesSearch = document.getElementById('activitiesSearch');
    if (activitiesSearch) {
        activitiesSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            document.querySelectorAll('.app-item').forEach(app => {
                const name = app.querySelector('.app-name').textContent.toLowerCase();
                
                if (name.includes(searchTerm)) {
                    app.style.display = '';
                } else {
                    app.style.display = 'none';
                }
            });
        });
    }
    
    // App grid in activities view
    document.querySelectorAll('.app-item').forEach(app => {
        app.addEventListener('click', function() {
            const windowName = this.getAttribute('data-window');
            toggleActivitiesView();
            openWindow(windowName);
        });
    });
    
    // Set up dock icons
    document.querySelectorAll('.dock-icon[data-window]').forEach(icon => {
        icon.addEventListener('click', function() {
            const windowName = this.getAttribute('data-window');
            toggleWindow(windowName);
        });
    });
    
    // Window controls
    setupWindowControls();
    
    // Context menu
    setupContextMenu();
    
    // Set up system controls
    setupSystemControls();
    
    // Tab systems
    setupTabs();
    
    // Contact form
    setupContactForm();
    
    // Settings functionality
    setupSettings();
}

// Update clock display
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateString = now.toLocaleDateString([], { month: 'short', day: 'numeric' });
    
    document.querySelector('.time').textContent = timeString;
    document.querySelector('.date').textContent = dateString;
}

// Toggle activities view
function toggleActivitiesView() {
    const activitiesOverview = document.getElementById('activitiesOverview');
    activitiesOverview.classList.toggle('active');
    
    if (activitiesOverview.classList.contains('active')) {
        document.getElementById('activitiesSearch').focus();
        // Create workspace preview
        takeDesktopScreenshot();
    }
}

// Take a "screenshot" of desktop for workspace preview
function takeDesktopScreenshot() {
    // This is a simplified version - it would actually require complex DOM-to-canvas conversion
    // In this case, we just display a placeholder
    document.getElementById('workspaceThumbnail').style.backgroundImage = 'url("assets/workspace.jpg")';
}

// Set up window controls
function setupWindowControls() {
    // Get all windows
    const windows = document.querySelectorAll('.ubuntu-window');
    
    windows.forEach(window => {
        // Get window name
        const windowName = window.getAttribute('data-name');
        
        // Window controls
        const closeBtn = window.querySelector('.control.close');
        const minimizeBtn = window.querySelector('.control.minimize');
        const maximizeBtn = window.querySelector('.control.maximize');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeWindow(windowName));
        }
        
        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', () => minimizeWindow(windowName));
        }
        
        if (maximizeBtn) {
            maximizeBtn.addEventListener('click', () => toggleMaximize(windowName));
        }
        
        // Make window draggable
        makeWindowDraggable(window);
        
        // Make window focused on click
        window.addEventListener('mousedown', () => focusWindow(window));
    });
}

// Open a window - Fix window positioning
function openWindow(windowName) {
    const window = document.getElementById(`${windowName}-window`);
    
    if (window) {
        // Reset any previously set positions
        if (!window.dataset.positioned) {
            // Only set the position if it hasn't been dragged yet
            window.removeAttribute('style'); // Clear any inline styles
            
            // Set initial size based on window type
            switch(windowName) {
                case 'terminal':
                    window.style.width = '800px';
                    window.style.height = '500px';
                    break;
                case 'contact':
                    window.style.width = '900px';
                    window.style.height = '600px';
                    break;
                case 'about':
                    window.style.width = '800px';
                    window.style.height = '580px';
                    break;
                default:
                    window.style.width = '800px';
                    window.style.height = '600px';
            }
            
            window.dataset.positioned = 'true';
        }
        
        // Show the window
        window.classList.add('visible');
        window.classList.remove('minimized');
        
        // Update app title in top panel
        document.getElementById('currentAppTitle').textContent = window.querySelector('.window-title').textContent;
        
        // Focus the window
        focusWindow(window);
        
        // Mark dock icon as active
        const dockIcon = document.querySelector(`.dock-icon[data-window="${windowName}"]`);
        if (dockIcon) {
            dockIcon.classList.add('active');
            dockIcon.classList.add('running');
        }
    }
}

// Close a window
function closeWindow(windowName) {
    const window = document.getElementById(`${windowName}-window`);
    
    if (window) {
        // Hide the window
        window.classList.remove('visible');
        window.classList.remove('maximized');
        
        // Reset app title in top panel
        document.getElementById('currentAppTitle').textContent = 'Ubuntu Desktop';
        
        // Mark dock icon as inactive
        const dockIcon = document.querySelector(`.dock-icon[data-window="${windowName}"]`);
        if (dockIcon) {
            dockIcon.classList.remove('active');
            dockIcon.classList.remove('running');
        }
    }
}

// Minimize a window
function minimizeWindow(windowName) {
    const window = document.getElementById(`${windowName}-window`);
    
    if (window) {
        // Minimize the window
        window.classList.add('minimized');
        window.classList.remove('visible');
        
        // Reset app title in top panel
        document.getElementById('currentAppTitle').textContent = 'Ubuntu Desktop';
        
        // Keep dock icon as running but not active
        const dockIcon = document.querySelector(`.dock-icon[data-window="${windowName}"]`);
        if (dockIcon) {
            dockIcon.classList.remove('active');
            dockIcon.classList.add('running');
        }
    }
}

// Toggle maximize state
function toggleMaximize(windowName) {
    const window = document.getElementById(`${windowName}-window`);
    
    if (window) {
        window.classList.toggle('maximized');
    }
}

// Toggle window state (open, focus or minimize)
function toggleWindow(windowName) {
    const window = document.getElementById(`${windowName}-window`);
    
    if (window) {
        if (window.classList.contains('minimized')) {
            // Restore from minimized
            window.classList.remove('minimized');
            window.classList.add('visible');
            focusWindow(window);
        } else if (window.classList.contains('visible')) {
            // Check if it's the active window
            const isActive = document.querySelectorAll('.ubuntu-window').length === 1 || 
                             window.style.zIndex === getHighestZIndex().toString();
            
            if (isActive) {
                // Minimize it
                minimizeWindow(windowName);
            } else {
                // Focus it
                focusWindow(window);
            }
        } else {
            // Open it
            openWindow(windowName);
        }
    }
}

// Focus a window (bring to front)
function focusWindow(window) {
    // Get highest z-index
    const highestZ = getHighestZIndex();
    
    // Set this window's z-index higher
    window.style.zIndex = highestZ + 1;
    
    // Update app title in top panel
    document.getElementById('currentAppTitle').textContent = window.querySelector('.window-title').textContent;
    
    // Mark dock icon as active
    const windowName = window.getAttribute('data-name');
    const dockIcon = document.querySelector(`.dock-icon[data-window="${windowName}"]`);
    
    if (dockIcon) {
        // Remove active class from all dock icons
        document.querySelectorAll('.dock-icon').forEach(icon => {
            icon.classList.remove('active');
        });
        
        // Add active class to this dock icon
        dockIcon.classList.add('active');
    }
}

// Get highest z-index among windows
function getHighestZIndex() {
    let highestZ = 100; // Base z-index for windows
    document.querySelectorAll('.ubuntu-window.visible').forEach(win => {
        const zIndex = parseInt(win.style.zIndex || '100');
        if (zIndex > highestZ) {
            highestZ = zIndex;
        }
    });
    return highestZ;
}

// Make window draggable - Fix for window positioning
function makeWindowDraggable(window) {
    const header = window.querySelector('.window-header');
    let isDragging = false;
    let offsetX, offsetY;
    
    if (header) {
        header.addEventListener('mousedown', function(e) {
            // Don't start dragging if clicking on a button
            if (e.target.closest('.control')) return;
            
            // Start dragging
            isDragging = true;
            
            // Calculate offset based on the actual position, accounting for transform
            const rect = window.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            
            // Focus the window
            focusWindow(window);
            
            // Prevent text selection while dragging
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                // Don't drag if window is maximized
                if (window.classList.contains('maximized')) return;
                
                // When dragging begins, remove the centering transform
                window.style.transform = 'scale(1)';
                
                // Calculate new position
                const newLeft = e.clientX - offsetX;
                const newTop = e.clientY - offsetY;
                
                // Apply new position
                window.style.left = Math.max(0, newLeft) + 'px';
                window.style.top = Math.max(28, newTop) + 'px';
            }
        });
        
        document.addEventListener('mouseup', function() {
            isDragging = false;
        });
    }
}

// Set up context menu
function setupContextMenu() {
    const contextMenu = document.getElementById('contextMenu');
    const desktop = document.getElementById('desktop');
    
    if (contextMenu && desktop) {
        desktop.addEventListener('contextmenu', function(e) {
            // Prevent default context menu
            e.preventDefault();
            
            // Position the context menu
            contextMenu.style.left = `${e.clientX}px`;
            contextMenu.style.top = `${e.clientY}px`;
            
            // Show the menu
            contextMenu.classList.add('active');
        });
        
        // Close menu on click elsewhere
        document.addEventListener('click', function() {
            contextMenu.classList.remove('active');
        });
        
        // Handle context menu actions
        document.querySelectorAll('.context-menu .menu-item').forEach(item => {
            item.addEventListener('click', function() {
                const action = this.getAttribute('data-action');
                
                switch (action) {
                    case 'new-folder':
                        // Placeholder for creating a new folder
                        break;
                    case 'new-document':
                        // Placeholder for creating a new document
                        break;
                    case 'change-background':
                        openWindow('settings');
                        activateSettingsPane('appearance');
                        break;
                    case 'open-settings':
                        openWindow('settings');
                        break;
                }
                
                // Close the menu
                contextMenu.classList.remove('active');
            });
        });
    }
}

// Set up system controls
function setupSystemControls() {
    const sessionIndicator = document.getElementById('sessionIndicator');
    const systemControls = document.getElementById('systemControls');
    
    if (sessionIndicator && systemControls) {
        // Toggle system controls on click
        sessionIndicator.addEventListener('click', function() {
            systemControls.classList.toggle('active');
        });
        
        // Close system controls when clicking outside
        document.addEventListener('click', function(e) {
            if (!sessionIndicator.contains(e.target) && !systemControls.contains(e.target)) {
                systemControls.classList.remove('active');
            }
        });
        
        // Volume slider
        const volumeSlider = document.getElementById('volumeSlider');
        const volumeIndicator = document.getElementById('volumeIndicator');
        
        if (volumeSlider && volumeIndicator) {
            volumeSlider.addEventListener('input', function() {
                const value = this.value;
                
                // Update icon based on volume
                const icon = volumeIndicator.querySelector('i');
                if (value == 0) {
                    icon.className = 'fas fa-volume-mute';
                } else if (value < 50) {
                    icon.className = 'fas fa-volume-down';
                } else {
                    icon.className = 'fas fa-volume-up';
                }
            });
        }
        
        // Wi-Fi toggle
        const wifiToggle = document.getElementById('wifiToggle');
        const networkIndicator = document.getElementById('networkIndicator');
        
        if (wifiToggle && networkIndicator) {
            wifiToggle.addEventListener('change', function() {
                const icon = networkIndicator.querySelector('i');
                
                if (this.checked) {
                    icon.className = 'fas fa-wifi';
                } else {
                    icon.className = 'fas fa-wifi-slash';
                }
            });
        }
    }
}

// Set up tabs
function setupTabs() {
    // About window tabs
    const aboutTabs = document.querySelectorAll('.about-tabs .tab');
    aboutTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Update active tab
            aboutTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${tabName}-tab`).classList.add('active');
        });
    });
    
    // Resume tabs
    const resumeTabs = document.querySelectorAll('.resume-tab');
    resumeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Update active tab
            resumeTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            document.querySelectorAll('.resume-tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${tabName}-tab`).classList.add('active');
        });
    });
    
    // Settings tabs
    const settingsNavItems = document.querySelectorAll('.settings-nav-item');
    settingsNavItems.forEach(item => {
        item.addEventListener('click', function() {
            const settingsName = this.getAttribute('data-settings');
            activateSettingsPane(settingsName);
        });
    });
}

// Activate settings pane
function activateSettingsPane(settingsName) {
    // Update active nav item
    document.querySelectorAll('.settings-nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`.settings-nav-item[data-settings="${settingsName}"]`).classList.add('active');
    
    // Show corresponding content
    document.querySelectorAll('.settings-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    document.getElementById(`${settingsName}-pane`).classList.add('active');
}

// Set up contact form
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show a simple success notification
            const formContent = this.innerHTML;
            this.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <div style="font-size: 48px; color: var(--accent-color); margin-bottom: 20px;">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h2>Message Sent!</h2>
                    <p>Thank you for your message. I will get back to you soon.</p>
                </div>
            `;
            
            // Reset form after 3 seconds
            setTimeout(() => {
                contactForm.innerHTML = formContent;
                contactForm.reset();
            }, 3000);
        });
    }
}

// Set up settings
function setupSettings() {
    // Theme options
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            
            // Update active option
            themeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Apply theme
            document.body.className = theme === 'dark' ? 'dark-theme' : '';
            
            // Save preference
            localStorage.setItem('ubuntu-theme', theme);
        });
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('ubuntu-theme');
    if (savedTheme) {
        document.body.className = savedTheme === 'dark' ? 'dark-theme' : '';
        
        // Update active option
        themeOptions.forEach(opt => opt.classList.remove('active'));
        document.querySelector(`.theme-option[data-theme="${savedTheme}"]`).classList.add('active');
    }
    
    // Accent color options
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            
            // Update active option
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Apply accent color
            document.body.setAttribute('data-accent', color);
            
            // Save preference
            localStorage.setItem('ubuntu-accent', color);
        });
    });
    
    // Load saved accent color
    const savedAccent = localStorage.getItem('ubuntu-accent');
    if (savedAccent) {
        document.body.setAttribute('data-accent', savedAccent);
        
        // Update active option
        colorOptions.forEach(opt => opt.classList.remove('active'));
        document.querySelector(`.color-option[data-color="${savedAccent}"]`).classList.add('active');
    }
    
    // Wallpaper options
    const wallpaperOptions = document.querySelectorAll('.wallpaper-option');
    wallpaperOptions.forEach(option => {
        option.addEventListener('click', function() {
            const wallpaper = this.getAttribute('data-wallpaper');
            
            // Update active option
            wallpaperOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Apply wallpaper
            document.querySelector('.ubuntu-desktop').style.backgroundImage = `url('assets/${wallpaper}.jpg')`;
            
            // Save preference
            localStorage.setItem('ubuntu-wallpaper', wallpaper);
        });
    });
    
    // Load saved wallpaper
    const savedWallpaper = localStorage.getItem('ubuntu-wallpaper');
    if (savedWallpaper) {
        document.querySelector('.ubuntu-desktop').style.backgroundImage = `url('assets/${savedWallpaper}.jpg')`;
        
        // Update active option
        wallpaperOptions.forEach(opt => opt.classList.remove('active'));
        document.querySelector(`.wallpaper-option[data-wallpaper="${savedWallpaper}"]`).classList.add('active');
    }
}
