import React from 'react'
import About from '../MajorComponents/Hero/Hero'
import Skills from '../MajorComponents/Skills/Skills'
import Experience from '../MajorComponents/Experience/Experience'
import Contact from '../MajorComponents/Contact/Contact'
import Projects from '../MajorComponents/Projects/Projects'
import Footer from '../MajorComponents/Footer/Footer'
import Education from '../MajorComponents/Education/Education'
import Navigation from '../MajorComponents/Navigation/Navigation'
import Intro from '../MajorComponents/IntroduceMyself/IntroduceMyself'

function AllComponentContainer() {
    return (
        <>
            <Navigation/>
            <div id="home"><About /></div>            
            <div id="about"><Intro /></div>
            <div id="skills"><Skills /></div>
            <div id="projects"><Projects /></div>
            <div id="experience"><Experience /></div>
            <div id="education"><Education /></div>
            <div id="contact"><Contact /></div>
            <Footer />
        </>
    );
}


export default AllComponentContainer