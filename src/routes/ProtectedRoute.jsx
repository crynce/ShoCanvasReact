import { onAuthStateChanged, getAuth } from "firebase/auth";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { app } from "../components/LoginForm/utility/firebaseConfig";
import { authStorage } from "../utility/authStorage";

export default function ProtectedRoute({ children }) {
  const [userID, setUserID] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const auth = getAuth(app);

  React.useEffect(() => {
    // First check localStorage for cached UID
    const cachedUID = authStorage.getUID();
    if (cachedUID) {
      setUserID(cachedUID);
      setLoading(false);
    }

    // Also listen to Firebase auth state changes for real-time updates
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const uid = user?.uid;
      if (uid) {
        setUserID(uid);
        authStorage.saveUID(uid); // Keep storage in sync
      } else {
        setUserID(null);
        authStorage.clearStorage(); // Clear if user logs out from other tab
      }
      setLoading(false);
      console.log(uid, "userID from auth");
    });

    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return <div>Loading...</div>; // Show loading while checking auth
  }

  return userID ? children : <Navigate to="/" />;
}
