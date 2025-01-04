import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 h-full justify-center items-center dark:bg-slate-800">
      <Link to="/" className={buttonVariants()}>
        Home
      </Link>
    </div>
  );
};

export default HomePage;
