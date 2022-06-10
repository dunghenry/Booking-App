import { useState } from 'react'
import { Link } from 'react-router-dom';
import './register.scss'
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div className="d-flex justify-content-center">
      <form onSubmit={handleSubmit} className="form">
      <div className="my-2">
          <label className="font-weight-bold">Name : &nbsp;&nbsp; </label>
          <br />
          <input
            className="rounded p-1"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name..."
          />
        </div>
        <div className="my-2">
          <label className="font-weight-bold">Email : &nbsp;&nbsp; </label>
          <br />
          <input
            className="rounded p-1"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email..."
          />
        </div>
        <div className="my-2">
          <label className="font-weight-bold">Password : &nbsp;&nbsp; </label>
          <br />
          <input
            className="rounded p-1"
            type="password"
            autoComplete="true"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password..."
          />
        </div>
        <div className="my-2">
          <label className="font-weight-bold">Confirm Password : &nbsp;&nbsp; </label>
          <br />
          <input
            className="rounded p-1"
            type="password"
            autoComplete="true"
            value={confirmPassword}
            onChange={(e) => confirmPassword(e.target.value)}
            placeholder="Confirm password..."
          />
        </div>
        <div className="mt-1">
          <Link to="/login">
            <p className="float-right">Do you have an account ? Login</p>
          </Link>
        </div>
        <div>
          <button className="btn btn-primary mt-1" type="submit">
            Register
          </button>
        </div>
        
      </form>
    </div>
  )
}

export default Register