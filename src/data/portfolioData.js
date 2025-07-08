
// Tech stack data with proper logos
export const techStackData = [
  {
    name: "HTML5",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
  },
  {
    name: "CSS3",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
  },
  {
    name: "Next.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
  },
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
  },
  {
    name: "Express",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"
  },
  {
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
  },
  {
    name: "Tailwind CSS",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/tailwindcss.svg"
  },
  {
    name: "Vite",
    logo: "https://vitejs.dev/logo.svg"
  }
];

// Projects data
export const projects = [
     {
    title: "SignFlow",
    image: "/assets/Screenshot 2025-07-08 144458.png",
    description: "This project is a secure document management and digital signing platform that enables users to handle their PDF workflows seamlessly. It features robust user authentication with JWT tokens, allowing users to register, log in, and reset passwords securely. Users can upload, view, download, and delete PDF documents within the platform, with strict file type and size restrictions ensuring reliability and safety.Integrated digital signature capabilities allow users to add and manage signature fields on their documents, making agreements and approvals fully electronic and efficient. The system also sends automated email notifications for signing requests and password resets, enhancing user engagement and workflow automation without manual follow-ups.",




    technologies: ["React.js", "Tailwind CSS", "React DnD","Axios ","React Router","Node.js + Express.js ", "MongoDB + Mongoose","JWT + bcrypt"],
    link: "https://document-sign-app.vercel.app/",
    repoLink: "https://github.com/ankan-barik/document-sign-app",
    techCount: 8,
    featureCount: 5,
    features: [
      


      " 👤 User Authentication",


      "🗂️ File Handling",

      
      "✍️ Digital Signatures",
      "📧 Email Notifications",
      "📥 Download & Print",

    ]
  },
   {
    title: "Track Zen",
    image: "/assets/Screenshot 2025-06-23 201634.png",
    description: "An advanced, full-stack issue tracking platform inspired by Jira and Linear, built using the MERN stack. This project empowers teams to manage software bugs, feature requests, and development tasks using Kanban boards, role-based collaboration, and real-time ticket updates. It reflects real-world SaaS and enterprise dashboard use cases with JWT-based auth, project and team management, and responsive UI.",




    technologies: ["React.js", "Tailwind CSS", "React DnD","Axios ","React Router","Node.js + Express.js ", "MongoDB + Mongoose","JWT + bcrypt"],
    link: "https://bug-tracker-pearl.vercel.app/",
    repoLink: "https://github.com/ankan-barik/bug-tracker",
    techCount: 8,
    featureCount: 5,
    features: [
      


      "🔐 Secure Authentication",


      "📁 Project & Team Management",

      
      "🧩 Kanban Board with Drag & Drop",
      "🎯 Ticket Filtering & Search",
      "📱 Responsive & Mobile-First UI",

    ]
  },
    {
    title: "Expensia",
    image: "/assets/Screenshot 2025-05-27 152310.png",
    description: "Built a full-stack personal finance tracker with secure JWT authentication and RESTful APIs to manage user-specific income/expense data, including user registration and login with persistent data in MongoDB.Integrated Recharts for live bar and pie charts to visualize category-wise and monthly spending trends.Deployed both frontend and backend on Vercel, with a mobile-first responsive UI, protected routes, and dynamic state management.",


    technologies: ["React.js", "Tailwind CSS", "Node.js + Express.js ", "MongoDB + Mongoose","JWT","Recharts"],
    link: "https://grow-wealth-chi.vercel.app/",
    repoLink: "https://github.com/ankan-barik/grow-wealth",
    techCount: 6,
    featureCount: 5,
    features: [
      
"🛠️ Full-Stack Development",

      "🔐 User Auth & Data Security",


      "📊 Real-Time Charts & Insights",

      "📱 Responsive & Mobile-First UI",
      "🚀 Deployment & Environment Setup",

    ]
  },
  {
    title: "PrintFusion AI",
    image: "/assets/Screenshot 2025-04-07 011848.png",
    description: "A customized e-commerce platform for personalized T-Shirts and gifts, featuring an AI-powered 'Create Design' section for AI-generated designs, color customization, and downloads.",
    technologies: ["React", "JavaScript", "Tailwind CSS"],
    link: "https://print-fusion-ai.vercel.app/",
    repoLink: "https://github.com/ankan-barik/printFusion_AI",
    techCount: 3,
    featureCount: 4,
    features: [
      "🎨 Customize the design content as needed",
      "🤖 Create AI-generated designs instantly",
      "🟡 Set custom color options for all products",
      "📥 High-resolution design downloads"
    ]
  },
  {
    title: "Diamond Price Prediction",
    image: "/assets/Screenshot 2025-04-06 183744.png",
    description: "Implemented dynamic input forms for users to enter diamond attributes (carat, cut, color, clarity, width, length etc.), with real-time validation and responsiveness.",
    technologies: ["Python", "Flask", "Machine Learning", "JavaScript", "React.js", "Tailwind CSS"],
    link: "https://diamond-price-predictor-gold.vercel.app/",
    repoLink: "https://github.com/ankan-barik/diamond-price-predictor",
    techCount: 6,
    featureCount: 5,
    features: [
      "💰 Real-time price estimation based on attributes",
      "🧩 Interactive attribute selection interface",
      "📉 Historical price comparison charts",
      "📊 Market value analysis with trend predictions",
      "📱 Mobile responsive design for on-the-go appraisals"
    ]
  },
  {
    title: "Cryptoscape Pulse Watch",
    image: "/assets/Screenshot 2025-05-08 210036.png",
    description: "Fetches live crypto prices (from an API like CoinGecko, CoinMarketCap, etc.) Displays updates in real-time or at intervals. Show charts, trends, and asset names.",
    technologies: ["React.js", "Tailwind CSS", "TypeScript", "Redux Toolkit", "JavaScript"],
    link: "https://cryptoscape-pulse-watch.vercel.app/",
    repoLink: "https://github.com/ankan-barik/cryptoscape-pulse-watch",
    techCount: 5,
    featureCount: 4,
    features: [
      "🔄 Fetches live cryptocurrency prices using APIs like CoinGecko or CoinMarketCap.",
      "📈 Displays real-time or interval-based updates for selected assets.",
      "📊 Visualizes market data with dynamic charts to show trends over time.",
      "🪙 Shows key asset details including name, symbol, price, and 24h change."
    ]
  },
  {
    title: "Weather Sphere",
    image: "/assets/Screenshot 2025-04-27 132016.png",
    description: "Displays live temperature, humidity, visibility, wind speed, sunrise/sunset timings for any searched location, and well-structured weather cards for easy navigation.",
    technologies: ["React.js", "Weather API", "Tailwind CSS", "JavaScript"],
    link: "https://weather-dashboard-iota-tan.vercel.app/",
    repoLink: "https://github.com/ankan-barik/Weather-Dashboard",
    techCount: 4,
    featureCount: 4,
    features: [
      "🌍 Real-time weather updates for any location",
      "🌡️ Comprehensive weather metrics display",
      "📆 7-day forecast with hourly breakdowns",
      "🌅 Sunrise/sunset and moon phase tracking"
    ]
  },
 

  {
    title: "Jungle Slither Game",
    image: "/assets/Screenshot 2025-04-02 161747.png",
    description: "Implemented optimized Game Mechanics including collision detection, responsive design, and high-score saving for an enhanced user experience.",
    technologies: ["JavaScript", "HTML5", "CSS3", ],
    link: "https://jungle-slither-game.vercel.app/",
    repoLink: "https://github.com/ankan-barik/jungle-slither-game",
    techCount: 3,
    featureCount: 4,
    features: [
      "🎮 Multiple difficulty levels with increasing speed",
      "⚡ Special power-ups that change game mechanics",
      "🌍 Global and local leaderboards",
      "🌴 Custom jungle-themed visuals and sounds"
    ]
  },
  


];

// Certificates data
export const certificates = [
  {
    title: "SBI College Youth Ideathon",
    issuer: "State Bank of India",
    date: "April 2025",
    image: "/assets/WhatsApp Image 2025-05-13 at 00.19.13_8217a7b5.jpg"
  },
  {
    title: "Full Stack Development",
    issuer: "PW Skills",
    date: "May 2025",
    image: "/assets/Screenshot 2025-05-13 123000.png"
  },
  {
    title: "Backend Development",
    issuer: "PW Skills",
    date: "August 2024",
    image: "/assets/Screenshot 2025-05-13 122247.png"
  },
  {
    title: "Java",
    issuer: "Udemy",
    date: "August 2024",
    image: "/assets/Screenshot 2025-05-07 235645.png"
  }
];
