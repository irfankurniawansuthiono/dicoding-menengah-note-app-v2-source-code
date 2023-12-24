import { useEffect, useState } from "react";
import { getUserLogged } from "../../Api/Api";
import { Navigate } from "react-router-dom";
import { useUserLoggedDataStore } from "../../Zustand/UserLoggedDataStoreZustand";

type PrivateRouteProps = {
  children: React.ReactNode;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const { setUserLoggedData } = useUserLoggedDataStore();

  useEffect(() => {
    const fetchTokenStatus = async () => {
      try {
        const response = await getUserLogged();
        setUserLoggedData(response.data);
        if (!response.error) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("An error occurred during token check:", error);
        setIsLoggedIn(false);
      }
    };

    fetchTokenStatus();
  }, []);

  return isLoggedIn === undefined ? null : isLoggedIn ? (
    children
  ) : (
    <Navigate to="/signin" />
  );
}
