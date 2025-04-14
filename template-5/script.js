document.addEventListener('DOMContentLoaded', function() {
    // Show boot screen
    showBootScreen();
    
    // Initialize after boot animation with a shorter timeout
    setTimeout(function() {
        initializeDesktop();
    }, 2000); // Reduced from 3000ms to 2000ms for faster loading
});

// Show boot screen animation
function showBootScreen() {
    const bootScreen = document.getElementById('bootScreen');
    if (bootScreen) {
        bootScreen.classList.add('active');
    } else {
        console.error("Boot screen element not found!");
    }
}

// Hide boot screen animation
function hideBootScreen() {
    const bootScreen = document.getElementById('bootScreen');
    if (!bootScreen) {
        console.error("Boot screen element not found!");
        return;
    }
    
    bootScreen.classList.remove('active');
    bootScreen.classList.add('hidden');
    
    setTimeout(() => {
        bootScreen.style.display = 'none';
    }, 1000);
}

// Initialize desktop and functionality
function initializeDesktop() {
    try {
        console.log("Initializing desktop...");
        
        // Check if user data exists and load it
        if (typeof userData !== 'undefined') {
            loadUserData();
        } else {
            console.warn("userData object not found. Using placeholder data.");
        }
        
        // Set up clock
        updateClock();
        setInterval(updateClock, 1000);
        
        // Set up desktop icons
        setupDesktopIcons();
        
        // Set up windows
        setupWindows();
        
        // Set up taskbar
        setupTaskbar();
        
        // Set up context menu
        setupContextMenu();
        
        // Set up calendar widget
        setupCalendar();
        
        // Set up settings
        setupSettings();
        
        // Set up contact form
        setupContactForm();
        
        // Hide boot screen
        hideBootScreen();
        
        console.log("Desktop initialized successfully!");
    } catch (error) {
        console.error("Error initializing desktop:", error);
        // Force hide boot screen even if there's an error
        hideBootScreen();
    }
}

// Setup desktop icons
function setupDesktopIcons() {
    const desktopIcons = document.querySelectorAll('.desktop-icon');
    
    desktopIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const windowName = this.getAttribute('data-window');
            openWindow(windowName);
        });
    });
}

// Setup windows functionality
function setupWindows() {
    const windows = document.querySelectorAll('.window');
    
    windows.forEach(win => {
        // Window controls
        const minimizeBtn = win.querySelector('.window-minimize');
        const maximizeBtn = win.querySelector('.window-maximize');
        const closeBtn = win.querySelector('.window-close');
        
        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', () => {
                minimizeWindow(win);
            });
        }
        
        if (maximizeBtn) {
            maximizeBtn.addEventListener('click', () => {
                toggleMaximize(win);
            });
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                closeWindow(win);
            });
        }
        
        // Make windows draggable
        makeDraggable(win);
        
        // Window activation
        win.addEventListener('mousedown', () => {
            activateWindow(win);
        });
        
        // About window tabs
        if (win.id === 'about-window') {
            const tabs = win.querySelectorAll('.tab');
            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    const tabName = this.getAttribute('data-tab');
                    switchTab(tabName, tabs);
                });
            });
        }
        
        // Resume window tabs
        if (win.id === 'resume-window') {
            const tabs = win.querySelectorAll('.resume-tab');
            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    const tabName = this.getAttribute('data-tab');
                    switchResumeTab(tabName, tabs);
                });
            });
        }
        
        // Settings window tabs
        if (win.id === 'settings-window') {
            const navItems = win.querySelectorAll('.settings-nav-item');
            navItems.forEach(item => {
                item.addEventListener('click', function() {
                    const settingName = this.getAttribute('data-settings');
                    switchSettings(settingName, navItems);
                });
            });
        }
    });
    
    // Position windows initially
    positionWindows();
}

