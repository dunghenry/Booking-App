import { useState, useEffect } from "react";
import "./login.scss";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginEmailAndPassword } from "../../store/reducers/authSlice";
import { useSelector } from "react-redux";
import validateEmail from "../../utils/validate";
const Login = () => {
  const { errors } = useSelector((state) => ({ ...state.auth }));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const user = { email, password };
    const result = validateEmail(email);
    if (!email) {
      toast.error("Email cannot be blank!");
    } else {
      if (result) {
        dispatch(loginEmailAndPassword({ user, navigate, toast }));
      } else {
        toast.error("Email invalid!");
      }
    }
  };
  useEffect(() => {
    errors && toast.error(errors[0]);
  }, [errors]);
  return (
    <div className="d-flex justify-content-center">
      <form onSubmit={handleLogin} className="form">
        <div className="my-3">
          <label className="font-weight-bold">Email : &nbsp;&nbsp; </label>
          <br />
          <input
            className="rounded p-1"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email..."
          />
        </div>
        <div>
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
        <div className="d-flex mt-2 justify-content-between">
          <div>
            <input
              className="float-left mt-2"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              type="checkbox"
            />
            <label className="remember">Remember me</label>
          </div>
          <div>
            <Link
              to="/forgot_password"
              className="text-decoration-none forgot_pass"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        <div>
          <button className="btn btn-primary mt-3" type="submit">
            Login
          </button>
        </div>
        <div>
          <button className="rounded login-google mt-4 btn btn-outline-danger">
            <i className="bi bi-google"></i>Login with Google
          </button>
        </div>
        <div>
          <button className="rounded mt-4 login-google btn btn-outline-primary">
            <i className="bi bi-facebook"></i>Login with Facebook
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
