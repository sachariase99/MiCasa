// Importing necessary hooks and Supabase client
import { useState, useEffect } from "react"; // Import hooks
import { useSupabase } from "../supabase/supabaseClient"; // Import Supabase client

// Custom hook for fetching employee data
const useEmployees = () => {
  const { supabase } = useSupabase(); // Get Supabase client instance
  const [employees, setEmployees] = useState([]); // State to hold employee data, initialized as an empty array
  const [loading, setLoading] = useState(true); // State to manage loading status, initialized to true
  const [error, setError] = useState(null); // State to hold error messages, initialized as null

  // useEffect to fetch employee data when the component mounts or supabase changes
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        // Query the 'employees' table and select all columns
        const { data: employeesData, error: employeesError } = await supabase
          .from('employees') // Accessing the 'employees' table
          .select('*'); // Selecting all columns in the table

        if (employeesError) throw employeesError; // Throw error if there is any fetching error

        setEmployees(employeesData); // Set the fetched employee data into state
      } catch (error) {
        setError(error.message); // Capture and set error message if any
      } finally {
        setLoading(false); // Set loading to false after data fetching is complete
      }
    };

    fetchEmployees(); // Call the fetch function to initiate data fetching
  }, [supabase]); // Dependency array: the effect runs when the 'supabase' instance changes

  // Return employee data, loading status, and any error messages
  return { employees, loading, error }; 
};

// Exporting the useEmployees hook for use in other components
export default useEmployees;
