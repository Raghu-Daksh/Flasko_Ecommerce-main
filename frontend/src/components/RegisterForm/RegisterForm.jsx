import { useState } from "react";
import { registerAuthentication } from "../../service/api";
import * as yup from "yup";
import './RegisterForm.css'
import { Link } from "react-router-dom";
import { registerUser } from "../../slices/authSlice";
import { useDispatch } from "react-redux";

const RegisterForm = () => {

  const dispatch = useDispatch()
const [formData, setFormData] = useState({
      firstname: "",
      lastname: "",
      email: "",
      phoneNo: null,
      age: null,
      gender: "",
      address: "",
      dob: "",
      password: "",
      confirmPassword: "",
  });

  const [errors, setErrors] = useState();
  const validateSchema = yup.object({
    firstname: yup.string().required("first name is required"),
    lastname: yup.string().required("last name is required"),
    email: yup.string().required("email is required").email("invaild email"),
    phoneNo: yup
      .string("phone number should be numric value")
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("phone number is required"),
    age: yup
      .number()
      .min(18, "age must be at least 18 year old")
      .max(80, "age must be less than 80 year old"),
    gender: yup.string().required("select gender"),
    address: yup.string().required("address is required"),
    dob: yup.date().required("date of birthday is required"),
    password: yup
      .string()
      .required("password is required")
      .min(8, "password must be at least 8 characters")
      .matches(/[!@#$%^&*(){}]/, "password must container at least one symbol")
      .matches(/[0-9]/, "password must contain at least one number")
      .matches(/[A-Z]/, "password must contain at least one capital letter")
      .matches(/[a-z]/, "password must contain at least one small letter"),
    confirmPassword: yup.string().oneOf([yup.ref("password")]),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      await validateSchema.validate(formData, { abortEarly: false });
      const data = await dispatch(registerUser(formData)).unwrap()
      console.log(data);
      
    } catch (error) {
      let newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };


  return (
<div className="register-wrapper">
  <div className="register-card">
    <form onSubmit={submitForm}>
      <h2 className="form-title">Create Account</h2>

      <div className="user-form-container">
        {[
          ["firstname", "First Name", "text"],
          ["lastname", "Last Name", "text"],
          ["email", "Email", "email"],
          ["phoneNo", "Phone No", "text"],
          ["age", "Age", "number"],
          ["address", "Address", "text"],
        ].map(([name, label, type]) => (
          <div className="user-form" key={name}>
            <label>{label}</label>
            <input
              type={type}
              name={name}
              placeholder={`Enter ${label}`}
              value={formData[name]}
              onChange={handleChange}
            />
            {errors && <p className="error">{errors[name]}</p>}
          </div>
        ))}

        <div className="user-form">
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors && <p className="error">{errors.gender}</p>}
        </div>

        <div className="user-form">
          <label>Date of Birth</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
          {errors && <p className="error">{errors.dob}</p>}
        </div>

        <div className="user-form">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
          {errors && <p className="error">{errors.password}</p>}
        </div>

        <div className="user-form">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors && <p className="error">{errors.confirmPassword}</p>}
        </div>
      </div>

      <button className="submit-btn">Register</button>
    </form>
    
        <div className="divider">
          <span>OR</span>
        </div>
     <p className="auth-footer">
              New to Flasko?{" "}
              <Link to="/login">Already have account? login</Link>
            </p>
  </div>
</div>
  );
};

export default RegisterForm;
