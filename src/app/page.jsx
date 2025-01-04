import React from 'react'
import Home from '../components/Home'
import About from '../components/About'
import Articles from './articles/page'
import Projects from './projects/page'

function page() {
  return (
    <>
    <Home/>
    <About/>
    <Projects/> 
    <Articles/> 
    </>
  )
}

export default page