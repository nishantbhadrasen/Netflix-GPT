import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

const Header = () => {
  /**
   * Get the dispatch function from the Redux store.
   */
  const dispatch = useDispatch();

  /**
   * Get the navigate function from React Router.
   */
  const navigate = useNavigate();

  /**
   * Get the current user from the Redux store.
   */
  const user = useSelector((store) => store.user);

  /**
   * Handle sign out functionality.
   */
  const handleSignOut = () => {
    /**
     * Sign out the user using Firebase's signOut function.
     */
    signOut(auth)
      .then(() => {
        // Sign out successful, no action needed.
      })
      .catch((error) => {
        /**
         * If sign out fails, navigate to the error page.
         */
        navigate("/error");
      });
  };

  /**
   * Use the useEffect hook to set up an authentication state change listener.
   */
  useEffect(() => {
    /**
     * Set up an authentication state change listener using Firebase's onAuthStateChanged function.
     */
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        /**
         * If the user is authenticated, extract their details and add them to the Redux store.
         */
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid: uid, email, displayName, photoURL }));
        /**
         * Navigate to the browse page.
         */
        navigate("/browse");
      } else {
        /**
         * If the user is not authenticated, remove them from the Redux store.
         */
        dispatch(removeUser());
        /**
         * Navigate to the root page.
         */
        navigate("/");
      }
    });

    /**
     * Clean up the authentication state change listener when the component unmounts.
     * i.e Unsubscribe when the components unmounts
     */
    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" src={LOGO} alt="logo" />
      {user && (
        <div className="flex p-2">
          <img className="w-12 h-12 " alt="usericon" src={user?.photoURL} />
          <button onClick={handleSignOut} className="font-bold text-white">
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
