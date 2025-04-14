const userData = {
    // Basic Information
    name: "Abhik Das",
    title: "Full Stack Developer",
    intro: "I'm a passionate Full Stack Developer from Kolkata, India, specializing in building exceptional digital experiences with modern web technologies.",
    avatar: "./hero-image.jpg", // Placeholder image, replace with actual path
    cvLink: "#", // Link to download CV
    location: "Kolkata, India",
    experience: "2 Years",
    
    // Navigation
    navigation: [
        { label: "HOME", url: "#home" },
        { label: "ABOUT", url: "#about" },
        { label: "SKILLS", url: "#skills" },
        { label: "RESUME", url: "#resume" },
        { label: "PROJECTS", url: "#portfolio" },
        { label: "SERVICES", url: "#services" },
        { label: "CONTACT", url: "#contact" }
    ],
    
    // About Section
    about: {
        title: "B.Tech CSE Student With Focus on Data Science",
        description: "I'm currently pursuing my B.Tech in Computer Science Engineering with a specialization in Data Science from Brainware University, Kolkata. I'm passionate about building intuitive and performant web applications and have experience with both frontend and backend technologies. I enjoy solving complex problems and learning new skills to improve my development capabilities."
    },
    
    // Skills Section
    skills: [
        {
            name: "Front-end Development",
            icon: "fas fa-code",
            description: "Creating responsive and interactive user interfaces with React, HTML, CSS, and JavaScript."
        },
        {
            name: "Back-end Development",
            icon: "fas fa-server",
            description: "Building robust server-side applications using Node.js, Express, and MongoDB."
        },
        {
            name: "Database Management",
            icon: "fas fa-database",
            description: "Designing and optimizing databases with SQL and NoSQL technologies."
        },
        {
            name: "UI/UX Design",
            icon: "fas fa-pencil-ruler",
            description: "Crafting user-friendly interfaces with Figma and Adobe XD."
        },
        {
            name: "DevOps",
            icon: "fas fa-cogs",
            description: "Implementing CI/CD pipelines using GitHub Actions, Docker, and AWS."
        },
        {
            name: "Data Science",
            icon: "fas fa-chart-bar",
            description: "Analyzing data and creating machine learning models with Python, Pandas, and TensorFlow."
        }
    ],
    
    // Education
    education: [
        {
            degree: "B.Tech in Computer Science Engineering (Data Science)",
            institution: "Brainware University, Kolkata",
            years: "2021 - Present",
            description: "Studying advanced computer science concepts with a focus on data science, machine learning, and web development."
        },
        {
            degree: "Higher Secondary Education",
            institution: "West Bengal Council of Higher Secondary Education",
            years: "2019 - 2021",
            description: "Completed higher secondary education with a focus on science and mathematics."
        },
        {
            degree: "Secondary Education",
            institution: "West Bengal Board of Secondary Education",
            years: "2018 - 2019",
            description: "Completed secondary education with distinction."
        }
    ],
    
    // Experience
    experience_list: [
        {
            position: "Full Stack Developer (Intern)",
            company: "TechInnovate Solutions, Kolkata",
            years: "2023 - Present",
            description: "Working on developing and maintaining web applications using MERN stack. Implementing responsive designs and RESTful APIs."
        },
        {
            position: "Web Development Freelancer",
            company: "Self-employed",
            years: "2022 - 2023",
            description: "Built custom websites and web applications for various clients. Managed complete project lifecycles from design to deployment."
        },
        {
            position: "Web Development Team Lead",
            company: "University Tech Club",
            years: "2021 - 2022",
            description: "Led a team of student developers to create the university's tech fest website. Managed project timelines and coordinated with different departments."
        }
    ],
    
    // Portfolio
    portfolio: [
        {
            title: "Banking System Web Application",
            category: "Web Development",
            image: "./example.jpg",
            description: "A full-stack banking application with user authentication, transaction history, and fund transfer features.",
            link: "#"
        },
        {
            title: "File Sharing Platform",
            category: "Web Development",
            image: "./example.jpg",
            description: "A secure file sharing platform with encryption, user permissions, and real-time collaboration.",
            link: "#"
        },
        {
            title: "E-commerce Dashboard",
            category: "UI/UX",
            image: "./example.jpg",
            description: "A comprehensive dashboard for e-commerce store owners with analytics, inventory management, and order processing.",
            link: "#"
        },
        {
            title: "Customer Sentiment Analysis",
            category: "Data Science",
            image: "./example.jpg",
            description: "A machine learning model that analyzes customer reviews and provides sentiment insights for businesses.",
            link: "#"
        },
        {
            title: "Weather Forecast App",
            category: "Mobile App",
            image: "./example.jpg",
            description: "A mobile app that provides accurate weather forecasts with interactive visualizations.",
            link: "#"
        },
        {
            title: "Task Management System",
            category: "Web Development",
            image: "./example.jpg",
            description: "A collaborative task management system with real-time updates, notifications, and progress tracking.",
            link: "#"
        }
    ],
    
    // Services
    services: [
        {
            title: "Web Development",
            icon: "fas fa-laptop-code",
            description: "Creating modern, responsive websites and web applications tailored to your needs."
        },
        {
            title: "Mobile App Development",
            icon: "fas fa-mobile-alt",
            description: "Building native and cross-platform mobile applications for iOS and Android."
        },
        {
            title: "UI/UX Design",
            icon: "fas fa-palette",
            description: "Designing intuitive user interfaces and experiences that engage and delight users."
        },
        {
            title: "Database Design",
            icon: "fas fa-database",
            description: "Creating efficient and scalable database architectures for your applications."
        },
        {
            title: "API Development",
            icon: "fas fa-plug",
            description: "Building robust RESTful APIs for seamless integration with third-party services."
        },
        {
            title: "Data Analysis",
            icon: "fas fa-chart-line",
            description: "Analyzing and visualizing data to help you make informed business decisions."
        }
    ],
    
    // Testimonials
    testimonials: [
        {
            name: "Rahul Sharma",
            position: "Project Manager, TechInnovate Solutions",
            avatar: "./profile.jpg",
            text: "Abhik is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are impressive."
        },
        {
            name: "Priya Patel",
            position: "Founder, StyleHub Boutique",
            avatar: "./profile.jpg",
            text: "Working with Abhik was a great experience. He understood our requirements perfectly and delivered a website that exceeded our expectations."
        },
        {
            name: "Dr. Anand Kumar",
            position: "Professor, Brainware University",
            avatar: "./profile.jpg",
            text: "Abhik is a dedicated student with exceptional technical skills. His projects demonstrate creativity and a deep understanding of software development principles."
        }
    ],
    
    // Contact Information
    contact: {
        email: "abhik.das@example.com",
        phone: "+91 98765 XXXXX",
        description: "Feel free to contact me for any project inquiries or collaboration opportunities. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."
    },
    
    // Social Media
    social: [
        { platform: "GitHub", url: "https://github.com/", icon: "fab fa-github" },
        { platform: "LinkedIn", url: "https://linkedin.com/", icon: "fab fa-linkedin-in" },
        { platform: "Twitter", url: "https://twitter.com/", icon: "fab fa-twitter" },
        { platform: "Instagram", url: "https://instagram.com/", icon: "fab fa-instagram" },
        { platform: "Facebook", url: "https://facebook.com/", icon: "fab fa-facebook-f" }
    ]
};
