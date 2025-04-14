// Main script for Windows 7 themed portfolio

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Show boot screen
    showBootScreen();
    
    // Initialize desktop after boot animation
    setTimeout(function() {
        initializeDesktop();
    }, 3000);
});

// Show boot screen animation
function showBootScreen() {
    const bootScreen = document.getElementById('bootScreen');
    bootScreen.style.display = 'flex';
}

// Hide boot screen animation
function hideBootScreen() {
    const bootScreen = document.getElementById('bootScreen');
    bootScreen.style.opacity = '0';
    setTimeout(() => {
        bootScreen.style.display = 'none';
    }, 500);
}

// Initialize desktop and functionality
function initializeDesktop() {
    // Hide boot screen
    hideBootScreen();
    
    // Show desktop
    const desktop = document.getElementById('desktop');
    desktop.classList.add('active');
    
    // Load user data
    loadUserData();
    
    // Set up clock
    updateClock();
    setInterval(updateClock, 1000);
    
    // Set up desktop icons
    setupDesktopIcons();
    
    // Set up start menu
    setupStartMenu();
    
    // Set up windows
    setupWindows();
    
    // Set up keyboard shortcuts
    setupKeyboardShortcuts();
}

// Load all window content
function loadUserData() {
    // Populate start menu
    const pinnedPrograms = document.getElementById('pinnedPrograms');
    pinnedPrograms.innerHTML = ''; // Clear existing items
    
    userData.startMenuPrograms.forEach(program => {
        const programItem = document.createElement('div');
        programItem.className = 'start-item';
        programItem.setAttribute('data-window', program.window);
        
        // Check if icon exists or use a fallback
        const iconPath = program.icon || 'assets/default.png';
        
        // Use Font Awesome icon if specified with 'fa-' prefix
        if (program.icon && program.icon.startsWith('fa-')) {
            programItem.innerHTML = `
                <div class="start-icon">
                    <i class="fas ${program.icon}"></i>
                </div>
                <div class="start-text">${program.name}</div>
            `;
        } else {
            // Use image icon (with error handling)
            programItem.innerHTML = `
                <div class="start-icon">
                    <img src="${iconPath}" alt="${program.name}" onerror="this.onerror=null; this.src='assets/default.png';">
                </div>
                <div class="start-text">${program.name}</div>
            `;
        }
        
        programItem.addEventListener('click', () => {
            openWindow(program.window);
            toggleStartMenu();
        });
        
        pinnedPrograms.appendChild(programItem);
    });
    
    // Set user info
    document.getElementById('startMenuName').textContent = userData.name;
    document.getElementById('startMenuAvatar').src = userData.avatar;
    
    // Load window content
    loadAboutWindow();
    loadSkillsWindow();
    loadResumeWindow();
    loadProjectsWindow();
    loadServicesWindow();
    loadContactWindow();
    loadBrowserWindow();
    
    // Setup computer folders
    setupComputerFolders();
}

// Load about window content
function loadAboutWindow() {
    const aboutContainer = document.querySelector('#about-window .about-container');
    
    aboutContainer.innerHTML = `
        <div class="about-header">
            <div class="about-image">
                <img src="${userData.avatar}" alt="${userData.name}">
            </div>
            <div class="about-info">
                <h2>${userData.name}</h2>
                <h3>${userData.title}</h3>
                <p><i class="fas fa-map-marker-alt"></i> ${userData.location}</p>
                <p><i class="fas fa-envelope"></i> ${userData.contact.email}</p>
                <p><i class="fas fa-phone"></i> ${userData.contact.phone}</p>
            </div>
        </div>
        <div class="about-tabs">
            <div class="tab active" data-tab="bio">Biography</div>
            <div class="tab" data-tab="social">Social</div>
        </div>
        <div class="tab-content active" id="bio-tab">
            <p>${userData.intro}</p>
            <div class="about-actions">
                <a href="${userData.cvLink}" class="win7-button" target="_blank">
                    <span>Download CV</span>
                </a>
            </div>
        </div>
        <div class="tab-content" id="social-tab">
            <div class="social-links">
                ${userData.social.map(social => 
                    `<a href="${social.url}" class="social-link" target="_blank">
                        <i class="${social.icon}"></i>
                        <span>${social.platform}</span>
                    </a>`
                ).join('')}
            </div>
        </div>
    `;
    
    // Setup tabs
    const tabs = aboutContainer.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            const tabContents = aboutContainer.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.classList.remove('active'));
            aboutContainer.querySelector(`#${tabName}-tab`).classList.add('active');
        });
    });
}

