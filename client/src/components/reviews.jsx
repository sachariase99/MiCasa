import { useState, useEffect, useContext } from "react";
import useReviews from "../hooks/useReview";
import { AuthContext } from "../context/authContext";

const Reviews = () => {
  const { reviews, loading, error, addReview } = useReviews();
  const { isLoggedIn, userId } = useContext(AuthContext);
  const [isFormVisible, setFormVisible] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [form, setForm] = useState({
    name: "",
    title: "",
    content: "",
  });

  useEffect(() => {
    if (reviews.length > 1) {
      const intervalId = setInterval(() => {
        setCurrentReviewIndex((prevIndex) =>
          prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
        );
      }, 10000);

      return () => clearInterval(intervalId);
    }
  }, [reviews]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("da-DK", {
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const toggleForm = () => {
    setFormVisible(!isFormVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, title, content } = form;

    if (!name || !title || !content || !isLoggedIn) {
      return;
    }

    addReview({
      name,
      title,
      content,
      user_id: userId,
      created_at: new Date().toISOString()
    });
    setForm({ name: "", title: "", content: "" });
    toggleForm();
  };

  return (
    <div className="mt-16">
      <h2 className="text-3xl text-center font-semibold">
        Det siger vores kunder
      </h2>
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
              <div onClick={toggleForm} className="absolute -top-10 right-8 cursor-pointer">
                <span className="block bg-white h-1 w-8 absolute -rotate-45"></span>
                <span className="block bg-white h-1 w-8 absolute rotate-45"></span>
              </div>
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
