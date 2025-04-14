const userData = {
    // Basic Information
    name: "John Doe",
    title: "Full Stack Developer",
    intro: "I build web applications with a focus on clean code and user experience.",
    avatar: "assets/avatar.jpg",
    cvLink: "#",
    location: "New York, USA",
    experience: "5 Years",
    
    // Contact Information
    contact: {
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        description: "Feel free to contact me for any project inquiries or collaboration opportunities."
    },
    
    // Social Media
    social: [
        { platform: "LinkedIn", url: "https://linkedin.com/in/johndoe", icon: "fab fa-linkedin" },
        { platform: "GitHub", url: "https://github.com/johndoe", icon: "fab fa-github" },
        { platform: "Twitter", url: "https://twitter.com/johndoe", icon: "fab fa-twitter" },
        { platform: "Instagram", url: "https://instagram.com/johndoe", icon: "fab fa-instagram" }
    ],
    
    // Skills
    skills: [
        {
            name: "Frontend Development",
            icon: "fas fa-code",
            description: "HTML5, CSS3, JavaScript, React, Vue.js",
            percentage: 90
        },
        {
            name: "Backend Development",
            icon: "fas fa-server",
            description: "Node.js, Express, Python, Django, PHP",
            percentage: 85
        },
        {
            name: "Database Management",
            icon: "fas fa-database",
            description: "MySQL, MongoDB, PostgreSQL, Firebase",
            percentage: 80
        },
        {
            name: "DevOps",
            icon: "fas fa-cogs",
            description: "Docker, AWS, CI/CD, Git",
            percentage: 75
        },
        {
            name: "UI/UX Design",
            icon: "fas fa-paint-brush",
            description: "Figma, Adobe XD, Sketch, Photoshop",
            percentage: 70
        }
    ],
    
    // Experience
    experience_list: [
        {
            position: "Senior Full Stack Developer",
            company: "Tech Solutions Inc.",
            years: "2020 - Present",
            description: "Leading development of enterprise web applications, mentoring junior developers, and implementing DevOps practices."
        },
        {
            position: "Full Stack Developer",
            company: "Digital Innovations",
            years: "2018 - 2020",
            description: "Developed and maintained multiple client projects using React, Node.js, and MongoDB."
        },
        {
            position: "Frontend Developer",
            company: "Creative Web Agency",
            years: "2016 - 2018",
            description: "Created responsive and interactive interfaces for various client websites and applications."
        }
    ],
    
    // Education
    education: [
        {
            degree: "Master's in Computer Science",
            institution: "Tech University",
            years: "2014 - 2016",
            description: "Focused on web technologies and software engineering practices."
        },
        {
            degree: "Bachelor's in Computer Science",
            institution: "State University",
            years: "2010 - 2014",
            description: "Studied programming fundamentals, algorithms, and data structures."
        }
    ],
    
    // Projects
    projects: [
        {
            title: "E-commerce Platform",
            category: "Web Development",
            image: "assets/project1.jpg",
            description: "A full-featured online store with payment processing, inventory management, and analytics dashboard.",
            technologies: "React, Node.js, MongoDB, Stripe",
            link: "#"
        },
        {
            title: "Task Management App",
            category: "Web Application",
            image: "assets/project2.jpg",
            description: "Collaborative task management tool with real-time updates and file sharing capabilities.",
            technologies: "Vue.js, Firebase, Express.js",
            link: "#"
        },
        {
            title: "Mobile Fitness App",
            category: "Mobile Development",
            image: "assets/project3.jpg",
            description: "Cross-platform mobile application for workout tracking and meal planning.",
            technologies: "React Native, Redux, Node.js",
            link: "#"
        }
    ],
    
    // Services
    services: [
        {
            title: "Web Development",
            icon: "fas fa-code",
            description: "Custom website development tailored to your business needs, with responsive design and SEO optimization."
        },
        {
            title: "Mobile App Development",
            icon: "fas fa-mobile-alt",
            description: "Cross-platform mobile applications for iOS and Android using React Native."
        },
        {
            title: "UI/UX Design",
            icon: "fas fa-paint-brush",
            description: "User-centered design solutions that enhance user satisfaction and improve conversion rates."
        },
        {
            title: "Database Design",
            icon: "fas fa-database",
            description: "Efficient and scalable database architectures for optimal performance and data security."
        }
    ],
    
    // Start Menu Programs
    startMenuPrograms: [
        {
            name: "About Me", 
            icon: "assets/user.png", 
            window: "about"
        },
        {
            name: "Skills", 
            icon: "assets/skills.png", 
            window: "skills"
        },
        {
            name: "Resume", 
            icon: "assets/resume.png", 
            window: "resume"
        },
        {
            name: "Projects", 
            icon: "assets/projects.png", 
            window: "projects"
        },
        {
            name: "Services", 
            icon: "assets/services.png", 
            window: "services"
        },
        {
            name: "Contact", 
            icon: "assets/contact.png", 
            window: "contact"
        },
        {
            name: "Internet Explorer", 
            icon: "assets/ie.png", 
            window: "browser"
        },
        {
            name: "Computer", 
            icon: "assets/computer.png", 
            window: "computer"
        },
        {
            name: "Control Panel", 
            icon: "assets/control-panel.png", 
            window: "settings"
        },
        {
            name: "Recycle Bin", 
            icon: "assets/recycle-bin.png", 
            window: "recycle"
        }
    ]
};
