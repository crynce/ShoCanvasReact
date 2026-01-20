import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import LoginForm from "./components/LoginForm/LoginForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <LoginForm />
    </div>
  );
}

export default App;
