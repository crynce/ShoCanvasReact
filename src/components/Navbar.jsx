import { useDispatch } from "react-redux";
import "../assets/css/canvas.css";
import { getAuth, signOut } from "firebase/auth";
import { clearAuthState } from "../store/authReducer";
import { authStorage } from "../utility/authStorage";

export default function Navbar() {
  const dispatch = useDispatch();
  console.log("navbar");
  function handleLogout() {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        authStorage.clearStorage(); // Clear UID from storage
        dispatch(clearAuthState());
        console.log("user signout successfully");
      })
      .catch((err) => {
        console.log("Error occured:" + err.message || err.status);
      });
  }
  return (
    <nav className="navbarCont">
      <div className="taglineContainer">
        <h1 className="canvasBrandName">Sho-Canvas</h1>
        <sub className="subscript">Draw anyThing</sub>
      </div>
      <div className="userProfileIconCont">
        <ul className="quickActionsNavbar" style={{ color: "red" }}>
          <li className="navbarSignout" onClick={handleLogout}>
            Sign out
          </li>
        </ul>
      </div>
    </nav>
  );
}
