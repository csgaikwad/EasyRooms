import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
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

axios.defaults.baseURL = "https://airbnd-airbnd.koyeb.app/";
// axios.defaults.baseURL = "https://airbnd-qs5d.onrender.com";
// axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

export default function App() {
  const [user, setUser] = useRecoilState(UserAtom);

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

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <AnimatePresence exitBeforeEnter>
          <Routes>
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Home />
                </motion.div>
              }
            />
            <Route
              path="/login"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Login />
                </motion.div>
              }
            />
            <Route
              path="/register"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Register />
                </motion.div>
              }
            />
            <Route
              path="/profile"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Profile />
                </motion.div>
              }
            />
            <Route
              path="/property"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Property />
                </motion.div>
              }
            />
            <Route
              path="/places/:id"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Places />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
      <Footer />
    </div>
  );
}
