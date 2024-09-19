// Importing necessary modules and hooks
import { useState, useContext } from "react"; // Importing React hooks
import { AuthContext } from "../context/authContext"; // Importing authentication context for user data
import { Navigate } from "react-router-dom"; // Module for navigation control
import useReviews from "../hooks/useReview"; // Custom hook for managing reviews

// Main UserPage component
const UserPage = () => {
  // Using destructure assignment to get user information and logout function from AuthContext
  const { isLoggedIn, userEmail, userId, logout } = useContext(AuthContext);
  // Using the useReviews hook to manage reviews
  const { reviews, loading, error, deleteReview, updateReview } = useReviews();

  // State to manage the editing review and the form data for editing
  const [editingReview, setEditingReview] = useState(null); // State to hold the review being edited
  const [editForm, setEditForm] = useState({ title: "", content: "" }); // State for the edit form fields

  // Redirect to login page if the user is not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Filtering reviews to show only those belonging to the logged-in user
  const userReviews = reviews.filter(review => review.user_id === userId);

  // Function to handle review deletion
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      deleteReview(id); // Call the deleteReview function
    }
  };

  // Function to initiate the editing of a review
  const handleEdit = (review) => {
    setEditingReview(review); // Set the review to be edited
    setEditForm({ title: review.title, content: review.content }); // Populate the edit form with current review data
  };

  // Function to handle changes in the edit form inputs
  const handleEditChange = (e) => {
    const { name, value } = e.target; // Destructuring name and value from the event target
    setEditForm((prevForm) => ({ ...prevForm, [name]: value })); // Update the form state using spread operator
  };

  // Function to handle the submission of the edit form
  const handleEditSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (editingReview) {
      await updateReview(editingReview.id, { ...editForm }); // Update the review with the edited form data
      setEditingReview(null); // Reset editing state
    }
  };

  // Function to format date strings into a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString); // Convert string to Date object
    return new Intl.DateTimeFormat("da-DK", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date); // Return formatted date string
  };

  // Return the JSX for rendering the user page
  return (
    <div className="p-4 mb-8 mx-8 my-24">
      <h2 className="text-3xl font-semibold mb-6">User Page</h2>
      <div className="grid grid-cols-1 xl:grid-cols-8">
        <div className="col-span-5 border-b xl:border-r xl:border-b-0 border-black min-h-[100vh]">
          <h3 className="text-2xl font-semibold mb-4">Administration af anmeldelser</h3>
          <div className="grid grid-cols-5 text-xl font-semibold">
            <p className="col-span-2">Titel</p>
            <p className="col-span-2">Dato</p>
            <p className="col-span-1">Handling</p>
          </div>
          {loading ? ( // Conditional rendering for loading state
            <p>Loading reviews...</p> // Display loading message
          ) : error ? ( // Conditional rendering for error state
            <p>Error: {error}</p> // Display error message
          ) : (
            <ul>
              {userReviews.length > 0 ? ( // Check if user has reviews
                userReviews.map(review => ( // Iteration over user reviews
                  <li key={review.id} className="grid grid-cols-5 text-lg border-t border-black py-1">
                    <p className="col-span-2">{review.title}</p> {/* Display review title */}
                    <p className="col-span-2 capitalize">{formatDate(review.created_at)}</p> {/* Display formatted date */}
                    <div className="col-span-1 flex gap-5">
                      <button className="text-[#339900]" onClick={() => handleEdit(review)}>Rediger</button> {/* Edit button */}
                      <button className="text-[#FF0000]" onClick={() => handleDelete(review.id)}>Slet</button> {/* Delete button */}
                    </div>
                  </li>
                ))
              ) : (
                <p>No reviews found.</p> // Message when no reviews are available
              )}
            </ul>
          )}
        </div>
        <div className="col-span-3 pt-6 xl:pt-0 xl:px-6">
          <div className="mb-6">
            <p className="text-xl">Du er logget in som: {userEmail}</p> {/* Display logged-in user email */}
          </div>
          <button
            onClick={logout} // Logout function triggered on click
            className="bg-[#F7EBEC] hover:bg-[#DDBDD5] w-1/2 py-2 uppercase font-semibold shadow-lg rounded-lg"
          >
            Log ud
          </button>
        </div>
      </div>

      {/* Edit Review Modal */}
      {editingReview && ( // Conditional rendering for edit modal
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h3 className="text-xl font-semibold mb-4">Rediger anmeldelse</h3>
            <form onSubmit={handleEditSubmit}> {/* Form for editing reviews */}
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                type="text"
                name="title" // Input name for the title
                value={editForm.title} // Bound to edit form state
                onChange={handleEditChange} // Event handler for input change
                placeholder="Titel"
              />
              <textarea
                className="shadow appearance-none border rounded w-full resize-none py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                rows="4" // Number of rows for the textarea
                name="content" // Input name for the content
                value={editForm.content} // Bound to edit form state
                onChange={handleEditChange} // Event handler for textarea change
                placeholder="Indhold"
              ></textarea>
              <button
                type="submit" // Submit button for the form
                className="bg-[#F7EBEC] hover:bg-[#DDBDD5] text-black font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Opdater
              </button>
              <button
                type="button" // Cancel button for closing the edit modal
                className="ml-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setEditingReview(null)} // Reset editing state on cancel
              >
                Annuller
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Exporting the UserPage component for use in other parts of the application
export default UserPage;
