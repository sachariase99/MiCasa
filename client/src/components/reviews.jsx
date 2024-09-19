import { useState, useEffect, useContext } from "react"; // Import hooks for state management and context
import useReviews from "../hooks/useReview"; // Custom hook for fetching reviews
import { AuthContext } from "../context/authContext"; // Context for authentication

const Reviews = () => {
  // Extract reviews, loading state, error, and addReview function from the custom hook
  const { reviews, loading, error, addReview } = useReviews();
  const { isLoggedIn, userId } = useContext(AuthContext); // Get authentication status and user ID
  const [isFormVisible, setFormVisible] = useState(false); // State to toggle review form visibility
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0); // Index of the currently displayed review
  const [form, setForm] = useState({ name: "", title: "", content: "" }); // State for form input values

  // Effect to automatically cycle through reviews if there are multiple
  useEffect(() => {
    if (reviews.length > 1) {
      const intervalId = setInterval(() => {
        setCurrentReviewIndex((prevIndex) =>
          prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
        );
      }, 10000); // Change review every 10 seconds

      return () => clearInterval(intervalId); // Cleanup the interval on unmount
    }
  }, [reviews]);

  // Loading and error handling
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("da-DK", {
      month: "long",
      year: "numeric",
    }).format(date);
  };

  // Toggle the visibility of the review form
  const toggleForm = () => {
    setFormVisible(!isFormVisible);
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Handle form submission to add a new review
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    const { name, title, content } = form;

    // Validate form inputs
    if (!name || !title || !content || !isLoggedIn) {
      return;
    }

    // Add review using the addReview function from the custom hook
    addReview({
      name,
      title,
      content,
      user_id: userId,
      created_at: new Date().toISOString(),
    });
    setForm({ name: "", title: "", content: "" }); // Reset form
    toggleForm(); // Hide form after submission
  };

  return (
    <div className="mt-16">
      <h2 className="text-3xl text-center font-semibold">Det siger vores kunder</h2>
      <ul className="w-full bg-[#F7EBEC] mt-4">
        {reviews.length > 0 && (
          <li key={reviews[currentReviewIndex].id} className="px-32 py-10">
            <h2 className="text-lg font-bold">{reviews[currentReviewIndex].title}</h2>
            <p className="py-1">{reviews[currentReviewIndex].content}</p>
            <div className="flex gap-2">
              <p>{reviews[currentReviewIndex].name},</p>
              <p className="capitalize">{formatDate(reviews[currentReviewIndex].created_at)}</p>
            </div>
          </li>
        )}
      </ul>

      <div className="bg-[#AC9FBB] w-full flex flex-col items-center">
        <button
          onClick={toggleForm}
          className={`border-x-2 border-white text-white py-4 px-16 transition-colors duration-1000 ${
            isFormVisible ? "bg-[#59656F]" : "hover:bg-[#59656F]"
          }`}
        >
          Skriv en anmeldelse
        </button>

        <div
          className={`w-full transition-all duration-500 overflow-hidden bg-[#59656F] ${
            isFormVisible ? "max-h-screen py-8" : "max-h-0"
          }`}
        >
          {isFormVisible && isLoggedIn && (
            <form className="flex flex-col m-auto w-1/2 xl:w-1/3 relative mt-10" onSubmit={handleSubmit}>
              {/* Close form button */}
              <div onClick={toggleForm} className="absolute -top-10 right-8 cursor-pointer">
                <span className="block bg-white h-1 w-8 absolute -rotate-45"></span>
                <span className="block bg-white h-1 w-8 absolute rotate-45"></span>
              </div>
              {/* Form fields for name, title, and content */}
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                placeholder="Indtast dit navn"
              />
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-4"
                type="text"
                name="title"
                value={form.title}
                onChange={handleInputChange}
                placeholder="Indtast titel"
              />
              <textarea
                className="shadow appearance-none border rounded w-full resize-none py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="4"
                name="content"
                value={form.content}
                onChange={handleInputChange}
                placeholder="Skriv en anmeldelse"
              ></textarea>
              <button
                type="submit"
                className="bg-[#F7EBEC] hover:bg-[#DDBDD5] text-black font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline self-end mt-4"
              >
                Indsend
              </button>
            </form>
          )}
          {!isLoggedIn && <p className="text-white text-center">Du skal være logget ind for at skrive en anmeldelse.</p>}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
