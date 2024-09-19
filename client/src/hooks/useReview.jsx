// Import necessary hooks and Supabase client
import { useState, useEffect } from "react"; // Import hooks for state and side effects
import { useSupabase } from "../supabase/supabaseClient"; // Import Supabase client

// Custom hook for managing reviews
const useReviews = () => {
  const { supabase } = useSupabase(); // Get Supabase client instance
  const [reviews, setReviews] = useState([]); // State to hold review data, initialized as an empty array
  const [loading, setLoading] = useState(true); // State to manage loading status, initialized to true
  const [error, setError] = useState(null); // State to hold error messages, initialized as null

  // useEffect to fetch review data when the component mounts
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        // Query the 'reviews' table for all reviews
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('reviews')
          .select('*');

        if (reviewsError) throw reviewsError; // Throw error if there is any fetching error

        setReviews(reviewsData); // Set the review data into state
      } catch (error) {
        setError(error.message); // Capture and set error message if any
      } finally {
        setLoading(false); // Set loading to false after data fetching is complete
      }
    };

    fetchReviews(); // Call the fetch function to initiate data fetching
  }, [supabase]); // Dependency array: effect runs when 'supabase' changes

  // Function to add a new review
  const addReview = async (review) => {
    try {
      // Insert the new review into the 'reviews' table
      const { error } = await supabase
        .from('reviews')
        .insert([review]);

      if (error) throw error; // Throw error if there is any insertion error

      // Update the reviews state by adding the new review to the beginning of the list
      setReviews((prevReviews) => [review, ...prevReviews]);
    } catch (error) {
      setError(error.message); // Capture and set error message if any
    }
  };

  // Function to delete a review by ID
  const deleteReview = async (id) => {
    try {
      // Delete the review from the 'reviews' table matching the given ID
      const { error } = await supabase
        .from('reviews')
        .delete()
        .match({ id });

      if (error) throw error; // Throw error if there is any deletion error

      // Update the reviews state by filtering out the deleted review
      setReviews((prevReviews) => prevReviews.filter(review => review.id !== id));
    } catch (error) {
      setError(error.message); // Capture and set error message if any
    }
  };

  // Function to update an existing review by ID
  const updateReview = async (id, updatedReview) => {
    try {
      // Update the review in the 'reviews' table matching the given ID
      const { error } = await supabase
        .from('reviews')
        .update(updatedReview)
        .match({ id });

      if (error) throw error; // Throw error if there is any update error

      // Update the reviews state by mapping over existing reviews and updating the specified one
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === id ? { ...review, ...updatedReview } : review
        )
      );
    } catch (error) {
      setError(error.message); // Capture and set error message if any
    }
  };

  // Return review data, loading status, error messages, and CRUD functions
  return { reviews, loading, error, addReview, deleteReview, updateReview };
};

// Exporting the useReviews hook for use in other components
export default useReviews;
