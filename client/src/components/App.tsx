import React, { useEffect } from "react";
import Navbar from "./navbar/Navbar.js";
import "./app.less";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"; // Update to v6
import Registration from "./authorization/Registration.js";
import Login from "./authorization/Login.js";
import { auth } from "@/actions/user";
import Disk from "./disk/Disk.js";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";

function App() {
  const isAuth = useAppSelector(state => state.user.isAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(auth());
  }, [dispatch]); // Add dispatch as a dependency

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="wrap">
          <Routes>
            {!isAuth ? (
              <>
                <Route path="/registration" element={<Registration />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect to login if no match */}
              </>
            ) : (
              <>
                <Route path="/" element={<Disk />} />
                <Route path="*" element={<Navigate to="/" />} /> {/* Redirect to home if no match */}
              </>
            )}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;