import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favourites, setFavourites] = useState([])


  useEffect(() => {
    console.log("hello");
    fetch("/api/session-user", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setUser(data.user);
        }
      })
      .catch((err) => console.log("Error Fetching", err)); // user exist only set otherwise set null
  }, []);

  useEffect(() => {
    try {
      const fetchFav = async () => {
        const res = await fetch("/api/favourites", {
          credentials: "include"
        })

        const data = await res.json();
        if (data.success) {
          console.log(data)
          setFavourites(data.favourites)
        }
      }

      fetchFav()
    } catch (err) {
      console.error(err)
    }
  }, [])
  return (
    <AuthContext.Provider value={{ user, setUser, favourites, setFavourites }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
