const userData = {
    // Basic Information
    name: "Abhik Das",
    title: "Full Stack Developer",
    intro: "I'm a passionate Full Stack Developer from Kolkata, India, specializing in building exceptional digital experiences.",
    avatar: "./assets/hero-image.jpg",
    cvLink: "#",
    location: "Kolkata, India",
    experience: "2 Years",
    
    // Navigation
    navigation: [
        { label: "About", url: "#about", icon: "far fa-user" },
        { label: "Skills", url: "#skills", icon: "fas fa-code" },
        { label: "Resume", url: "#resume", icon: "far fa-file-alt" },
        { label: "Projects", url: "#portfolio", icon: "fas fa-briefcase" },
        { label: "Services", url: "#services", icon: "fas fa-laptop-code" },
        { label: "Contact", url: "#contact", icon: "far fa-envelope" },
        { label: "Settings", url: "#settings", icon: "fas fa-cog" }
    ],
    
    // Start Menu
    startMenu: {
        pinned: [
            { name: "About", icon: "far fa-user", window: "about" },
            { name: "Skills", icon: "fas fa-code", window: "skills" },
            { name: "Resume", icon: "far fa-file-alt", window: "resume" },
            { name: "Projects", icon: "fas fa-briefcase", window: "portfolio" },
            { name: "Services", icon: "fas fa-laptop-code", window: "services" },
            { name: "Contact", icon: "far fa-envelope", window: "contact" },
            { name: "Settings", icon: "fas fa-cog", window: "settings" },
            { name: "GitHub", icon: "fab fa-github", url: "https://github.com/" },
            { name: "LinkedIn", icon: "fab fa-linkedin-in", url: "https://linkedin.com/" }
        ],
        recommended: [
            { name: "My Latest Project", icon: "fas fa-star", window: "portfolio" },
            { name: "Download Resume", icon: "fas fa-download", url: "#" },
            { name: "Contact Me", icon: "far fa-envelope", window: "contact" }
        ]
    },
    
    // About Section
    about: {
        description: "I'm a Full Stack Developer from Kolkata, India, specializing in building user-friendly web applications with modern frameworks like React, Node.js, and MongoDB. I'm passionate about creating clean, efficient code and providing excellent user experiences."
    },
    
    // Skills Section
    skills: [
        {
            name: "Front-end Development",
            icon: "fas fa-code",
            description: "Building responsive websites with HTML, CSS, JavaScript, and React.",
            percentage: 90
        },
        {
            name: "Back-end Development",
            icon: "fas fa-server",
            description: "Creating robust APIs and server applications with Node.js and Express.",
            percentage: 85
        },
        {
            name: "Database Management",
            icon: "fas fa-database",
            description: "Working with SQL and NoSQL databases like MongoDB and MySQL.",
            percentage: 80
        }
    ],
    
    // Education
    education: [
        {
            degree: "B.Tech in Computer Science",
            institution: "University Name",
            years: "2016 - 2020",
            description: "Studied computer science fundamentals, web development, and software engineering."
        }
    ],
    
    // Experience
    experience_list: [
        {
            position: "Full Stack Developer",
            company: "Tech Company",
            years: "2022 - Present",
            description: "Developing and maintaining web applications using the MERN stack."
        },
        {
            position: "Frontend Developer",
            company: "Web Agency",
            years: "2020 - 2022",
            description: "Created responsive user interfaces for various client projects."
        }
    ],
    
    // Portfolio
    portfolio: [
        {
            title: "E-commerce Platform",
            category: "Web Development",
            image: "./assets/example.jpg",
            description: "A full-featured online store with payment processing and inventory management.",
            link: "#"
        },
        {
            title: "Social Media App",
            category: "Mobile App",
            image: "./assets/example.jpg",
            description: "A mobile application for connecting with friends and sharing updates.",
            link: "#"
        }
    ],
    
    // Services
    services: [
        {
            title: "Web Development",
            icon: "fas fa-laptop-code",
            description: "Creating responsive and user-friendly websites tailored to your needs."
        },
        {
            title: "Mobile App Development",
            icon: "fas fa-mobile-alt",
            description: "Building cross-platform mobile applications with React Native."
        },
        {
            title: "UI/UX Design",
            icon: "fas fa-paint-brush",
            description: "Designing intuitive and visually appealing user interfaces."
        }
    ],
    
    // Contact Information
    contact: {
        email: "example@email.com",
        phone: "+91 98765 43210",
        description: "Feel free to reach out to me for any project inquiries or collaboration opportunities."
    },
    
    // Social Media
    social: [
        { platform: "GitHub", url: "https://github.com/", icon: "fab fa-github" },
        { platform: "LinkedIn", url: "https://linkedin.com/", icon: "fab fa-linkedin-in" },
        { platform: "Twitter", url: "https://twitter.com/", icon: "fab fa-twitter" }
    ]
};
