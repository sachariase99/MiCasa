import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";
import useReviews from "../hooks/useReview";

const UserPage = () => {
  const { isLoggedIn, userEmail, userId, logout } = useContext(AuthContext);
  const { reviews, loading, error, deleteReview, updateReview } = useReviews();

  const [editingReview, setEditingReview] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", content: "" });

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const userReviews = reviews.filter(review => review.user_id === userId);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      deleteReview(id);
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setEditForm({ title: review.title, content: review.content });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (editingReview) {
      await updateReview(editingReview.id, { ...editForm });
      setEditingReview(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("da-DK", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

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
          {loading ? (
            <p>Loading reviews...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <ul>
              {userReviews.length > 0 ? (
                userReviews.map(review => (
                  <li key={review.id} className="grid grid-cols-5 text-lg border-t border-black py-1">
                    <p className="col-span-2">{review.title}</p>
                    <p className="col-span-2 capitalize">{formatDate(review.created_at)}</p>
                    <div className="col-span-1 flex gap-5">
                      <button className="text-[#339900]" onClick={() => handleEdit(review)}>Rediger</button>
                      <button className="text-[#FF0000]" onClick={() => handleDelete(review.id)}>Slet</button>
                    </div>
                  </li>
                ))
              ) : (
                <p>No reviews found.</p>
              )}
            </ul>
          )}
        </div>
        <div className="col-span-3 pt-6 xl:pt-0 xl:px-6">
          <div className="mb-6">
            <p className="text-xl">Du er logget in som: {userEmail}</p>
          </div>
          <button
            onClick={logout}
            className="bg-[#F7EBEC] hover:bg-[#DDBDD5] w-1/2 py-2 uppercase font-semibold shadow-lg rounded-lg"
          >
            Log ud
          </button>
        </div>
      </div>

      {/* Edit Review Modal */}
      {editingReview && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h3 className="text-xl font-semibold mb-4">Rediger anmeldelse</h3>
            <form onSubmit={handleEditSubmit}>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                type="text"
                name="title"
                value={editForm.title}
                onChange={handleEditChange}
                placeholder="Titel"
              />
              <textarea
                className="shadow appearance-none border rounded w-full resize-none py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                rows="4"
                name="content"
                value={editForm.content}
                onChange={handleEditChange}
                placeholder="Indhold"
              ></textarea>
              <button
                type="submit"
                className="bg-[#F7EBEC] hover:bg-[#DDBDD5] text-black font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Opdater
              </button>
              <button
                type="button"
                className="ml-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setEditingReview(null)}
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

export default UserPage;
