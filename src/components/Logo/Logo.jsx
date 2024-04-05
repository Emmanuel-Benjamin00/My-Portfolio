import React from 'react'
import './Logo.css'

function Logo() {
    let openbrac = `<  `
    let closebrac = `/>`
    let logo = `Emmanuel Benjamin D`
  return (
   <><span className="bracs logo">{openbrac}</span><span className="logoName">{logo}</span><span className="bracs">{closebrac}</span></>
  )
}

export default Logo