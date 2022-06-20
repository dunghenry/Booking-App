import { useState } from 'react'
import { Link } from 'react-router-dom';
import './register.scss'
import { registerEmailAndPassword } from '../../store/reducers/authSlice'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify'
import { validateRegister } from '../../utils/validate';
import { useSelector } from 'react-redux/es/exports';
import Loading from '../../components/global/Loading'
import {useNavigate} from 'react-router-dom'
const Register = () => {
  const {loading} = useSelector((state) => ({ ...state.auth }));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { name, email, password, confirmPassword }
    const result = validateRegister(user)
    if (result.errLength) {
      toast.error(result.errMsg[0])
    }
    dispatch(registerEmailAndPassword({ user, toast, navigate }))
    setEmail("")
    setName("")
    setPassword("")
    setConfirmPassword("")
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
            onChange={(e) => setConfirmPassword(e.target.value)}
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
      {loading && <Loading/> }
      
    </div>
  )
}

export default Register