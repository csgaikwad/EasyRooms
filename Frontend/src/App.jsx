import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { UserAtom } from "./atoms/UserAtom";
import axios from "axios";
import Navbar from "./layout/Navbar/Navbar";
import Footer from "./layout/Footer/Footer";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import Property from "./pages/UserProperties/Property";
import Places from "./pages/Places/Places";
import Booking from "./pages/Booking/Booking";
import Terms from "./layout/Footer/Terms";
import fetchData from "./utils/fetchData";
import useScrollToTop from "./utils/scrollToTop";

axios.defaults.baseURL = "https://easyrooms-ssg.koyeb.app";
// axios.defaults.baseURL = "https://airbnd-qs5d.onrender.com";
// axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

export default function App() {
  const [user, setUser] = useRecoilState(UserAtom);
  const location = useLocation();

  useEffect(() => {
    async function fetchDataOnLoad() {
      try {
        await fetchData(setUser);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchDataOnLoad();
  }, []);


  useScrollToTop();

  const pageVariants = {
    initial: {
      x: "100vw",
    },
    animate: {
      x: 0,
      transition: {
        duration: 0.4,
      },
    },
    exit: {
      x: "-100vw",
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                key="home"
                variants={pageVariants}
                // initial="initial"
                // animate="animate"
                exit="exit"
              >
                <Home />
              </motion.div>
            }
          />
          <Route
            path="/login"
            element={
              <motion.div
                key="login"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Login />
              </motion.div>
            }
          />
          <Route
            path="/register"
            element={
              <motion.div
                key="register"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Register />
              </motion.div>
            }
          />
          <Route
            path="/profile"
            element={
              <motion.div
                key="profile"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Profile />
              </motion.div>
            }
          />
          <Route
            path="/property"
            element={
              <motion.div
                key="property"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Property />
              </motion.div>
            }
          />
          <Route
            path="/property/:id"
            element={
              <motion.div
                key="property"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Property />
              </motion.div>
            }
          />
          <Route
            path="/places/:id"
            element={
              <motion.div
                key="places"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Places />
              </motion.div>
            }
          />
          <Route
            path="/booking/:id"
            element={
              <motion.div
                key="booking"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Booking />
              </motion.div>
            }
          />
          <Route
            path="/terms"
            element={
              <motion.div
                key="terms"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Terms />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}
