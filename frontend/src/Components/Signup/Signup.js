import React from 'react'
import '../Login/Login.css'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div><div class="signup-box">
    <h1>Sign Up</h1>
    <h4>It's free and only takes a minute</h4>
    <form>
      <label>First Name</label>
      <input type="text" placeholder="" />
      <label>Last Name</label>
      <input type="text" placeholder="" />
      <label>Email</label>
      <input type="email" placeholder="" />
      <label>Password</label>
      <input type="password" placeholder="" />
      <label>Confirm Password</label>
      <input type="password" placeholder="" />
      <input type="button" value="Submit" />
      <closeform></closeform></form>
    </div>
    <p class="para-2">
      Already have an account? <Link to={'/login'}>Login here</Link>
    </p>
  </div>
  )
}

export default SignUp