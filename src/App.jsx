import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/MajorComponents/Navigation"
import Hero from './components/MajorComponents/Hero'
import Intro from './components/MajorComponents/IntroduceMyself'
import Skills from './components/MajorComponents/Skills'
import Education from './components/MajorComponents/Education'
import Portfolio from './components/MajorComponents/Projects'
import Contact from './components/MajorComponents/Contact'
import Footer from './components/MajorComponents/Footer'
import SkillChart from "./components/MajorComponents/SkillChart";



function App() {



  return (
    <div className="App" id="pagetodownload">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navigation />
                <Hero/>
                <Intro />
                <Skills />
                <SkillChart/>
                <Education />
                <Portfolio />
                <Contact />
                <Footer />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
