import React from 'react'

function Logo() {
    let openbrac = `<  `
    let closebrac = `  />`
    let logo = `Emmanuel Benjamin D`
  return (
   <><span className="bracs">{openbrac}</span><span className="logoName fs-2">{logo}</span><span className="bracs">{closebrac}</span></>
  )
}

export default Logo