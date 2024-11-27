import React, { useEffect } from 'react';
import Navbar from "./navbar/Navbar";
import './app.less';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"; // Update to v6
import Registration from "./authorization/Registration";
import Login from "./authorization/Login";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../actions/user";
import Disk from "./disk/Disk";
import Profile from "./profile/Profile";

function App() {
    const isAuth = useSelector(state => state.user.isAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(auth());
    }, [dispatch]); // Add dispatch as a dependency

    return (
        <BrowserRouter>
            <div className='app'>
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
                                <Route path="/profile" element={<Profile />} />
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