import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { loginUserAuth } from "../../slices/authSlice";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
  });

  const onValueChange = (e) => {
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
  };

  const submitLoginForm = async () => {
    try {

      const response = await dispatch(loginUserAuth(userDetail)).unwrap()
      navigate('/')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">
          Login to continue to <strong>Flasko</strong>
        </p>

        <div className="auth-form">
          <div className="auth-input">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={onValueChange}
            />
          </div>

          <div className="auth-input">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={onValueChange}
            />
          </div>

          <p className="terms">
            By continuing, you agree to Flasko’s{" "}
            <span>Terms of Use</span> & <span>Privacy Policy</span>
          </p>

          <button className="auth-btn" onClick={submitLoginForm}>
            Login
          </button>
        </div>

        <div className="divider">
          <span>OR</span>
        </div>

        <p className="auth-footer">
          New to Flasko?{" "}
          <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
