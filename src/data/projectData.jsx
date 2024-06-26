import NotesAppImg from "../assets/ProjectsImages/NotesApp.png";
import RestaurantLandingImg from "../assets/ProjectsImages/RestaurantLanding.png";
import TravelLandingImg from "../assets/ProjectsImages/TravelLanding.png";
import BlogImg from "../assets/ProjectsImages/blog.png"
import TodoImg from "../assets/ProjectsImages/todoImg.png"
import ChatAppImg from "../assets/ProjectsImages/chat-app.png"
import ECommerceImg from "../assets/ProjectsImages/E-Commerce.png"

const projectsData = [
    {
        img: RestaurantLandingImg,
        title: "Restaurant Landing Page",
        content: "A feature-rich restaurant website with user authentication, delivery address management, live order tracking, daily discounts, and admin capabilities for editing the website and monitoring order statuses.",
        feCode: "https://github.com/Emmanuel-Benjamin00/restaurant-landing-page",
        beCode: "https://github.com/Emmanuel-Benjamin00/restaurant-landing-page-be",
        site: "https://hotmeals-restaurant.netlify.app/",
        userCredentials: [{
            email:"user@gmail.com",
            pass:"123"
        }],
        adminCredentials:{
            email:"admin@gmail.com",
            pass:"123"
        }
    },
    {
        img: ChatAppImg,
        title: "Chat Web Page",
        content: "A chat application facilitates user authentication, real-time communication via Socket.io, notification sounds, and online status tracking. It utilizes MongoDB for data storage, Express.js for server-side logic, React for the UI, Node.js for runtime, and Zustand for state management.",
        feCode: "https://github.com/Emmanuel-Benjamin00/Chat-App",
        beCode: "",
        site: "https://chat-app-si2s.onrender.com/",
        userCredentials: [
        {
            email:"user1@gmail.com",
            pass:"123456"
        },
        {
            email:"user2@gmail.com",
            pass:"123456"
        }],
    },
    {
        img: ECommerceImg,
        title: "E-Commerce Website",
        content: "A full-stack MERN ecommerce platform integrating Razorpay for secure online payments. Features user authentication, product, cart, and order management. Utilizes Redux, MongoDB, Express, and Node.js for seamless functionality.",
        feCode: "https://github.com/Emmanuel-Benjamin00/E-Commerce-Frontend",
        beCode: "https://github.com/Emmanuel-Benjamin00/E-Commerce-Backend",
        site: "https://e-shopper24.netlify.app/",
        userCredentials: [{
            email:"user@gmail.com",
            pass:"123456"
        }],        
        payment:"5267 3181 8797 5449"
    },
    {
        img: BlogImg,
        title: "Blog App",
        content: "A feature-rich blog website allowing user authentication, blog creation with admin approval, user dashboards, and token expiration, built with Reactjs for the frontend, Expressjs for the backend, and MongoDB for the database.",
        feCode: "https://github.com/Emmanuel-Benjamin00/blog-app-frontend",
        beCode: "https://github.com/Emmanuel-Benjamin00/blog-app-backend",
        site: "https://bloginme.netlify.app/",
        userCredentials: [{
            email:"user@gmail.com",
            pass:"123"
        }],
        adminCredentials:{
            email:"admin@gmail.com",
            pass:"123"
        }
    },
    // {
    //     img: TodoImg,
    //     title: "ToDo App",
    //     content: "A ToDo website with intuitive features such as ToDo input, categorized tabs, and status tracking, built using Reactjs for the frontend, Expressjs with React Redux for the backend, and MongoDB for the database.",
    //     feCode: "https://github.com/Emmanuel-Benjamin00/Todo-App",
    //     beCode: "https://github.com/Emmanuel-Benjamin00/todo-app-be",
    //     site: "https://i-am-here-to-keep-your-notes.netlify.app/"
    // },
    {
        img: NotesAppImg,
        title: "Notes App",
        content: "A user-friendly Notepad website built with React and React Redux, offering features like note creation, note display in a card layout, and  editing and deletion capabilities. The front-end application provides a seamless experience for organizing your notes.",
        feCode: "https://github.com/Emmanuel-Benjamin00/NotesApp",
        beCode: "",
        site: "https://notes-app-project-guvi.netlify.app/"
    },
    {
        img: TravelLandingImg,
        title: "Travel Landing Page",
        content: "A visually appealing front-end webpage for the Bon Voyage Travel Landing Page, featuring service categories, top destinations, easy booking steps, and a convenient email subscription, built with HTML and CSS.",
        feCode: "https://github.com/Emmanuel-Benjamin00/Travel-Landing-Page",
        beCode: "",
        site: "https://unique-lolly-2479b3.netlify.app/",
    },
];

export default projectsData