// Make a window draggable
function makeDraggable(element) {
    const titlebar = element.querySelector('.window-titlebar');
    if (!titlebar) return;
    
    let isDragging = false;
    let offsetX, offsetY;
    
    titlebar.addEventListener('mousedown', function(e) {
        // Ignore if clicking on a control button
        if (e.target.closest('.window-titlebar-controls')) return;
        
        isDragging = true;
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;
        
        // Make sure the window is active
        activateWindow(element);
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        if (element.classList.contains('maximized')) return;
        
        // Calculate new position
        let left = e.clientX - offsetX;
        let top = e.clientY - offsetY;
        
        // Keep window within viewport
        left = Math.max(0, Math.min(left, window.innerWidth - 100));
        top = Math.max(0, Math.min(top, window.innerHeight - 50));
        
        element.style.left = left + 'px';
        element.style.top = top + 'px';
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
    });
}

// Position windows initially
function positionWindows() {
    const desktop = document.querySelector('.desktop');
    const windows = document.querySelectorAll('.window');
    
    if (!desktop || windows.length === 0) return;
    
    windows.forEach((win, index) => {
        // Set initial positions in a cascade pattern
        const top = 50 + (index % 5) * 40;
        const left = 100 + (index % 5) * 40;
        
        win.style.top = top + 'px';
        win.style.left = left + 'px';
    });
}

// Open a window
function openWindow(windowName) {
    const win = document.getElementById(windowName + '-window');
    if (!win) return;
    
    // Show window
    win.classList.add('visible');
    win.classList.remove('minimized');
    
    // Activate window
    activateWindow(win);
    
    // Add to taskbar
    addToTaskbar(windowName);
}

// Close a window
function closeWindow(win) {
    const windowName = win.getAttribute('data-name');
    
    // Hide window
    win.classList.remove('visible', 'maximized');
    
    // Remove from taskbar
    removeFromTaskbar(windowName);
}

// Minimize a window
function minimizeWindow(win) {
    const windowName = win.getAttribute('data-name');
    
    // Hide window but keep in taskbar
    win.classList.add('minimized');
    win.classList.remove('visible');
}

// Toggle maximize state
function toggleMaximize(win) {
    win.classList.toggle('maximized');
    
    // Update maximize button icon
    const maximizeBtn = win.querySelector('.window-maximize i');
    if (maximizeBtn) {
        if (win.classList.contains('maximized')) {
            maximizeBtn.className = 'far fa-clone';
        } else {
            maximizeBtn.className = 'far fa-square';
        }
    }
}

// Activate a window (bring to front)
function activateWindow(win) {
    // Deactivate all windows
    document.querySelectorAll('.window').forEach(w => {
        w.classList.remove('active');
    });
    
    // Activate the clicked window
    win.classList.add('active');
    
    // Update taskbar indicators
    const windowName = win.getAttribute('data-name');
    updateTaskbarActiveState(windowName);
}

// Add window to taskbar if not already there
function addToTaskbar(windowName) {
    let taskbarApps = document.getElementById('taskbarApps');
    if (!taskbarApps) return;
    
    let existingApp = document.querySelector(`.taskbar-app[data-window="${windowName}"]`);
    
    // If the window isn't in the taskbar yet, add it
    if (!existingApp) {
        let icon;
        
        // Find the icon from desktop icons
        const desktopIcon = document.querySelector(`.desktop-icon[data-window="${windowName}"]`);
        if (desktopIcon) {
            const iconElement = desktopIcon.querySelector('.icon-img i');
            icon = iconElement ? iconElement.className : 'fas fa-window-restore';
        } else {
            // Default icon if not found
            icon = 'fas fa-window-restore';
        }
        
        const appBtn = document.createElement('div');
        appBtn.className = 'taskbar-app';
        appBtn.setAttribute('data-window', windowName);
        appBtn.innerHTML = `<i class="${icon}"></i>`;
        
        appBtn.addEventListener('click', function() {
            const win = document.getElementById(windowName + '-window');
            if (!win) return;
            
            // If minimized, restore, if active, minimize, otherwise activate
            if (win.classList.contains('minimized')) {
                win.classList.remove('minimized');
                win.classList.add('visible');
                activateWindow(win);
            } else if (win.classList.contains('active')) {
                minimizeWindow(win);
            } else {
                activateWindow(win);
            }
        });
        
        taskbarApps.appendChild(appBtn);
    }
    
    // Update active state
    updateTaskbarActiveState(windowName);
}

