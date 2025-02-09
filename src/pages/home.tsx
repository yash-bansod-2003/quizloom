import * as React from "react";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import axios from "axios";

const getServerRunningStatus = async () => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_BACKEND_URL + "/status",
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const HomePage: React.FC = () => {
  const [status, setStatus] = React.useState<string>("");
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await getServerRunningStatus();
      if (response) {
        setStatus("running");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4 h-full justify-center items-center dark:bg-slate-800">
      <Link to="/about" className={buttonVariants()}>
        About
      </Link>
      <p>Status : {status === "running" ? "Running" : "Stop"} </p>
    </div>
  );
};

export default HomePage;
