import { useEffect } from "react";
import Navbar from "./navbar/Navbar.js";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import Authorization from "../pages/Authorization/Authorization";
import { auth } from "@/actions/user";
import Disk from "./disk/Disk";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";

function App() {
  const isAuth = useAppSelector(state => state.user.isAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(auth());
  }, [dispatch]); // Add dispatch as a dependency

  return (
    <BrowserRouter>
      <div className="flex flex-col items-center font-opensans font-normal">
        <Navbar />
        <div className="w-3/4 flex flex-col">
          <Routes>
            {!isAuth ? (
              <>
                <Route path="/login" element={<Authorization />} />
                <Route path="/registration" element={<Authorization />} />
                <Route path="*" element={<Navigate to="/login" />} />{" "}
                {/* Redirect to login if no match */}
              </>
            ) : (
              <>
                <Route path="/" element={<Disk />} />
                <Route path="*" element={<Navigate to="/" />} />{" "}
                {/* Redirect to home if no match */}
              </>
            )}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
