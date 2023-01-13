import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>
    <div class="login-box">
      <h1>Login</h1>
      <form>
        <label>Email</label>
        <input type="email" placeholder="" />
        <label>Password</label>
        <input type="password" placeholder="" />
        <input type="button" value="Submit" />
      <closeform></closeform></form>
    </div>
    <p class="para-2">
      Don't have an account? <Link to={'/signup'}>Sign Up Here</Link>
    </p>
  </div>
  )
}

export default Login