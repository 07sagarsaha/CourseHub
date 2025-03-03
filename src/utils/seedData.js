import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

// Sample course data
const sampleCourses = [
  {
    name: "React Fundamentals",
    instructor: "John Doe",
    description:
      "Learn the fundamentals of React, including components, state, props, and hooks. This course will give you a solid foundation in modern React development.",
    enrollmentStatus: "Open",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    duration: "8 weeks",
    schedule: "Tuesdays and Thursdays, 7-9 PM",
    location: "Online",
    prerequisites: ["Basic JavaScript knowledge", "HTML and CSS fundamentals"],
    syllabus: [
      {
        week: 1,
        topic: "Introduction to React",
        content:
          "Overview of React, setting up development environment, creating your first React app.",
      },
      {
        week: 2,
        topic: "Components and Props",
        content:
          "Understanding functional and class components, passing data with props, component composition.",
      },
      {
        week: 3,
        topic: "State and Lifecycle",
        content:
          "Managing state in components, component lifecycle methods, handling events.",
      },
      {
        week: 4,
        topic: "Hooks",
        content:
          "Introduction to React Hooks, useState, useEffect, custom hooks.",
      },
      {
        week: 5,
        topic: "Routing",
        content:
          "Client-side routing with React Router, navigation, route parameters.",
      },
      {
        week: 6,
        topic: "Forms and Validation",
        content:
          "Handling forms in React, controlled components, form validation.",
      },
      {
        week: 7,
        topic: "Context API",
        content:
          "Global state management with Context API, creating and consuming context.",
      },
      {
        week: 8,
        topic: "Final Project",
        content:
          "Building a complete React application, code review, deployment.",
      },
    ],
    studentsEnrolled: [],
    likes: [],
    enrolledAt: new Date().toLocaleDateString(),
  },
  {
    name: "Advanced JavaScript",
    instructor: "Jane Smith",
    description:
      "Take your JavaScript skills to the next level with this advanced course covering closures, prototypes, async programming, and modern ES6+ features.",
    enrollmentStatus: "Open",
    thumbnail:
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    duration: "6 weeks",
    schedule: "Mondays and Wednesdays, 6-8 PM",
    location: "Online",
    prerequisites: [
      "Intermediate JavaScript knowledge",
      "Basic understanding of web development",
    ],
    syllabus: [
      {
        week: 1,
        topic: "JavaScript Deep Dive",
        content:
          "Execution context, call stack, memory management, and garbage collection.",
      },
      {
        week: 2,
        topic: "Closures and Scope",
        content:
          "Understanding closures, lexical scope, practical applications of closures.",
      },
      {
        week: 3,
        topic: "Prototypes and Inheritance",
        content:
          "Prototype chain, inheritance patterns, ES6 classes vs prototypes.",
      },
      {
        week: 4,
        topic: "Asynchronous JavaScript",
        content:
          "Callbacks, promises, async/await, handling concurrent operations.",
      },
      {
        week: 5,
        topic: "Modern JavaScript Features",
        content:
          "ES6+ features, destructuring, spread/rest operators, modules, template literals.",
      },
      {
        week: 6,
        topic: "Performance Optimization",
        content:
          "Memory leaks, optimization techniques, debugging, performance testing.",
      },
    ],
    studentsEnrolled: [],
    likes: [],
    enrolledAt: new Date().toLocaleDateString(),
  },
  {
    name: "Node.js Backend Development",
    instructor: "Michael Johnson",
    description:
      "Learn to build scalable and robust backend applications with Node.js, Express, and MongoDB. This course covers RESTful API design, authentication, and deployment.",
    enrollmentStatus: "Open",
    thumbnail:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    duration: "10 weeks",
    schedule: "Fridays, 6-9 PM",
    location: "Online",
    prerequisites: [
      "JavaScript fundamentals",
      "Basic understanding of HTTP and APIs",
    ],
    syllabus: [
      {
        week: 1,
        topic: "Introduction to Node.js",
        content: "Node.js architecture, npm, creating a basic server.",
      },
      {
        week: 2,
        topic: "Express.js Fundamentals",
        content: "Setting up Express, routing, middleware, error handling.",
      },
      {
        week: 3,
        topic: "RESTful API Design",
        content:
          "REST principles, designing endpoints, status codes, API documentation.",
      },
      {
        week: 4,
        topic: "Database Integration",
        content: "MongoDB setup, Mongoose ODM, CRUD operations.",
      },
      {
        week: 5,
        topic: "Authentication and Authorization",
        content: "JWT, passport.js, implementing auth flows.",
      },
      {
        week: 6,
        topic: "Error Handling and Validation",
        content: "Robust error handling, input validation, sanitization.",
      },
      {
        week: 7,
        topic: "File Uploads and Processing",
        content: "Handling file uploads, image processing, storage solutions.",
      },
      {
        week: 8,
        topic: "Testing Node.js Applications",
        content: "Unit testing, integration testing, test-driven development.",
      },
      {
        week: 9,
        topic: "Deployment and DevOps",
        content: "Deploying Node.js apps, CI/CD, monitoring and logging.",
      },
      {
        week: 10,
        topic: "Final Project",
        content:
          "Building a complete backend application, code review, optimization.",
      },
    ],
    studentsEnrolled: [],
    likes: [],
    enrolledAt: new Date().toLocaleDateString(),
  },
  {
    name: "UI/UX Design Fundamentals",
    instructor: "Sarah Williams",
    description:
      "Master the principles of user interface and user experience design. Learn to create intuitive, accessible, and visually appealing digital products.",
    enrollmentStatus: "Closed",
    thumbnail:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
    duration: "8 weeks",
    schedule: "Tuesdays and Thursdays, 5-7 PM",
    location: "Online",
    prerequisites: [
      "Basic design knowledge",
      "Familiarity with design tools is a plus",
    ],
    syllabus: [
      {
        week: 1,
        topic: "Introduction to UI/UX",
        content:
          "Understanding the difference between UI and UX, the design process, user-centered design.",
      },
      {
        week: 2,
        topic: "User Research",
        content:
          "Research methods, user personas, empathy mapping, journey mapping.",
      },
      {
        week: 3,
        topic: "Information Architecture",
        content: "Site mapping, content strategy, navigation patterns.",
      },
      {
        week: 4,
        topic: "Wireframing and Prototyping",
        content:
          "Low and high-fidelity wireframes, interactive prototypes, tools and techniques.",
      },
      {
        week: 5,
        topic: "Visual Design Principles",
        content:
          "Color theory, typography, layout, visual hierarchy, responsive design.",
      },
      {
        week: 6,
        topic: "Usability Testing",
        content:
          "Testing methodologies, analyzing results, iterating designs based on feedback.",
      },
      {
        week: 7,
        topic: "Accessibility and Inclusive Design",
        content:
          "Designing for all users, WCAG guidelines, assistive technologies.",
      },
      {
        week: 8,
        topic: "Final Project",
        content:
          "Designing a complete UI/UX project from research to high-fidelity prototype.",
      },
    ],
    studentsEnrolled: [],
    likes: [],
    enrolledAt: new Date().toLocaleDateString(),
  },
  {
    name: "Full Stack Web Development",
    instructor: "David Chen",
    description:
      "Comprehensive course covering both frontend and backend development. Learn to build complete web applications from scratch using modern technologies.",
    enrollmentStatus: "In Progress",
    thumbnail:
      "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    duration: "12 weeks",
    schedule: "Saturdays, 10 AM - 2 PM",
    location: "Online",
    prerequisites: [
      "Basic programming knowledge",
      "HTML, CSS, and JavaScript fundamentals",
    ],
    syllabus: [
      {
        week: 1,
        topic: "Web Development Overview",
        content:
          "Introduction to web development, internet fundamentals, client-server architecture.",
      },
      {
        week: 2,
        topic: "HTML and CSS Deep Dive",
        content:
          "Advanced HTML5 features, CSS3, responsive design, Flexbox and Grid.",
      },
      {
        week: 3,
        topic: "JavaScript Essentials",
        content: "Core JavaScript concepts, DOM manipulation, events, AJAX.",
      },
      {
        week: 4,
        topic: "Frontend Frameworks",
        content: "Introduction to React, components, state management.",
      },
      {
        week: 5,
        topic: "Backend Basics",
        content: "Node.js introduction, Express setup, routing, middleware.",
      },
      {
        week: 6,
        topic: "Database Design",
        content: "Database concepts, MongoDB, schema design, CRUD operations.",
      },
      {
        week: 7,
        topic: "API Development",
        content: "RESTful API design, authentication, security best practices.",
      },
      {
        week: 8,
        topic: "Frontend-Backend Integration",
        content:
          "Connecting React frontend with Node.js backend, state management.",
      },
      {
        week: 9,
        topic: "Testing and Debugging",
        content: "Unit testing, integration testing, debugging techniques.",
      },
      {
        week: 10,
        topic: "Deployment",
        content: "Deploying full stack applications, CI/CD, cloud services.",
      },
      {
        week: 11,
        topic: "Performance Optimization",
        content:
          "Frontend and backend optimization techniques, caching, lazy loading.",
      },
      {
        week: 12,
        topic: "Final Project",
        content: "Building and deploying a complete full stack application.",
      },
    ],
    studentsEnrolled: [],
    likes: [],
    enrolledAt: new Date().toLocaleDateString(),
  },
  {
    name: "Mobile App Development with React Native",
    instructor: "Emily Rodriguez",
    description:
      "Learn to build native mobile applications for iOS and Android using React Native. This course covers components, navigation, state management, and deployment.",
    enrollmentStatus: "Open",
    thumbnail:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    duration: "9 weeks",
    schedule: "Wednesdays and Fridays, 7-9 PM",
    location: "Online",
    prerequisites: [
      "React.js knowledge",
      "JavaScript fundamentals",
      "ES6+ features",
    ],
    syllabus: [
      {
        week: 1,
        topic: "Introduction to React Native",
        content:
          "Setting up development environment, React Native vs React, creating your first app.",
      },
      {
        week: 2,
        topic: "Core Components",
        content:
          "Understanding built-in components, styling, props and state in React Native.",
      },
      {
        week: 3,
        topic: "Navigation",
        content:
          "React Navigation, stack navigator, tab navigator, drawer navigator.",
      },
      {
        week: 4,
        topic: "User Interface",
        content:
          "Advanced styling, responsive layouts, animations, gesture handling.",
      },
      {
        week: 5,
        topic: "State Management",
        content: "Context API, Redux, local storage, managing app state.",
      },
      {
        week: 6,
        topic: "Native Device Features",
        content: "Camera, geolocation, push notifications, local storage.",
      },
      {
        week: 7,
        topic: "API Integration",
        content: "Fetching data, authentication, handling offline scenarios.",
      },
      {
        week: 8,
        topic: "Testing and Debugging",
        content: "Debugging tools, unit testing, end-to-end testing.",
      },
      {
        week: 9,
        topic: "Deployment",
        content:
          "Building for production, app store submission, CI/CD for mobile.",
      },
    ],
    studentsEnrolled: [],
    likes: [],
  },
  {
    name: "Cybersecurity Fundamentals",
    instructor: "Alex Johnson",
    description:
      "Learn the core principles of cybersecurity, including threat detection, prevention, and ethical hacking. Protect yourself and your systems from cyber attacks.",
    enrollmentStatus: "Open",
    thumbnail:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    duration: "7 weeks",
    schedule: "Mondays and Wednesdays, 8-10 PM",
    location: "Online",
    prerequisites: [
      "Basic computer knowledge",
      "Understanding of networking concepts",
    ],
    syllabus: [
      {
        week: 1,
        topic: "Introduction to Cybersecurity",
        content:
          "Overview of cybersecurity, common threats, security principles, and best practices.",
      },
      {
        week: 2,
        topic: "Network Security",
        content:
          "Understanding network protocols, firewalls, intrusion detection systems, and VPNs.",
      },
      {
        week: 3,
        topic: "Cryptography",
        content:
          "Encryption algorithms, hashing, digital signatures, and certificate authorities.",
      },
      {
        week: 4,
        topic: "Web Security",
        content:
          "Common web vulnerabilities, cross-site scripting (XSS), SQL injection, and authentication.",
      },
      {
        week: 5,
        topic: "Endpoint Security",
        content:
          "Securing desktops, laptops, and mobile devices, antivirus software, and endpoint detection and response (EDR).",
      },
      {
        week: 6,
        topic: "Incident Response",
        content:
          "Detecting and responding to security incidents, incident handling, and forensics.",
      },
      {
        week: 7,
        topic: "Ethical Hacking",
        content:
          "Introduction to ethical hacking, penetration testing, and vulnerability assessment.",
      },
    ],
    studentsEnrolled: [],
    likes: [],
    enrolledAt: new Date().toLocaleDateString(),
  },
  {
    name: "Data Science with Python",
    instructor: "Laura Davis",
    description:
      "Explore the world of data science with Python. Learn to analyze, visualize, and model data using popular libraries like NumPy, Pandas, and Scikit-learn.",
    enrollmentStatus: "Open",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    duration: "11 weeks",
    schedule: "Thursdays, 6-9 PM",
    location: "Online",
    prerequisites: ["Basic Python knowledge", "Understanding of statistics"],
    syllabus: [
      {
        week: 1,
        topic: "Introduction to Data Science",
        content:
          "Overview of data science, the data science process, and essential tools.",
      },
      {
        week: 2,
        topic: "NumPy",
        content:
          "Working with arrays, mathematical operations, and data manipulation.",
      },
      {
        week: 3,
        topic: "Pandas",
        content: "Data analysis with Pandas, data frames, and data cleaning.",
      },
      {
        week: 4,
        topic: "Data Visualization",
        content:
          "Creating visualizations with Matplotlib and Seaborn, and data storytelling.",
      },
      {
        week: 5,
        topic: "Machine Learning Fundamentals",
        content:
          "Introduction to machine learning, supervised vs unsupervised learning, and model evaluation.",
      },
      {
        week: 6,
        topic: "Linear Regression",
        content:
          "Building linear regression models, model evaluation, and feature selection.",
      },
      {
        week: 7,
        topic: "Classification",
        content:
          "Building classification models, logistic regression, and support vector machines.",
      },
      {
        week: 8,
        topic: "Clustering",
        content:
          "Clustering techniques, K-means clustering, and hierarchical clustering.",
      },
      {
        week: 9,
        topic: "Dimensionality Reduction",
        content: "Principal component analysis (PCA) and feature extraction.",
      },
      {
        week: 10,
        topic: "Model Selection and Evaluation",
        content:
          "Cross-validation, hyperparameter tuning, and model evaluation metrics.",
      },
      {
        week: 11,
        topic: "Final Project",
        content:
          "Building a complete data science project from data collection to model deployment.",
      },
    ],
    studentsEnrolled: [],
    likes: [],
    enrolledAt: new Date().toLocaleDateString(),
  },
  {
    name: "Cloud Computing with AWS",
    instructor: "Robert Green",
    description:
      "Learn to deploy and manage applications on the Amazon Web Services (AWS) cloud platform. Master the core services and best practices for cloud computing.",
    enrollmentStatus: "Open",
    thumbnail:
      "https://images.unsplash.com/photo-1690627931320-16ac56eb2588?q=80&w=2093&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    duration: "10 weeks",
    schedule: "Tuesdays, 6-9 PM",
    location: "Online",
    prerequisites: [
      "Basic computer knowledge",
      "Understanding of networking concepts",
    ],
    syllabus: [
      {
        week: 1,
        topic: "Introduction to Cloud Computing",
        content:
          "Overview of cloud computing, cloud service models, and AWS services.",
      },
      {
        week: 2,
        topic: "AWS Compute Services",
        content: "Amazon EC2, Auto Scaling, and Elastic Load Balancing.",
      },
      {
        week: 3,
        topic: "AWS Storage Services",
        content: "Amazon S3, Amazon EBS, and Amazon Glacier.",
      },
      {
        week: 4,
        topic: "AWS Database Services",
        content: "Amazon RDS, Amazon DynamoDB, and Amazon Redshift.",
      },
      {
        week: 5,
        topic: "AWS Networking Services",
        content: "Amazon VPC, Route 53, and Direct Connect.",
      },
      {
        week: 6,
        topic: "AWS Security Services",
        content: "IAM, AWS Shield, and AWS WAF.",
      },
      {
        week: 7,
        topic: "AWS Management Tools",
        content: "CloudWatch, CloudFormation, and CloudTrail.",
      },
      {
        week: 8,
        topic: "AWS Serverless Computing",
        content: "AWS Lambda, API Gateway, and Step Functions.",
      },
      {
        week: 9,
        topic: "AWS DevOps",
        content: "CI/CD with AWS CodePipeline, CodeBuild, and CodeDeploy.",
      },
      {
        week: 10,
        topic: "Final Project",
        content: "Deploying a complete application on AWS.",
      },
    ],
    studentsEnrolled: [],
    likes: [],
    enrolledAt: new Date().toLocaleDateString(),
  },
  {
    name: "Digital Marketing Strategies",
    instructor: "Karen White",
    description:
      "Learn the latest digital marketing strategies and techniques to promote your brand and reach your target audience online.",
    enrollmentStatus: "Open",
    thumbnail:
      "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    duration: "6 weeks",
    schedule: "Mondays and Wednesdays, 7-9 PM",
    location: "Online",
    prerequisites: [
      "Basic marketing knowledge",
      "Understanding of social media",
    ],
    syllabus: [
      {
        week: 1,
        topic: "Introduction to Digital Marketing",
        content: "Overview of digital marketing, channels, and strategies.",
      },
      {
        week: 2,
        topic: "Search Engine Optimization (SEO)",
        content: "Keyword research, on-page optimization, and link building.",
      },
      {
        week: 3,
        topic: "Social Media Marketing",
        content:
          "Social media platforms, content strategy, and community engagement.",
      },
      {
        week: 4,
        topic: "Email Marketing",
        content: "Email marketing campaigns, segmentation, and automation.",
      },
      {
        week: 5,
        topic: "Content Marketing",
        content: "Content creation, distribution, and measurement.",
      },
      {
        week: 6,
        topic: "Digital Advertising",
        content:
          "Pay-per-click (PPC) advertising, display advertising, and retargeting.",
      },
    ],
    studentsEnrolled: [],
    likes: [],
    enrolledAt: new Date().toLocaleDateString(),
  },
  {
    name: "Financial Accounting Principles",
    instructor: "Brian Clark",
    description:
      "Learn the fundamental principles of financial accounting and how to prepare and analyze financial statements.",
    enrollmentStatus: "Open",
    thumbnail:
      "https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    duration: "8 weeks",
    schedule: "Tuesdays and Thursdays, 7-9 PM",
    location: "Online",
    prerequisites: ["Basic math skills", "Understanding of business concepts"],
    syllabus: [
      {
        week: 1,
        topic: "Introduction to Financial Accounting",
        content:
          "Overview of financial accounting, accounting principles, and the accounting equation.",
      },
      {
        week: 2,
        topic: "The Accounting Cycle",
        content:
          "The accounting cycle, journal entries, and the general ledger.",
      },
      {
        week: 3,
        topic: "The Income Statement",
        content:
          "Preparing the income statement, revenue recognition, and expense recognition.",
      },
      {
        week: 4,
        topic: "The Balance Sheet",
        content:
          "Preparing the balance sheet, assets, liabilities, and equity.",
      },
      {
        week: 5,
        topic: "The Statement of Cash Flows",
        content:
          "Preparing the statement of cash flows, operating activities, investing activities, and financing activities.",
      },
      {
        week: 6,
        topic: "Financial Statement Analysis",
        content:
          "Analyzing financial statements, ratio analysis, and trend analysis.",
      },
      {
        week: 7,
        topic: "Accounting for Inventory",
        content:
          "Accounting for inventory, cost of goods sold, and inventory valuation methods.",
      },
      {
        week: 8,
        topic: "Accounting for Long-Term Assets",
        content:
          "Accounting for long-term assets, depreciation, and amortization.",
      },
    ],
    studentsEnrolled: [],
    likes: [],
    enrolledAt: new Date().toLocaleDateString(),
  },
  {
    name: "Project Management Essentials",
    instructor: "Jessica Lee",
    description:
      "Learn the essential principles and techniques of project management to plan, execute, and control projects effectively.",
    enrollmentStatus: "Open",
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1706259481452-f857c96ceaca?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    duration: "9 weeks",
    schedule: "Wednesdays, 6-9 PM",
    location: "Online",
    prerequisites: ["Basic business knowledge", "Understanding of teamwork"],
    syllabus: [
      {
        week: 1,
        topic: "Introduction to Project Management",
        content:
          "Overview of project management, project life cycle, and project management processes.",
      },
      {
        week: 2,
        topic: "Project Planning",
        content: "Project scope, project schedule, and project budget.",
      },
      {
        week: 3,
        topic: "Project Execution",
        content: "Project execution, team management, and communication.",
      },
      {
        week: 4,
        topic: "Project Monitoring and Control",
        content: "Project monitoring, project control, and change management.",
      },
      {
        week: 5,
        topic: "Risk Management",
        content:
          "Risk identification, risk analysis, and risk response planning.",
      },
      {
        week: 6,
        topic: "Quality Management",
        content: "Quality planning, quality assurance, and quality control.",
      },
      {
        week: 7,
        topic: "Procurement Management",
        content:
          "Procurement planning, procurement execution, and contract management.",
      },
      {
        week: 8,
        topic: "Stakeholder Management",
        content:
          "Stakeholder identification, stakeholder analysis, and stakeholder engagement.",
      },
      {
        week: 9,
        topic: "Project Closure",
        content: "Project closure, project evaluation, and lessons learned.",
      },
    ],
    studentsEnrolled: [],
    likes: [],
    enrolledAt: new Date().toLocaleDateString(),
  },
];

const coursesCollection = collection(db, "courses");

const addCourseToFirestore = async (course) => {
  const q = query(coursesCollection, where("name", "==", course.name));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    await addDoc(coursesCollection, course);
    console.log(`Course "${course.name}" added to Firestore.`);
  } else {
    console.log(`Course "${course.name}" already exists in Firestore.`);
  }
};

const seedSampleCourses = async () => {
  for (const course of sampleCourses) {
    await addCourseToFirestore(course);
  }
};

// Call the function to seed the courses
seedSampleCourses();
export default seedSampleCourses;
