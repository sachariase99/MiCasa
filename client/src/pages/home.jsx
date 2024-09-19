import Cards from "../components/Cards";
import Employees from "../components/employees";
import Header from "../components/header";
import Reviews from "../components/reviews";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="xl:mt-[936px]">
        <span className="bg-[#1D1E2C] h-10 w-full hidden xl:block relative "></span>
        <div className="relative mt-28 xl:-mt-52 z-0">
          <Cards maxItems={3} highlightMiddle={true} />
        </div>
        <Reviews />
        <Employees />
      </div>
    </div>
  );
};

export default Home;
