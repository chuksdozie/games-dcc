import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../store/slices/user.slice";
import { toast } from "react-toastify";
import { useGetOneAnoPasskey } from "./firebase/anonymous.hook";

const useAuthWithTimeout = () => {
  const pass = process.env.NEXT_PUBLIC_PASSWORD;
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user); // Adjust selector if needed
  const info = useGetOneAnoPasskey();

  const authenticateUser = (password, level) => {
    const correctPassword = level ? `${info?.password}${pass}` : info?.password; // Replace with your actual password logic

    if (password === correctPassword) {
      const userData = { name: "User", email: "user@example.com" }; // Replace with actual user data
      dispatch(setUser(userData));
    } else {
      toast.error("Wrong password");
    }
  };

  useEffect(() => {
    if (user) {
      const timerId = setTimeout(() => {
        dispatch(clearUser());
      }, 10 * 30 * 1000); // 10 minutes in milliseconds

      return () => clearTimeout(timerId); // Clear the timeout if the component unmounts or user changes
    }
  }, [user, dispatch]);

  return authenticateUser;
};

export default useAuthWithTimeout;
