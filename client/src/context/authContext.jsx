import { createContext, useState, useEffect } from "react";
import { useSupabase } from "../supabase/supabaseClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { supabase } = useSupabase();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    if (!supabase) return;

    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session && session.user) {
          setIsLoggedIn(true);
          setUserId(session.user.id);
          setUserEmail(session.user.email);
        }
      } catch (error) {
        console.error("Error checking session:", error.message);
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session && session.user) {
          setIsLoggedIn(true);
          setUserId(session.user.id);
          setUserEmail(session.user.email);
        } else {
          setIsLoggedIn(false);
          setUserId(null);
          setUserEmail(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  const login = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
  };
  
  const logout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUserId(null);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
