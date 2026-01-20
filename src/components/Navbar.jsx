import { useDispatch } from "react-redux";
import "../assets/css/canvas.css";
import { getAuth, signOut } from "firebase/auth";
import { authStorage } from "../utility/authStorage";

export default function Navbar() {
  const dispatch = useDispatch();
  function handleLogout() {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        authStorage.clearStorage();
      })
      .catch((err) => {});
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
