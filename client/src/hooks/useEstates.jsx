// Import necessary hooks and Supabase client
import { useState, useEffect } from "react"; // Import hooks for state and side effects
import { useSupabase } from "../supabase/supabaseClient"; // Import Supabase client

// Custom hook for fetching estate data with optional search query
const useEstates = (query) => {
  const { supabase } = useSupabase(); // Get Supabase client instance
  const [estates, setEstates] = useState([]); // State to hold estate data, initialized as an empty array
  const [loading, setLoading] = useState(true); // State to manage loading status, initialized to true
  const [error, setError] = useState(null); // State to hold error messages, initialized as null

  // useEffect to fetch estate data when the component mounts or query changes
  useEffect(() => {
    const fetchEstates = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const searchQuery = query ? query.toLowerCase() : ""; // Convert query to lowercase for case-insensitive comparison

        // Query the 'estates' table and related tables for necessary fields
        const { data: estatesData, error: estatesError } = await supabase
          .from('estates') // Accessing the 'estates' table
          .select(`
            *,
            estate_image_rel (
              image_id,
              images (
                image_url
              )
            ),
            energy_labels (
              letter
            ),
            cities (
              name,
              zipcode
            ),
            estate_types (
              name
            ),
            employees (
              *
            )
          `);

        if (estatesError) throw estatesError; // Throw error if there is any fetching error

        // Filter estates based on the search query
        const filteredEstates = estatesData.filter(estate => {
          const addressMatch = estate.address?.toLowerCase().includes(searchQuery); // Check if address matches the query
          const cityMatch = estate.cities?.name?.toLowerCase().includes(searchQuery); // Check if city name matches the query
          const estateTypeMatch = estate.estate_types?.name?.toLowerCase().includes(searchQuery); // Check if estate type matches the query

          // Return true if any of the matches is found
          return addressMatch || cityMatch || estateTypeMatch;
        });

        // Transform the filtered estate data for easier use in components
        const transformedEstates = filteredEstates.map(estate => ({
          ...estate, // Spread existing estate properties
          images: estate.estate_image_rel?.map(rel => rel.images?.image_url || null) || [], // Map image URLs from relations
          energyLabel: estate.energy_labels?.letter || null, // Get energy label letter
          city: estate.cities?.name || null, // Get city name
          zipcode: estate.cities?.zipcode || null, // Get city zipcode
          estateType: estate.estate_types?.name || null, // Get estate type name
          employee: estate.employees || null // Get associated employees
        }));

        setEstates(transformedEstates); // Set the transformed estate data into state
      } catch (error) {
        setError(error.message); // Capture and set error message if any
      } finally {
        setLoading(false); // Set loading to false after data fetching is complete
      }
    };

    fetchEstates(); // Call the fetch function to initiate data fetching
  }, [supabase, query]); // Dependency array: effect runs when 'supabase' or 'query' changes

  // Return estate data, loading status, and any error messages
  return { estates, loading, error }; 
};

// Exporting the useEstates hook for use in other components
export default useEstates;
