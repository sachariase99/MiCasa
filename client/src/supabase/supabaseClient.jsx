// Importing necessary functions from Supabase and React
import { createClient } from "@supabase/supabase-js"; // Function to create a Supabase client
import { createContext, useContext } from "react"; // Functions for creating and using context

// Initialize Supabase client once with the provided URL and API key
const supabaseUrl = import.meta.env.VITE_API_URL; // Getting Supabase URL from environment variables
const supabaseKey = import.meta.env.VITE_API_KEY; // Getting Supabase API key from environment variables

// Creating a Supabase client instance
const supabase = createClient(supabaseUrl, supabaseKey);

// Creating a Context for Supabase to allow access throughout the application
const SupabaseContext = createContext(); // Creating a context to hold the Supabase client

// SupabaseProvider component to wrap around the application for context availability
export const SupabaseProvider = ({ children }) => {
  return (
    <SupabaseContext.Provider value={{ supabase }}> {/* Providing the Supabase client to the context */}
      {children} {/* Rendering child components */}
    </SupabaseContext.Provider>
  );
};

// Custom hook to use the Supabase context in other components
export const useSupabase = () => useContext(SupabaseContext); // Hook to access the Supabase client from context
