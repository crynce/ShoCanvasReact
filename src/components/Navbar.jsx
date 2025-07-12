import "../assets/css/canvas.css";
import UserIcon from "../assets/images/iconmonstr-user-6.svg";

export default function Navbar() {
  return (
    <nav className="navbarCont">
      <div className="taglineContainer">
        <h1 className="canvasBrandName">Sho-Canvas</h1>
        <sub className="subscript">Draw anyThing</sub>
      </div>
      <div className="userProfileIconCont"></div>
    </nav>
  );
}
