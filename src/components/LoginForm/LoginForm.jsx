import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewUser, logInUserHandler } from "../../store/signupReducer";
import { authStorage } from "../../utility/authStorage";
import "../../assets/css/loginForm.css";
export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signupDetails = useSelector((state) => state.signupFormData);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [formName, setFormName] = useState("LoginForm");
  const containerRef = useRef(null);
  function onSubmit(data) {
    if (formName == "SignupForm") {
      dispatch(addNewUser(data)).then((result) => {
        if (result.type === "signupFormReducer/addNewUser/fulfilled") {
          authStorage.saveUID(result.payload.uid);
          navigate("/Home");
        }
      });
    } else if (formName == "LoginForm") {
      dispatch(logInUserHandler(data)).then((result) => {
        if (result.type === "signupFormReducer/logInUserHandler/fulfilled") {
          authStorage.saveUID(result.payload.uid);
          navigate("/Home");
        }
      });
    }
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
