import { useDispatch } from "react-redux";
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
    <nav className="flex justify-between items-center h-16 bg-black text-white px-4 font-bitcount">
      <div className="flex items-center flex-1">
        <h1 className="text-2xl font-semibold">Sho-Canvas</h1>
        <sub className="ml-20 text-sm">Draw anyThing</sub>
      </div>
      <div className="relative group cursor-pointer">
        <div className="w-10 h-10 hover:scale-110 transition-transform"></div>
        <ul className="hidden group-hover:block absolute top-full right-0 bg-black list-none p-0 m-0 rounded-lg min-w-[140px] z-9999 shadow-lg">
          <li
            className="px-4 py-2 text-white hover:bg-gray-200 hover:text-black transition-colors duration-200 rounded cursor-pointer font-normal text-base"
            onClick={handleLogout}
          >
            Sign out
          </li>
        </ul>
      </div>
    </nav>
  );
}
