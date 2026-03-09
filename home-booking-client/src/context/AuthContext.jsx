import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false)
  const [favourites, setFavourites] = useState([])


  useEffect(() => {
    setLoading(true)
    fetch("/api/session-user", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setUser(data.user);
        }
        setLoading(false)
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
          setFavourites(data.favourites)
          setLoading(false)
        }
      }

      fetchFav()
    } catch (err) {
      console.error(err)
    }
  }, [])
  return (
    <AuthContext.Provider value={{ user, setUser, loading, favourites, setFavourites }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
