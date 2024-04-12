import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/pages/navbar/Navbar";
import Footer from "./components/pages/Footer";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Profile from "./components/pages/Profile";
import { fetchData } from "./components/functions/fetchData";
import { useRecoilState } from "recoil";
import { UserAtom } from "./components/atoms/UserAtom";
import axios from "axios";
import { Property } from "./components/pages/Property";
import Places from "./components/pages/Places";
import Terms from "./components/pages/Terms";

axios.defaults.baseURL = "https://airbnd-airbnd.koyeb.app/";
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
                initial="initial"
                animate="animate"
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