// Load skills window content
function loadSkillsWindow() {
    const skillsView = document.querySelector('#skills-window .skills-view');
    
    skillsView.innerHTML = '';
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
                <div class="skill-progress-fill" style="width: ${skill.percentage}%"></div>
            </div>
        `;
        
        skillsView.appendChild(skillItem);
    });
    
    // Update skills count
    document.getElementById('skills-count').textContent = userData.skills.length;
    
    // Set up search functionality
    const searchInput = document.querySelector('#skills-window .search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const skillItems = skillsView.querySelectorAll('.skill-item');
            
            skillItems.forEach(item => {
                const name = item.querySelector('.skill-name').textContent.toLowerCase();
                const description = item.querySelector('.skill-description').textContent.toLowerCase();
                
                if (name.includes(searchTerm) || description.includes(searchTerm)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}

// Load resume window content
function loadResumeWindow() {
    const experienceTab = document.querySelector('#experience-tab');
    const educationTab = document.querySelector('#education-tab');
    
    // Load experience timeline
    if (experienceTab && userData.experience_list) {
        experienceTab.innerHTML = '';
        
        userData.experience_list.forEach(exp => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            
            timelineItem.innerHTML = `
                <div class="timeline-header">
                    <h3>${exp.position}</h3>
                    <h4>${exp.company}</h4>
                    <div class="timeline-date">${exp.years}</div>
                </div>
                <div class="timeline-content">
                    <p>${exp.description}</p>
                </div>
            `;
            
            experienceTab.appendChild(timelineItem);
        });
    }
    
    // Load education timeline
    if (educationTab && userData.education) {
        educationTab.innerHTML = '';
        
        userData.education.forEach(edu => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            
            timelineItem.innerHTML = `
                <div class="timeline-header">
                    <h3>${edu.degree}</h3>
                    <h4>${edu.institution}</h4>
                    <div class="timeline-date">${edu.years}</div>
                </div>
                <div class="timeline-content">
                    <p>${edu.description}</p>
                </div>
            `;
            
            educationTab.appendChild(timelineItem);
        });
    }
    
    // Setup sidebar navigation
    const sidebarItems = document.querySelectorAll('#resume-window .sidebar-item[data-tab]');
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Update active sidebar item
            sidebarItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding tab
            const tabs = document.querySelectorAll('#resume-window .resume-tab');
            tabs.forEach(tab => tab.classList.remove('active'));
            document.getElementById(`${tabName}-tab`).classList.add('active');
        });
    });
}

// Load projects window content
function loadProjectsWindow() {
    const projectsView = document.querySelector('#projects-view');
    
    projectsView.innerHTML = '';
    
    // Add projects to view
    userData.projects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        projectItem.setAttribute('data-category', project.category.toLowerCase().replace(/\s+/g, '-'));
        
        projectItem.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-details">
                <div class="project-title">${project.title}</div>
                <div class="project-category">${project.category}</div>
                <div class="project-description">${project.description}</div>
                <div class="project-tech"><strong>Technologies:</strong> ${project.technologies}</div>
                <div class="project-action">
                    <a href="${project.link}" class="win7-button" target="_blank">
                        <img src="assets/link.png" alt="Link">
                        <span>View Project</span>
                    </a>
                </div>
            </div>
        `;
        
        projectsView.appendChild(projectItem);
    });
    
    // Update projects count
    document.getElementById('projects-count').textContent = userData.projects.length;
    
    // Set up search functionality
    const searchInput = document.querySelector('#projects-window .search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const projectItems = projectsView.querySelectorAll('.project-item');
            
            projectItems.forEach(item => {
                const title = item.querySelector('.project-title').textContent.toLowerCase();
                const category = item.querySelector('.project-category').textContent.toLowerCase();
                const description = item.querySelector('.project-description').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || category.includes(searchTerm) || description.includes(searchTerm)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // Set up view controls
    const viewOptions = document.querySelectorAll('#projects-window .view-option');
    viewOptions.forEach(option => {
        option.addEventListener('click', function() {
            const viewType = this.getAttribute('data-view');
            
            // Update active button
            viewOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Apply view type
            projectsView.className = `projects-view ${viewType}-view`;
        });
    });
}

// Load services window content
function loadServicesWindow() {
    const servicesGrid = document.querySelector('#services-grid');
    
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
            <button class="win7-button">
                <span>Learn More</span>
            </button>
        `;
        
        servicesGrid.appendChild(serviceCard);
    });
}

// Load contact window content
function loadContactWindow() {
    // Set contact info
    document.getElementById('contact-email').textContent = userData.contact.email;
    document.getElementById('contact-phone').textContent = userData.contact.phone;
    document.getElementById('contact-location').textContent = userData.location;
    
    // Populate social icons
    const socialContainer = document.getElementById('contact-social');
    socialContainer.innerHTML = '';
    
    userData.social.forEach(social => {
        const socialIcon = document.createElement('a');
        socialIcon.className = 'social-icon';
        socialIcon.href = social.url;
        socialIcon.target = '_blank';
        socialIcon.innerHTML = `<i class="${social.icon}"></i>`;
        socialContainer.appendChild(socialIcon);
    });
    
    // Set up contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message (in a real application, this would send data to a server)
            const formContent = contactForm.innerHTML;
            contactForm.innerHTML = `
                <div class="success-message">
                    <img src="assets/success.png" alt="Success">
                    <h3>Message Sent!</h3>
                    <p>Thank you for your message. I'll get back to you soon.</p>
                </div>
            `;
            
            // Reset form after delay
            setTimeout(() => {
                contactForm.innerHTML = formContent;
            }, 3000);
        });
    }
}

// Add Internet Explorer window setup
function loadBrowserWindow() {
    // Check if browser window exists in HTML
    const browserWindow = document.getElementById('browser-window');
    if (!browserWindow) {
        // Create browser window if it doesn't exist
        createBrowserWindow();
    } else {
        // Initialize existing browser window
        setupBrowserFunctionality();
    }
}

// Create browser window dynamically
function createBrowserWindow() {
    const windowsContainer = document.querySelector('.windows-container');
    
    // Create browser window element
    const browserWindow = document.createElement('div');
    browserWindow.className = 'win7-window';
    browserWindow.id = 'browser-window';
    browserWindow.setAttribute('data-name', 'browser');
    
    // Set browser window content
    browserWindow.innerHTML = `
        <div class="window-titlebar">
            <div class="window-title">
                <img src="assets/ie.png" alt="Internet Explorer" class="titlebar-icon">
                Internet Explorer
            </div>
            <div class="window-controls">
                <button class="window-minimize"><span>_</span></button>
                <button class="window-maximize"><span>□</span></button>
                <button class="window-close"><span>×</span></button>
            </div>
        </div>
        <div class="window-menubar">
            <div class="menubar-item">File</div>
            <div class="menubar-item">Edit</div>
            <div class="menubar-item">View</div>
            <div class="menubar-item">Tools</div>
            <div class="menubar-item">Help</div>
        </div>
        <div class="window-content">
            <div class="browser-container">
                <div class="browser-toolbar">
                    <div class="browser-buttons">
                        <button class="browser-button" id="browser-back" title="Back">
                            <i class="fas fa-arrow-left"></i>
                        </button>
                        <button class="browser-button" id="browser-forward" title="Forward">
                            <i class="fas fa-arrow-right"></i>
                        </button>
                        <button class="browser-button" id="browser-refresh" title="Refresh">
                            <i class="fas fa-sync-alt"></i>
                        </button>
                        <button class="browser-button" id="browser-home" title="Home">
                            <i class="fas fa-home"></i>
                        </button>
                    </div>
                    <form class="browser-address-bar" id="browser-form">
                        <input type="text" class="browser-address" id="browser-address" placeholder="Enter web address">
                        <button type="submit" class="browser-go" title="Go">
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    </form>
                </div>
                <div class="browser-frame-container">
                    <iframe id="browser-frame" class="browser-frame" sandbox="allow-same-origin allow-scripts allow-popups allow-forms"></iframe>
                    <div id="browser-loading" class="browser-loading">
                        <div class="browser-spinner"></div>
                        <div>Loading...</div>
                    </div>
                    <div id="browser-home-page" class="browser-home">
                        <div class="browser-home-content">
                            <div class="browser-logo">
                                <img src="assets/ie-logo.png" alt="Internet Explorer">
                            </div>
                            <h2>Welcome to Internet Explorer</h2>
                            <div class="browser-search-container">
                                <form class="browser-search" id="browser-search-form">
                                    <input type="text" id="browser-search-input" placeholder="Search the web">
                                    <button type="submit">Search</button>
                                </form>
                            </div>
                            <div class="browser-favorites">
                                <h3>Favorite websites</h3>
                                <div class="browser-favorites-grid" id="browser-favorites">
                                    <!-- Will be populated with favorites -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="window-statusbar">
            <div class="statusbar-items" id="browser-status">Ready</div>
        </div>
    `;
    
    // Add the browser window to the container
    windowsContainer.appendChild(browserWindow);
    
    // Setup browser functionality
    setupBrowserFunctionality();
}

// Setup browser functionality
function setupBrowserFunctionality() {
    const browserFrame = document.getElementById('browser-frame');
    const browserAddress = document.getElementById('browser-address');
    const browserForm = document.getElementById('browser-form');
    const browserLoading = document.getElementById('browser-loading');
    const browserHomePage = document.getElementById('browser-home-page');
    const browserStatus = document.getElementById('browser-status');
    const browserBack = document.getElementById('browser-back');
    const browserForward = document.getElementById('browser-forward');
    const browserRefresh = document.getElementById('browser-refresh');
    const browserHome = document.getElementById('browser-home');
    const browserSearchForm = document.getElementById('browser-search-form');
    const browserSearchInput = document.getElementById('browser-search-input');
    const browserFavorites = document.getElementById('browser-favorites');
    
    // Initialize browser state
    let browserHistory = [];
    let currentHistoryIndex = -1;
    let isFrameLoaded = false;
    
    // Populate favorites
    const favorites = [
        { name: "Google", url: "https://www.google.com", icon: "assets/google.png" },
        { name: "Wikipedia", url: "https://www.wikipedia.org", icon: "assets/wikipedia.png" },
        { name: "GitHub", url: "https://github.com", icon: "assets/github.png" },
        { name: "YouTube", url: "https://www.youtube.com", icon: "assets/youtube.png" },
        { name: "LinkedIn", url: "https://www.linkedin.com", icon: "assets/linkedin.png" },
        { name: "Twitter", url: "https://twitter.com", icon: "assets/twitter.png" }
    ];
    
    // Add favorites to browser
    favorites.forEach(favorite => {
        const favoriteEl = document.createElement('div');
        favoriteEl.className = 'browser-favorite';
        favoriteEl.innerHTML = `
            <img class="browser-favorite-icon" src="${favorite.icon}" alt="${favorite.name}">
            <div class="browser-favorite-name">${favorite.name}</div>
        `;
        
        favoriteEl.addEventListener('click', () => {
            navigateTo(favorite.url);
        });
        
        browserFavorites.appendChild(favoriteEl);
    });
    
    // Handle form submission
    browserForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let url = browserAddress.value.trim();
        
        // Add https:// if not present
        if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        
        if (url) {
            navigateTo(url);
        }
    });
    
    // Handle search form submission
    browserSearchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchQuery = browserSearchInput.value.trim();
        
        if (searchQuery) {
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
            navigateTo(searchUrl);
        }
    });
    
    // Browser navigation buttons
    browserBack.addEventListener('click', function() {
        if (currentHistoryIndex > 0) {
            currentHistoryIndex--;
            loadFromHistory();
        }
    });
    
    browserForward.addEventListener('click', function() {
        if (currentHistoryIndex < browserHistory.length - 1) {
            currentHistoryIndex++;
            loadFromHistory();
        }
    });
    
    browserRefresh.addEventListener('click', function() {
        if (isFrameLoaded) {
            browserFrame.src = browserFrame.src;
        } else {
            navigateTo(browserAddress.value);
        }
    });
    
    browserHome.addEventListener('click', function() {
        resetToHomePage();
    });
    
    // Function to navigate to a URL
    function navigateTo(url) {
        if (!url) return;
        
        // Show loading screen
        browserLoading.classList.remove('hidden');
        browserHomePage.style.display = 'none';
        browserFrame.style.display = 'block';
        
        // Update address bar
        browserAddress.value = url;
        
        // Update browser history
        if (currentHistoryIndex < browserHistory.length - 1) {
            // If we navigated back and then to a new URL, remove forward history
            browserHistory = browserHistory.slice(0, currentHistoryIndex + 1);
        }
        browserHistory.push(url);
        currentHistoryIndex = browserHistory.length - 1;
        
        // Update navigation buttons
        updateNavigationButtons();
        
        // Load URL in iframe
        try {
            browserFrame.src = url;
            browserStatus.textContent = `Navigating to ${url}`;
            isFrameLoaded = true;
        } catch (e) {
            browserLoading.classList.add('hidden');
            browserStatus.textContent = `Error loading ${url}`;
            isFrameLoaded = false;
        }
        
        // Handle iframe load events
        browserFrame.onload = function() {
            browserLoading.classList.add('hidden');
            browserStatus.textContent = `Loaded ${url}`;
            updateTitle(url);
        };
        
        browserFrame.onerror = function() {
            browserLoading.classList.add('hidden');
            browserStatus.textContent = `Failed to load ${url}`;
        };
    }
    
    // Function to load URL from history
    function loadFromHistory() {
        const url = browserHistory[currentHistoryIndex];
        
        // Show loading screen
        browserLoading.classList.remove('hidden');
        browserHomePage.style.display = 'none';
        browserFrame.style.display = 'block';
        
        // Update address bar
        browserAddress.value = url;
        
        // Update navigation buttons
        updateNavigationButtons();
        
        // Load URL in iframe
        browserFrame.src = url;
        browserStatus.textContent = `Navigating to ${url}`;
    }
    
    // Function to reset to home page
    function resetToHomePage() {
        browserFrame.style.display = 'none';
        browserHomePage.style.display = 'flex';
        browserLoading.classList.add('hidden');
        browserAddress.value = '';
        browserStatus.textContent = 'Home';
        browserSearchInput.value = '';
        
        // Focus search input
        setTimeout(() => {
            browserSearchInput.focus();
        }, 100);
        
        // Update window title
        updateTitle('Home');
    }
    
    // Update navigation button states
    function updateNavigationButtons() {
        browserBack.disabled = currentHistoryIndex <= 0;
        browserForward.disabled = currentHistoryIndex >= browserHistory.length - 1;
        
        // Update button styling based on disabled state
        if (browserBack.disabled) {
            browserBack.classList.add('disabled');
        } else {
            browserBack.classList.remove('disabled');
        }
        
        if (browserForward.disabled) {
            browserForward.classList.add('disabled');
        } else {
            browserForward.classList.remove('disabled');
        }
    }
    
    // Update browser window title
    function updateTitle(url) {
        const windowTitle = document.querySelector('#browser-window .window-title');
        
        if (url === 'Home') {
            windowTitle.innerHTML = `
                <img src="assets/ie.png" alt="Internet Explorer" class="titlebar-icon">
                Internet Explorer
            `;
            return;
        }
        
        try {
            // Attempt to get the page title from the iframe
            const frameTitle = browserFrame.contentDocument?.title;
            
            if (frameTitle) {
                windowTitle.innerHTML = `
                    <img src="assets/ie.png" alt="Internet Explorer" class="titlebar-icon">
                    ${frameTitle} - Internet Explorer
                `;
            } else {
                windowTitle.innerHTML = `
                    <img src="assets/ie.png" alt="Internet Explorer" class="titlebar-icon">
                    ${new URL(url).hostname} - Internet Explorer
                `;
            }
        } catch (e) {
            // If we can't access the iframe document (due to CORS), use the URL
            try {
                windowTitle.innerHTML = `
                    <img src="assets/ie.png" alt="Internet Explorer" class="titlebar-icon">
                    ${new URL(url).hostname} - Internet Explorer
                `;
            } catch (e) {
                windowTitle.innerHTML = `
                    <img src="assets/ie.png" alt="Internet Explorer" class="titlebar-icon">
                    Internet Explorer
                `;
            }
        }
    }
    
    // Initialize browser view
    resetToHomePage();
    updateNavigationButtons();
}

// Set up computer window folder navigation
function setupComputerFolders() {
    const systemFolders = document.querySelectorAll('.system-folder');
    systemFolders.forEach(folder => {
        folder.addEventListener('click', function() {
            const windowName = this.getAttribute('data-window');
            if (windowName) {
                openWindow(windowName);
            }
        });
    });
}

// Function to handle keyboard shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Windows key (simulated with Alt key)
        if (e.altKey && !e.ctrlKey && !e.shiftKey) {
            toggleStartMenu();
            e.preventDefault();
        }
        
        // Alt+Tab for window cycling
        if (e.altKey && e.key === 'Tab') {
            cycleWindows();
            e.preventDefault();
        }
        
        // Ctrl+Alt+Delete
        if (e.ctrlKey && e.altKey && e.key === 'Delete') {
            // Show system controls or taskbar
            e.preventDefault();
        }
    });
}

// Function to cycle through open windows
function cycleWindows() {
    const visibleWindows = Array.from(document.querySelectorAll('.win7-window.visible'));
    if (visibleWindows.length < 2) return;
    
    // Find currently active window
    const activeIndex = visibleWindows.findIndex(win => win.classList.contains('active'));
    
    // Activate next window
    const nextIndex = (activeIndex + 1) % visibleWindows.length;
    activateWindow(visibleWindows[nextIndex]);
}

// Update clock display in taskbar
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateString = now.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' });
    
    document.querySelector('#taskbarTime .time').textContent = timeString;
    document.querySelector('#taskbarTime .date').textContent = dateString;
}

// Set up desktop icons
function setupDesktopIcons() {
    const icons = document.querySelectorAll('.desktop-icon');
    icons.forEach(icon => {
        const iconImg = icon.querySelector('.icon-img');
        const windowName = icon.getAttribute('data-window');
        
        // Make sure each icon has an image
        if (iconImg) {
            // Check if icon already has an image
            if (!iconImg.querySelector('img')) {
                // Add default icon based on window type
                let iconPath;
                switch(windowName) {
                    case 'about':
                        iconPath = 'assets/user.png';
                        break;
                    case 'skills':
                        iconPath = 'assets/skills.png';
                        break;
                    case 'resume':
                        iconPath = 'assets/resume.png';
                        break;
                    case 'projects':
                        iconPath = 'assets/projects.png';
                        break;
                    case 'services':
                        iconPath = 'assets/services.png';
                        break;
                    case 'contact':
                        iconPath = 'assets/contact.png';
                        break;
                    case 'computer':
                        iconPath = 'assets/computer.png';
                        break;
                    case 'recycle':
                        iconPath = 'assets/recycle-bin.png';
                        break;
                    case 'browser':
                        iconPath = 'assets/ie.png';
                        break;
                    default:
                        iconPath = 'assets/default.png';
                }
                
                const img = document.createElement('img');
                img.src = iconPath;
                img.alt = windowName;
                img.onerror = function() {
                    this.onerror = null;
                    this.src = 'assets/default.png';
                };
                
                iconImg.innerHTML = '';
                iconImg.appendChild(img);
            }
        }
        
        // Add click event to open window
        icon.addEventListener('click', function() {
            const windowName = this.getAttribute('data-window');
            if (windowName && windowName !== 'recycle') {
                openWindow(windowName);
            }
        });
    });
}

// Set up start menu functionality
function setupStartMenu() {
    const startButton = document.getElementById('startButton');
    const startMenu = document.getElementById('startMenu');
    
    startButton.addEventListener('click', toggleStartMenu);
    
    // Close start menu when clicking outside
    document.addEventListener('click', function(e) {
        if (startMenu.classList.contains('visible') && 
            !startMenu.contains(e.target) && 
            !startButton.contains(e.target)) {
            startMenu.classList.remove('visible');
        }
    });
    
    // Shutdown button
    document.getElementById('shutdownButton').addEventListener('click', function() {
        window.location.href = "../../index.html";
    });
}

// Toggle start menu visibility
function toggleStartMenu() {
    const startMenu = document.getElementById('startMenu');
    startMenu.classList.toggle('visible');
}

// Enhanced setupWindows to ensure all window controls work properly
function setupWindows() {
    // Get all windows
    const windows = document.querySelectorAll('.win7-window');
    
    // Initial positioning
    positionWindows(windows);
    
    windows.forEach(window => {
        const windowName = window.getAttribute('data-name');
        
        // Set up window controls
        const minimizeBtn = window.querySelector('.window-minimize');
        const maximizeBtn = window.querySelector('.window-maximize');
        const closeBtn = window.querySelector('.window-close');
        
        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', () => minimizeWindow(windowName));
        }
        
        if (maximizeBtn) {
            maximizeBtn.addEventListener('click', () => toggleMaximize(windowName));
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeWindow(windowName));
        }
        
        // Make window draggable
        makeDraggable(window);
        
        // Activate window on click
        window.addEventListener('mousedown', () => activateWindow(window));
    });
    
    // Show desktop button
    document.getElementById('showDesktop').addEventListener('click', minimizeAllWindows);
}

// Position windows initially
function positionWindows(windows) {
    const desktop = document.getElementById('desktop');
    const desktopWidth = desktop.offsetWidth;
    const desktopHeight = desktop.offsetHeight;
    
    windows.forEach((window, index) => {
        // Calculate position based on index to create a cascading effect
        const left = 50 + (index * 30);
        const top = 50 + (index * 30);
        
        window.style.width = '650px';
        window.style.height = '450px';
        window.style.left = `${Math.min(left, desktopWidth - 700)}px`;
        window.style.top = `${Math.min(top, desktopHeight - 500)}px`;
    });
}

// Make a window draggable
function makeDraggable(window) {
    const titlebar = window.querySelector('.window-titlebar');
    let isDragging = false;
    let offsetX, offsetY;
    
    titlebar.addEventListener('mousedown', function(e) {
        // Don't drag if clicking on controls
        if (e.target.closest('.window-controls')) return;
        
        // Start dragging
        isDragging = true;
        offsetX = e.clientX - window.offsetLeft;
        offsetY = e.clientY - window.offsetTop;
        
        // Set window as active
        activateWindow(window);
        
        // Prevent default to avoid text selection
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            // Calculate new position
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            
            // Apply new position
            window.style.left = `${Math.max(0, x)}px`;
            window.style.top = `${Math.max(0, y)}px`;
        }
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
    });
}

// Open a window
function openWindow(windowName) {
    const window = document.getElementById(`${windowName}-window`);
    if (window) {
        // Show window
        window.classList.add('visible');
        
        // Activate window
        activateWindow(window);
        
        // Add to taskbar if not already there
        addToTaskbar(windowName, window.querySelector('.window-title').textContent);
    }
}

// Close a window
function closeWindow(windowName) {
    const window = document.getElementById(`${windowName}-window`);
    if (window) {
        // Hide window
        window.classList.remove('visible');
        
        // Remove from taskbar
        removeFromTaskbar(windowName);
    }
}

// Minimize a window
function minimizeWindow(windowName) {
    const window = document.getElementById(`${windowName}-window`);
    if (window) {
        // Hide window but keep in taskbar
        window.classList.remove('visible');
        
        // Update taskbar item
        updateTaskbarItem(windowName, false);
    }
}

// Minimize all windows
function minimizeAllWindows() {
    const windows = document.querySelectorAll('.win7-window.visible');
    windows.forEach(window => {
        const windowName = window.getAttribute('data-name');
        minimizeWindow(windowName);
    });
}

// Toggle maximize state
function toggleMaximize(windowName) {
    const window = document.getElementById(`${windowName}-window`);
    if (window) {
        window.classList.toggle('maximized');
        
        if (window.classList.contains('maximized')) {
            // Save original position and size
            window.dataset.originalWidth = window.style.width;
            window.dataset.originalHeight = window.style.height;
            window.dataset.originalTop = window.style.top;
            window.dataset.originalLeft = window.style.left;
            
            // Set maximized size
            window.style.width = '100%';
            window.style.height = `calc(100% - 5px)`; // 5px buffer to prevent scrollbar
            window.style.top = '0';
            window.style.left = '0';
        } else {
            // Restore original position and size
            window.style.width = window.dataset.originalWidth;
            window.style.height = window.dataset.originalHeight;
            window.style.top = window.dataset.originalTop;
            window.style.left = window.dataset.originalLeft;
        }
    }
}

// Activate a window (bring to front)
function activateWindow(window) {
    // Deactivate all windows first
    document.querySelectorAll('.win7-window').forEach(w => {
        w.classList.remove('active');
    });
    
    // Activate this window
    window.classList.add('active');
    
    // Set highest z-index
    window.style.zIndex = getHighestZIndex() + 1;
    
    // Update taskbar
    const windowName = window.getAttribute('data-name');
    updateTaskbarItem(windowName, true);
}

// Get highest z-index of windows
function getHighestZIndex() {
    let highest = 100; // Start at 100 for windows
    document.querySelectorAll('.win7-window').forEach(window => {
        const zIndex = parseInt(window.style.zIndex || '0');
        if (zIndex > highest) highest = zIndex;
    });
    return highest;
}

// Add window to taskbar
function addToTaskbar(windowName, title) {
    const taskbarItems = document.getElementById('taskbarItems');
    
    // Check if already in taskbar
    if (document.querySelector(`.taskbar-item[data-window="${windowName}"]`)) {
        updateTaskbarItem(windowName, true);
        return;
    }
    
    // Get appropriate icon based on window type
    let iconSrc;
    
    // First try to get from desktop icon
    const desktopIcon = document.querySelector(`.desktop-icon[data-window="${windowName}"] .icon-img img`);
    if (desktopIcon && desktopIcon.src) {
        iconSrc = desktopIcon.src;
    } else {
        // Try to find in userData
        const programData = userData.startMenuPrograms.find(p => p.window === windowName);
        if (programData && programData.icon && !programData.icon.startsWith('fa-')) {
            iconSrc = programData.icon;
        } else {
            // Use default icon based on window type
            switch(windowName) {
                case 'about':
                    iconSrc = 'assets/user.png';
                    break;
                case 'skills':
                    iconSrc = 'assets/skills.png';
                    break;
                case 'resume':
                    iconSrc = 'assets/resume.png';
                    break;
                case 'projects':
                    iconSrc = 'assets/projects.png';
                    break;
                case 'services':
                    iconSrc = 'assets/services.png';
                    break;
                case 'contact':
                    iconSrc = 'assets/contact.png';
                    break;
                case 'browser':
                    iconSrc = 'assets/ie.png';
                    break;
                default:
                    iconSrc = 'assets/default.png';
            }
        }
    }
    
    // Create taskbar item
    const taskbarItem = document.createElement('div');
    taskbarItem.className = 'taskbar-item active';
    taskbarItem.setAttribute('data-window', windowName);
    
    taskbarItem.innerHTML = `
        <img src="${iconSrc}" alt="${title}" onerror="this.onerror=null; this.src='assets/default.png';">
        <span>${title}</span>
    `;
    
    taskbarItem.addEventListener('click', () => {
        toggleWindowFromTaskbar(windowName);
    });
    
    taskbarItems.appendChild(taskbarItem);
}

// Remove window from taskbar
function removeFromTaskbar(windowName) {
    const taskbarItem = document.querySelector(`.taskbar-item[data-window="${windowName}"]`);
    if (taskbarItem) {
        taskbarItem.remove();
    }
}

// Update taskbar item active state
function updateTaskbarItem(windowName, active) {
    const taskbarItem = document.querySelector(`.taskbar-item[data-window="${windowName}"]`);
    if (taskbarItem) {
        if (active) {
            taskbarItem.classList.add('active');
        } else {
            taskbarItem.classList.remove('active');
        }
    }
}

// Toggle window state from taskbar
function toggleWindowFromTaskbar(windowName) {
    const window = document.getElementById(`${windowName}-window`);
    
    if (window) {
        if (window.classList.contains('visible')) {
            // If window is active, minimize it
            if (window.classList.contains('active')) {
                minimizeWindow(windowName);
            } else {
                // If window is visible but not active, activate it
                activateWindow(window);
            }
        } else {
            // Show and activate window
            window.classList.add('visible');
            activateWindow(window);
        }
    }
}
