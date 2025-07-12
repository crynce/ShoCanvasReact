import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addNewUser, logInUserHandler } from "../../store/signupReducer";
import { useNavigate } from "react-router-dom";
import "../../assets/css/loginForm.css";
export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [formName, setFormName] = useState("LoginForm");
  const containerRef = useRef(null);
  function onSubmit(data) {
    console.log(data, formName, "data");
    formName == "SignupForm" && dispatch(addNewUser({signupCreds:data, navigate}));
    formName == "LoginForm" && dispatch(logInUserHandler({signupCreds:data, navigate}));
  }
  function handleAnimation() {
    if (containerRef.current) {
      containerRef.current.classList.add("animateBar");
      setTimeout(() => {
        if (formName == "LoginForm") {
          setFormName("SignupForm");
        }
        if (formName == "SignupForm") {
          setFormName("LoginForm");
        }
      }, 1100);
      setTimeout(() => {
        containerRef.current.classList.remove("animateBar");
      }, 2200);
    }
  }
  console.log(watch("EmailID"));
  console.log(errors);
  return (
    <div ref={containerRef} className="loginFormContainer">
      <div className="leftSide">
        <h2 className="WelcomeBack">
          {formName == "LoginForm" ? "Welcome Back !" : "Draw Anything"}
        </h2>
        <div className="glyphGifLoginForm">
          <div className="firstEye"></div>
          <div className="secondEye"></div>
          <div className="thirdEye"></div>
        </div>
        <div className="askForSignUp">
          <p className="signupQuestion">
            {formName == "LoginForm"
              ? "Don't have an Account?"
              : "Already have an account?"}
          </p>
          <button className="openSignupForm" onClick={handleAnimation}>
            {formName == "LoginForm" ? "Sign Up" : "Log In"}
          </button>
        </div>
      </div>
      <div className="rightSide">
        <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="EmailID">Email ID</label>
          <input
            id="EmailID"
            {...register("EmailID", {
              required: { value: true, message: "Email is required" },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.EmailID && (
            <p style={{ color: "white" }}>{errors.EmailID.message}</p>
          )}
          <label htmlFor="Password">Password</label>
          <input
            id="Password"
            {...register("Password", { required: true })}
            type="password"
          />
          {errors.password && <p style={{ color: "white" }}>Required</p>}

          <button className="loginFormSubmitButton" type="submit">
            {formName == "LoginForm" ? "Log In" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
