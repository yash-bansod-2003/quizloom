import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 h-full justify-center items-center dark:bg-slate-800">
      <Link to="/about" className={buttonVariants()}>
        About
      </Link>
      <p>Environment : {import.meta.env.VITE_BACKEND_URL}</p>
    </div>
  );
};

export default HomePage;
