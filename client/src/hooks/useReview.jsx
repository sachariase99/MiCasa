import { useState, useEffect } from "react";
import { useSupabase } from "../supabase/supabaseClient";

const useReviews = () => {
  const { supabase } = useSupabase();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('reviews')
          .select('*');

        if (reviewsError) throw reviewsError;

        setReviews(reviewsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [supabase]);

  const addReview = async (review) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .insert([review]);

      if (error) throw error;

      setReviews((prevReviews) => [review, ...prevReviews]);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteReview = async (id) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .match({ id });

      if (error) throw error;

      setReviews((prevReviews) => prevReviews.filter(review => review.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const updateReview = async (id, updatedReview) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update(updatedReview)
        .match({ id });

      if (error) throw error;

      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === id ? { ...review, ...updatedReview } : review
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return { reviews, loading, error, addReview, deleteReview, updateReview };
};

export default useReviews;
