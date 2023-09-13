import React from 'react'
import { Link } from 'react-router-dom'

function StartPage() {
  return (
    <>
    <h1>GAME NAME</h1>
    <Link to="/signup">signup</Link>
    <Link to="/login">login</Link>
    </>
  )
}

export default StartPage