import { useEffect } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm/LoginForm";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { fetchInitialData, setAuthState } from "./store/authReducer";
import { useNavigate, useLocation } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await dispatch(fetchInitialData(user.uid));
        navigate("/Home");
        console.log("useEffect");
        // }
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
