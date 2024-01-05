import NotesAppImg from "../../assets/ProjectsImages/NotesApp.png";
import RestaurantLandingImg from "../../assets/ProjectsImages/RestaurantLanding.png";
import TravelLandingImg from "../../assets/ProjectsImages/TravelLanding.png";
import DiceGameImg from "../../assets/ProjectsImages/DiceGame.png";
import BlogImg from "../../assets/ProjectsImages/blog.png"
import TodoImg from "../../assets/ProjectsImages/todoImg.png"

const projectsData = [
    {
        img: RestaurantLandingImg,
        title: "Restaurant Landing Page",
        content: "A feature-rich restaurant website with user authentication, delivery address management, live order tracking, daily discounts, and admin capabilities for editing the website and monitoring order statuses.",
        view: "https://hotmeals-restaurant.netlify.app/",
        code: "https://github.com/Emmanuel-Benjamin00/restaurant-landing-page"
    },
    {
        img: BlogImg,
        title: "Blog App",
        content: "A feature-rich blog website allowing user authentication, blog creation with admin approval, user dashboards, and token expiration, built with Reactjs for the frontend, Expressjs for the backend, and MongoDB for the database.",
        view: "https://bloginme.netlify.app/",
        code: "https://github.com/Emmanuel-Benjamin00/blog-app-frontend"
    },
    {
        img: TodoImg,
        title: "ToDo App",
        content: "A ToDo website with intuitive features such as ToDo input, categorized tabs, and status tracking, built using Reactjs for the frontend, Expressjs with React Redux for the backend, and MongoDB for the database.",
        view: "https://i-am-here-to-keep-your-notes.netlify.app/",
        code: "https://github.com/Emmanuel-Benjamin00/Todo-App"
    },
    {
        img: NotesAppImg,
        title: "Notes App",
        content: "A user-friendly Notepad website built with React and React Redux, offering features like note creation, note display in a card layout, and  editing and deletion capabilities. The front-end application provides a seamless experience for organizing your notes.",
        view: "https://emmanuel-notes-app-redux.netlify.app/home",
        code: "https://github.com/Emmanuel-Benjamin00/NotesApp-Redux"
    },
    {
        img: TravelLandingImg,
        title: "Travel Landing Page",
        content: "A visually appealing front-end webpage for the Bon Voyage Travel Landing Page, featuring service categories, top destinations, easy booking steps, and a convenient email subscription, built with HTML and CSS.",
        view: "https://unique-lolly-2479b3.netlify.app/",
        code: "https://github.com/Emmanuel-Benjamin00/Travel-Landing-Page"
    },
    {
      img: DiceGameImg,
      title: "Dice Game",
      content: "A dynamic Dice Game built with HTML, CSS, and JavaScript using Flexbox layout, where players take turns rolling the dice to reach 30 points and reset for a new game.",
      view: "https://dice-winner-2023.netlify.app/",
      code: "https://github.com/Emmanuel-Benjamin00/Dice-Game"
    }
];

export default projectsData