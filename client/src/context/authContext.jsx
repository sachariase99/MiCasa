import { createContext, useState, useEffect } from "react"; // Import necessary hooks and context
import { useSupabase } from "../supabase/supabaseClient"; // Import custom hook for Supabase client

// Create an AuthContext to manage authentication state
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { supabase } = useSupabase(); // Access the Supabase client from the custom hook
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [userId, setUserId] = useState(null); // State to store the user's ID
  const [userEmail, setUserEmail] = useState(null); // State to store the user's email

  useEffect(() => {
    if (!supabase) return; // Check if Supabase client is available

    // Function to check the current session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession(); // Get the current session
        if (session && session.user) {
          setIsLoggedIn(true); // User is logged in
          setUserId(session.user.id); // Set user ID
          setUserEmail(session.user.email); // Set user email
        }
      } catch (error) {
        console.error("Error checking session:", error.message); // Log any errors
      }
    };

    checkSession(); // Check the session on mount

    // Listen for authentication state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session && session.user) {
          setIsLoggedIn(true); // Update state if user is logged in
          setUserId(session.user.id); // Update user ID
          setUserEmail(session.user.email); // Update user email
        } else {
          setIsLoggedIn(false); // User is logged out
          setUserId(null); // Clear user ID
          setUserEmail(null); // Clear user email
        }
      }
    );

    // Cleanup the listener on component unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  // Login function to update state when user logs in
  const login = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  // Logout function to handle user sign out
  const logout = async () => {
    await supabase.auth.signOut(); // Sign out from Supabase
    setIsLoggedIn(false); // Update login status
    setUserId(null); // Clear user ID
    setUserEmail(null); // Clear user email
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, userEmail, login, logout }}>
      {children} {/* Render children components that can access this context */}
    </AuthContext.Provider>
  );
};
