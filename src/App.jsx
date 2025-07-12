import { useEffect } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm/LoginForm";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setAuthState } from "./store/authReducer";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user, "user still loggedIn");
        dispatch(
          setAuthState({
            email: user.email,
            uid: user.uid,
            name: user.displayName,
          })
        );
        navigate("/Home");
      } else {
        console.log("user Logged out");
      }
    });
    return () => {
      console.log("preinted");
      unsubscribe();
    };
  }, []);
  return (
    <>
      <LoginForm />
    </>
  );
}

export default App;
