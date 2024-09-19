import Cards from "../components/Cards"; // Importing the Cards component to display property listings
import Employees from "../components/employees"; // Importing the Employees component to show staff information
import Header from "../components/header"; // Importing the Header component for the page header
import Reviews from "../components/reviews"; // Importing the Reviews component to display user feedback

// Main component for the home page
const Home = () => {
  return (
    <div>
      <Header /> {/* Render the Header component */}
      <div className="xl:mt-[936px]"> {/* Margin for larger screens */}
        <span className="bg-[#1D1E2C] h-10 w-full hidden xl:block relative"></span> {/* Decorative span visible only on extra-large screens */}
        <div className="relative mt-28 xl:-mt-52 z-0"> {/* Relative positioning for Cards */}
          <Cards maxItems={3} highlightMiddle={true} /> {/* Render the Cards component with a maximum of 3 items and highlight the middle one */}
        </div>
        <Reviews /> {/* Render the Reviews component */}
        <Employees /> {/* Render the Employees component */}
      </div>
    </div>
  );
};

export default Home; // Exporting the Home component for use in other parts of the application
