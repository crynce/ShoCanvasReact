import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewUser, logInUserHandler } from "../../store/signupReducer";
import { authStorage } from "../../utility/authStorage";
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
    <div
      ref={containerRef}
      className="h-[600px] w-[900px] border-4 border-white shadow-[0_0_30px_10px_rgba(255,255,255,0.5)] flex relative
        after:absolute after:bottom-0 after:left-[10%] after:w-[80%] after:h-1 after:bg-white after:opacity-100 after:transition-all after:duration-200
        [&.animateBar]:after:w-full [&.animateBar]:after:left-0 [&.animateBar]:after:animate-coverAndRetract"
    >
      <div
        className="w-1/2 flex flex-col justify-around relative
        after:absolute after:top-[10%] after:right-0 after:w-px after:h-[80%] after:bg-white"
      >
        <h2 className="mb-10 text-2xl font-bold text-white font-bitcount">
          {formName == "LoginForm" ? "Welcome Back !" : "Draw Anything"}
        </h2>
        <div className="w-full h-5 flex justify-evenly mb-10">
          <div className="h-full w-5 bg-white/95 animate-hzero"></div>
          <div
            className="h-full w-5 bg-white/95 animate-hzero"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="h-full w-5 bg-white/95 animate-hzero"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
        <div>
          <p className="text-white text-sm mb-2 font-bitcount">
            {formName == "LoginForm"
              ? "Don't have an Account?"
              : "Already have an account?"}
          </p>
          <button
            className="px-4 py-2 bg-white text-black rounded font-bitcount hover:bg-gray-200 transition-colors cursor-pointer"
            onClick={handleAnimation}
          >
            {formName == "LoginForm" ? "Sign Up" : "Log In"}
          </button>
        </div>
      </div>
      <div className="w-1/2 h-full flex items-center justify-center">
        <form
          className="flex flex-col w-3/5 font-bitcount"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="EmailID" className="text-white mb-2 text-sm">
            Email ID
          </label>
          <input
            id="EmailID"
            className="h-6 px-2 text-sm border border-white bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-white mb-4 font-bitcount"
            {...register("EmailID", {
              required: { value: true, message: "Email is required" },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.EmailID && (
            <p className="text-white text-sm mb-4">{errors.EmailID.message}</p>
          )}
          <label htmlFor="Password" className="text-white mb-2 text-sm">
            Password
          </label>
          <input
            id="Password"
            className="h-6 px-2 text-sm border border-white bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-white mb-4 font-bitcount"
            {...register("Password", { required: true })}
            type="password"
          />
          {errors.password && (
            <p className="text-white text-sm mb-4">Required</p>
          )}

          <button
            className="w-1/2 mx-auto px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors font-semibold font-bitcount"
            type="submit"
          >
            {formName == "LoginForm" ? "Log In" : "Sign In"}
          </button>
          <div className="hidden md:block mt-4">
            <p className="text-white text-sm mb-2 text-center font-bitcount">
              {formName == "LoginForm"
                ? "Don't have an Account?"
                : "Already have an account?"}
            </p>
            <button
              className="w-full px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors font-bitcount"
              onClick={handleAnimation}
            >
              {formName == "LoginForm" ? "Sign Up" : "Log In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