// Remove window from taskbar
function removeFromTaskbar(windowName) {
    const taskbarApp = document.querySelector(`.taskbar-app[data-window="${windowName}"]`);
    if (taskbarApp) {
        taskbarApp.remove();
    }
}

// Update taskbar active indicators
function updateTaskbarActiveState(activeWindowName) {
    // Remove active class from all taskbar apps
    document.querySelectorAll('.taskbar-app').forEach(app => {
        app.classList.remove('active');
    });
    
    // Add active class to the current window's taskbar icon
    const activeApp = document.querySelector(`.taskbar-app[data-window="${activeWindowName}"]`);
    if (activeApp) {
        activeApp.classList.add('active');
    }
}

// Setup taskbar functionality
function setupTaskbar() {
    // Start button
    const startButton = document.getElementById('startButton');
    const startMenu = document.getElementById('startMenu');
    
    if (startButton && startMenu) {
        startButton.addEventListener('click', function() {
            toggleStartMenu();
            
            // Close other panels
            closeWidgetPanel();
            closeNotificationCenter();
        });
        
        // Click outside to close start menu
        document.addEventListener('click', function(event) {
            if (startMenu.classList.contains('active') && 
                !startMenu.contains(event.target) && 
                !startButton.contains(event.target)) {
                startMenu.classList.remove('active');
                startButton.classList.remove('active');
            }
        });
    }
    
    // Widget button
    const widgetButton = document.getElementById('widgetButton');
    const widgetPanel = document.getElementById('widgetPanel');
    
    if (widgetButton && widgetPanel) {
        widgetButton.addEventListener('click', function() {
            toggleWidgetPanel();
            
            // Close other panels
            closeStartMenu();
            closeNotificationCenter();
        });
        
        // Widget close button
        const widgetClose = document.querySelector('.widget-close');
        if (widgetClose) {
            widgetClose.addEventListener('click', function() {
                closeWidgetPanel();
            });
        }
        
        // Click outside to close widget panel
        document.addEventListener('click', function(event) {
            if (widgetPanel.classList.contains('active') && 
                !widgetPanel.contains(event.target) && 
                !widgetButton.contains(event.target)) {
                widgetPanel.classList.remove('active');
            }
        });
    }
    
    // Notification button
    const notificationButton = document.getElementById('notificationButton');
    const notificationCenter = document.getElementById('notificationCenter');
    
    if (notificationButton && notificationCenter) {
        notificationButton.addEventListener('click', function() {
            toggleNotificationCenter();
            
            // Close other panels
            closeStartMenu();
            closeWidgetPanel();
        });
        
        // Click outside to close notification center
        document.addEventListener('click', function(event) {
            if (notificationCenter.classList.contains('active') && 
                !notificationCenter.contains(event.target) && 
                !notificationButton.contains(event.target)) {
                notificationCenter.classList.remove('active');
            }
        });
    }
    
    // Quick settings toggles
    const quickSettings = document.querySelectorAll('.quick-setting');
    quickSettings.forEach(setting => {
        setting.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
    
    // Clear notifications
    const clearNotifications = document.getElementById('clearNotifications');
    if (clearNotifications) {
        clearNotifications.addEventListener('click', function() {
            const notifications = document.querySelectorAll('.notification-item');
            notifications.forEach(notification => {
                notification.remove();
            });
        });
    }
    
    // Individual notification close buttons
    document.querySelectorAll('.notification-close').forEach(btn => {
        btn.addEventListener('click', function() {
            const notification = this.closest('.notification-item');
            if (notification) {
                notification.remove();
            }
        });
    });
    
    // Update date and time in taskbar
    updateDateTimeDisplay();
    setInterval(updateDateTimeDisplay, 1000);
}

// Toggle start menu
function toggleStartMenu() {
    const startMenu = document.getElementById('startMenu');
    const startButton = document.getElementById('startButton');
    
    if (startMenu && startButton) {
        startMenu.classList.toggle('active');
        startButton.classList.toggle('active');
    }
}

// Close start menu
function closeStartMenu() {
    const startMenu = document.getElementById('startMenu');
    const startButton = document.getElementById('startButton');
    
    if (startMenu && startButton) {
        startMenu.classList.remove('active');
        startButton.classList.remove('active');
    }
}

// Toggle widget panel
function toggleWidgetPanel() {
    const widgetPanel = document.getElementById('widgetPanel');
    if (widgetPanel) {
        widgetPanel.classList.toggle('active');
    }
}

// Close widget panel
function closeWidgetPanel() {
    const widgetPanel = document.getElementById('widgetPanel');
    if (widgetPanel) {
        widgetPanel.classList.remove('active');
    }
}

// Toggle notification center
function toggleNotificationCenter() {
    const notificationCenter = document.getElementById('notificationCenter');
    if (notificationCenter) {
        notificationCenter.classList.toggle('active');
    }
}

// Close notification center
function closeNotificationCenter() {
    const notificationCenter = document.getElementById('notificationCenter');
    if (notificationCenter) {
        notificationCenter.classList.remove('active');
    }
}

// Update date and time display
function updateDateTimeDisplay() {
    const now = new Date();
    
    // Format time (12-hour format with AM/PM)
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes} ${ampm}`;
    
    // Format date (Month Day, Year)
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);
    
    // Update taskbar
    const timeElement = document.querySelector('.taskbar-time');
    const dateElement = document.querySelector('.taskbar-date');
    
    if (timeElement) timeElement.textContent = timeString;
    if (dateElement) dateElement.textContent = dateString;
}

// Setup calendar widget
function setupCalendar() {
    try {
        const now = new Date();
        const month = now.toLocaleDateString('en-US', { month: 'long' });
        const year = now.getFullYear();
        
        // Set month and year header
        const calendarMonth = document.getElementById('calendarMonth');
        if (calendarMonth) {
            calendarMonth.textContent = `${month} ${year}`;
        }
        
        // Generate calendar days
        generateCalendarDays(now.getMonth(), now.getFullYear());
    } catch (error) {
        console.error("Error setting up calendar:", error);
    }
}

// Generate days for calendar
function generateCalendarDays(month, year) {
    try {
        const calendarDays = document.getElementById('calendarDays');
        if (!calendarDays) return;
        
        calendarDays.innerHTML = '';
        
        // Get first day of the month and number of days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        
        // Get day of week for first day (0 = Sunday, 6 = Saturday)
        const startingDay = firstDay.getDay();
        
        // Get today's date for highlighting
        const today = new Date();
        const currentDay = today.getDate();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        
        // Previous month days
        for (let i = 0; i < startingDay; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'calendar-day other-month';
            const prevMonthLastDay = new Date(year, month, 0).getDate();
            dayDiv.textContent = prevMonthLastDay - (startingDay - i - 1);
            calendarDays.appendChild(dayDiv);
        }
        
        // Current month days
        for (let i = 1; i <= daysInMonth; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'calendar-day';
            dayDiv.textContent = i;
            
            // Check if this is today
            if (i === currentDay && month === currentMonth && year === currentYear) {
                dayDiv.classList.add('today');
            }
            
            calendarDays.appendChild(dayDiv);
        }
        
        // Fill remaining days with next month
        const totalCells = 42; // 6 rows of 7 days
        const remainingCells = totalCells - (startingDay + daysInMonth);
        
        for (let i = 1; i <= remainingCells; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'calendar-day other-month';
            dayDiv.textContent = i;
            calendarDays.appendChild(dayDiv);
        }
    } catch (error) {
        console.error("Error generating calendar days:", error);
    }
}

// Setup context menu
function setupContextMenu() {
    const contextMenu = document.getElementById('contextMenu');
    const desktop = document.querySelector('.desktop');
    
    if (!contextMenu || !desktop) return;
    
    // Show context menu on right-click
    desktop.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        
        // Position context menu at cursor
        contextMenu.style.left = `${event.clientX}px`;
        contextMenu.style.top = `${event.clientY}px`;
        
        // Show context menu
        contextMenu.classList.add('active');
    });
    
    // Hide context menu on click outside
    document.addEventListener('click', function() {
        if (contextMenu) contextMenu.classList.remove('active');
    });
    
    // Context menu actions
    const contextMenuItems = document.querySelectorAll('.menu-item');
    contextMenuItems.forEach(item => {
        item.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            
            switch (action) {
                case 'refresh':
                    // Refresh the desktop
                    location.reload();
                    break;
                case 'personalize':
                    // Open settings window to personalization tab
                    openWindow('settings');
                    const navItems = document.querySelectorAll('.settings-nav-item');
                    if (navItems.length > 0) {
                        switchSettings('personalization', navItems);
                    }
                    break;
            }
        });
    });
}

// Switch tab in about window
function switchTab(tabName, tabElements) {
    // Hide all tabs and deactivate all tab buttons
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    tabElements.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab and activate tab button
    const selectedTab = document.getElementById(`${tabName}-tab`);
    const selectedTabBtn = document.querySelector(`.tab[data-tab="${tabName}"]`);
    
    if (selectedTab) selectedTab.classList.add('active');
    if (selectedTabBtn) selectedTabBtn.classList.add('active');
}

// Switch tab in resume window
function switchResumeTab(tabName, tabElements) {
    // Hide all tabs and deactivate all tab buttons
    document.querySelectorAll('.resume-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    
    tabElements.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab and activate tab button
    const selectedPane = document.getElementById(`${tabName}-pane`);
    const selectedTabBtn = document.querySelector(`.resume-tab[data-tab="${tabName}"]`);
    
    if (selectedPane) selectedPane.classList.add('active');
    if (selectedTabBtn) selectedTabBtn.classList.add('active');
}

// Switch tab in settings window
function switchSettings(settingName, navItems) {
    // Hide all settings panes and deactivate all nav items
    document.querySelectorAll('.settings-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected settings pane and activate nav item
    const selectedPane = document.getElementById(`${settingName}-pane`);
    const selectedNavItem = document.querySelector(`.settings-nav-item[data-settings="${settingName}"]`);
    
    if (selectedPane) selectedPane.classList.add('active');
    if (selectedNavItem) selectedNavItem.classList.add('active');
}

// Setup settings functionality
function setupSettings() {
    // Theme toggles
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            
            // Update active state
            themeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Apply theme
            applyTheme(theme);
        });
    });
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('win11-theme');
    if (savedTheme) {
        applyTheme(savedTheme);
        const activeTheme = document.querySelector(`.theme-option[data-theme="${savedTheme}"]`);
        if (activeTheme) {
            document.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));
            activeTheme.classList.add('active');
        }
    }
    
    // Background options
    const backgroundOptions = document.querySelectorAll('.background-option');
    backgroundOptions.forEach(option => {
        option.addEventListener('click', function() {
            const bg = this.getAttribute('data-bg');
            
            // Update active state
            backgroundOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Apply background
            const desktop = document.querySelector('.desktop');
            if (desktop) {
                desktop.style.backgroundImage = `url('assets/${bg}.jpg')`;
            }
            
            // Save preference
            localStorage.setItem('win11-background', bg);
        });
    });
    
    // Load saved background preference
    const savedBg = localStorage.getItem('win11-background');
    if (savedBg) {
        const desktop = document.querySelector('.desktop');
        if (desktop) {
            desktop.style.backgroundImage = `url('assets/${savedBg}.jpg')`;
        }
        
        // Update active state
        const activeBg = document.querySelector(`.background-option[data-bg="${savedBg}"]`);
        if (activeBg) {
            backgroundOptions.forEach(opt => opt.classList.remove('active'));
            activeBg.classList.add('active');
        }
    }
    
    // Accent color options
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            
            // Update active state
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Apply accent color
            document.body.setAttribute('data-accent', color);
            
            // Save preference
            localStorage.setItem('win11-accent', color);
        });
    });
    
    // Load saved accent color preference
    const savedAccent = localStorage.getItem('win11-accent');
    if (savedAccent) {
        document.body.setAttribute('data-accent', savedAccent);
        
        // Update active state
        const activeColor = document.querySelector(`.color-option[data-color="${savedAccent}"]`);
        if (activeColor) {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            activeColor.classList.add('active');
        }
    }
}

// Apply theme
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('win11-theme', theme);
}

// Setup contact form
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const formContent = contactForm.innerHTML;
            contactForm.innerHTML = `
                <div style="text-align: center; padding: 30px;">
                    <div style="font-size: 48px; color: var(--theme-primary); margin-bottom: 20px;">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3>Message Sent Successfully!</h3>
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

// Update clock
function updateClock() {
    updateDateTimeDisplay();
}

// Load user data into the UI
function loadUserData() {
    try {
        // Check if userData exists
        if (typeof userData === 'undefined') {
            console.warn("userData object not found");
            return;
        }
        
        // About window data
        const aboutElements = {
            'aboutName': userData.name || 'Your Name',
            'aboutFullName': userData.name || 'Your Name',
            'aboutTitle': userData.title || 'Your Title',
            'aboutLocation': userData.location || 'Your Location',
            'aboutDescription': userData.about?.description || 'Your description here',
            'aboutEmail': userData.contact?.email || 'email@example.com',
            'aboutPhone': userData.contact?.phone || 'Your Phone',
            'aboutExperience': userData.experience || 'Your Experience'
        };
        
        // Set text content for each element
        Object.entries(aboutElements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
        
        // Set image and link attributes
        const aboutImage = document.getElementById('aboutImage');
        if (aboutImage) aboutImage.src = userData.avatar || './assets/hero-image.jpg';
        
        const cvButton = document.getElementById('cvButton');
        if (cvButton) cvButton.href = userData.cvLink || '#';
        
        // Widget panel data
        const widgetName = document.getElementById('widgetName');
        if (widgetName) widgetName.textContent = userData.name || 'Your Name';
        
        const widgetTitle = document.getElementById('widgetTitle');
        if (widgetTitle) widgetTitle.textContent = userData.title || 'Your Title';
        
        const widgetAvatar = document.getElementById('widgetAvatar');
        if (widgetAvatar) widgetAvatar.src = userData.avatar || './assets/hero-image.jpg';
        
        // Contact information
        const contactElements = {
            'contactDescription': userData.contact?.description || 'Your contact description',
            'contactEmail': userData.contact?.email || 'email@example.com',
            'contactPhone': userData.contact?.phone || 'Your Phone',
            'contactLocation': userData.location || 'Your Location'
        };
        
        // Set text content for each contact element
        Object.entries(contactElements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
        
        // Load other sections
        loadSocialLinks();
        loadSkills();
        loadResume();
        loadPortfolio();
        loadServices();
        loadStartMenu();
    } catch (error) {
        console.error("Error loading user data:", error);
    }
}

// Load social links
function loadSocialLinks() {
    try {
        if (!userData || !userData.social) return;
        
        const socialLinks = document.getElementById('socialLinks');
        if (!socialLinks) return;
        
        socialLinks.innerHTML = '';
        
        userData.social.forEach(social => {
            const socialItem = document.createElement('div');
            socialItem.className = 'social-item';
            
            socialItem.innerHTML = `
                <div class="social-icon">
                    <i class="${social.icon}"></i>
                </div>
                <div class="social-name">${social.platform}</div>
            `;
            
            socialItem.addEventListener('click', () => {
                window.open(social.url, '_blank');
            });
            
            socialLinks.appendChild(socialItem);
        });
    } catch (error) {
        console.error("Error loading social links:", error);
    }
}

// Load skills
function loadSkills() {
    try {
        if (!userData || !userData.skills) return;
        
        const skillsGrid = document.getElementById('skillsGrid');
        const skillsWidget = document.getElementById('skillsWidget');
        
        if (skillsGrid) {
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
        
        if (skillsWidget) {
            skillsWidget.innerHTML = '';
            
            userData.skills.forEach(skill => {
                const percentage = skill.percentage || 80;
                
                const skillBar = document.createElement('div');
                skillBar.className = 'skill-bar';
                
                skillBar.innerHTML = `
                    <div class="skill-bar-title">
                        <span>${skill.name}</span>
                        <span>${percentage}%</span>
                    </div>
                    <div class="skill-bar-track">
                        <div class="skill-bar-fill" style="width: ${percentage}%"></div>
                    </div>
                `;
                
                skillsWidget.appendChild(skillBar);
            });
        }
    } catch (error) {
        console.error("Error loading skills:", error);
    }
}

// Load resume data
function loadResume() {
    try {
        // Experience timeline
        const experienceTimeline = document.getElementById('experienceTimeline');
        if (experienceTimeline && userData && userData.experience_list) {
            experienceTimeline.innerHTML = '';
            
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
        }
        
        // Education timeline
        const educationTimeline = document.getElementById('educationTimeline');
        if (educationTimeline && userData && userData.education) {
            educationTimeline.innerHTML = '';
            
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
    } catch (error) {
        console.error("Error loading resume data:", error);
    }
}

// Load portfolio data
function loadPortfolio() {
    try {
        if (!userData || !userData.portfolio) return;
        
        const portfolioGrid = document.getElementById('portfolioGrid');
        const portfolioFilters = document.getElementById('portfolioFilters');
        const portfolioCount = document.getElementById('portfolioCount');
        
        if (!portfolioGrid) return;
        
        portfolioGrid.innerHTML = '';
        
        // Add all projects
        userData.portfolio.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.setAttribute('data-category', project.category.toLowerCase().replace(' ', '-'));
            
            projectCard.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-body">
                    <h3 class="project-title">${project.title}</h3>
                    <span class="project-category">${project.category}</span>
                    <p class="project-description">${project.description}</p>
                    <a href="${project.link}" class="project-link" target="_blank">View Project <i class="fas fa-external-link-alt"></i></a>
                </div>
            `;
            
            portfolioGrid.appendChild(projectCard);
        });
        
        // Update count if element exists
        if (portfolioCount) {
            portfolioCount.textContent = `${userData.portfolio.length} items`;
        }
        
        // Setup portfolio filters if element exists
        if (portfolioFilters) {
            // Create category filters
            const categories = new Set(['All']);
            userData.portfolio.forEach(project => {
                categories.add(project.category);
            });
            
            // Clear existing filters
            portfolioFilters.innerHTML = '';
            
            // Add filter chips
            categories.forEach(category => {
                const chip = document.createElement('div');
                chip.className = 'chip';
                chip.setAttribute('data-filter', category === 'All' ? 'all' : category.toLowerCase().replace(' ', '-'));
                chip.textContent = category;
                
                if (category === 'All') chip.classList.add('active');
                
                chip.addEventListener('click', function() {
                    // Update active state
                    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Filter projects
                    filterProjects(category);
                });
                
                portfolioFilters.appendChild(chip);
            });
        }
        
        // Setup search functionality
        const portfolioSearch = document.getElementById('portfolioSearch');
        if (portfolioSearch) {
            portfolioSearch.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                
                const projectCards = document.querySelectorAll('.project-card');
                projectCards.forEach(card => {
                    const title = card.querySelector('.project-title')?.textContent.toLowerCase() || '';
                    const category = card.querySelector('.project-category')?.textContent.toLowerCase() || '';
                    const description = card.querySelector('.project-description')?.textContent.toLowerCase() || '';
                    
                    if (title.includes(searchTerm) || category.includes(searchTerm) || description.includes(searchTerm)) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        }
        
        // Setup view toggle
        const viewToggles = document.querySelectorAll('.view-toggle');
        viewToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                viewToggles.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                const viewType = this.getAttribute('data-view');
                if (viewType === 'list') {
                    portfolioGrid.classList.add('list-view');
                } else {
                    portfolioGrid.classList.remove('list-view');
                }
            });
        });
    } catch (error) {
        console.error("Error loading portfolio:", error);
    }
}

// Filter portfolio projects
function filterProjects(category) {
    try {
        const projects = document.querySelectorAll('.project-card');
        
        projects.forEach(project => {
            if (category === 'All') {
                project.style.display = '';
            } else {
                const projectCategory = project.getAttribute('data-category');
                if (projectCategory === category.toLowerCase().replace(' ', '-')) {
                    project.style.display = '';
                } else {
                    project.style.display = 'none';
                }
            }
        });
    } catch (error) {
        console.error("Error filtering projects:", error);
    }
}

// Load services data
function loadServices() {
    try {
        if (!userData || !userData.services) return;
        
        const servicesGrid = document.getElementById('servicesGrid');
        if (!servicesGrid) return;
        
        servicesGrid.innerHTML = '';
        
        userData.services.forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card';
            
            serviceCard.innerHTML = `
                <div class="service-icon"><i class="${service.icon}"></i></div>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
            `;
            
            servicesGrid.appendChild(serviceCard);
        });
    } catch (error) {
        console.error("Error loading services:", error);
    }
}

// Load start menu items
function loadStartMenu() {
    try {
        if (!userData || !userData.startMenu) return;
        
        const startPinned = document.getElementById('startPinned');
        const startRecommended = document.getElementById('startRecommended');
        
        if (!startPinned || !startRecommended) return;
        
        // Clear existing content
        startPinned.innerHTML = '';
        startRecommended.innerHTML = '';
        
        // Pinned items
        userData.startMenu.pinned.forEach(item => {
            const startApp = document.createElement('div');
            startApp.className = 'start-app';
            
            startApp.innerHTML = `
                <i class="${item.icon}"></i>
                <span>${item.name}</span>
            `;
            
            if (item.window) {
                startApp.addEventListener('click', () => {
                    openWindow(item.window);
                    toggleStartMenu();
                });
            } else if (item.url) {
                startApp.addEventListener('click', () => {
                    window.open(item.url, '_blank');
                    toggleStartMenu();
                });
            }
            
            startPinned.appendChild(startApp);
        });
        
        // Recommended items
        userData.startMenu.recommended.forEach(item => {
            const listItem = document.createElement('div');
            listItem.className = 'start-list-item';
            
            listItem.innerHTML = `
                <i class="${item.icon}"></i>
                <span>${item.name}</span>
            `;
            
            if (item.window) {
                listItem.addEventListener('click', () => {
                    openWindow(item.window);
                    toggleStartMenu();
                });
            } else if (item.url) {
                listItem.addEventListener('click', () => {
                    window.open(item.url, '_blank');
                    toggleStartMenu();
                });
            }
            
            startRecommended.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error loading start menu:", error);
    }
}