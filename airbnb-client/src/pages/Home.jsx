import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";
import { Link } from "react-router-dom";

export default function Home() {
  const { setUser } = useAuth();
  const [homes, setHomes] = useState([]);
  useEffect(() => {
    fetch("/api/home", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setHomes(data.homes);
        console.log(data);
      })
      .catch((err) => console.log("Error Occured while fetching homes", err));
  }, []);

  return (
    <>
      <div className="w-[50vw] mx-auto gap-5 py-14  rounded-3xl h-fit items-center flex flex-col">
        <h1 className="text-center text-[#FF385C] text-4xl font-bold">
          Welcome to Airbnb
        </h1>

        <a
          href="/host/add-home"
          className="bg-[#FF385C] hover:scale-105 transition duration-150 rounded-[8px] p-1 px-3 font-medium text-white"
        >
          Add Home
        </a>
      </div>
      <div className="border-t-[1px] border-t-gray-300 px-3 overflow-y-auto">
        <h1 className=" text-center p-6 rounded-3xl font-medium text-2xl ">
          Available Homes
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-9">
          {homes.map((home) => (
            <Card key={home._id} home={home}>
              <Link
                to={`/home-details/${home._id}`}
                className="flex-1 text-center py-2 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition"
              >
                Details
              </Link>
              <button className="flex-1 py-2 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-black transition">
                Book Now
              </button>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
