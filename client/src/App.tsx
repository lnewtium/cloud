import { useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import Authorization from "./pages/Authorization/Authorization";
import { auth } from "@/actions/user";
import Disk from "./components/disk/Disk";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";
import { DEV_MODE } from "@/config";

function App() {
  const isAuth = useAppSelector(state => state.user.isAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(auth());
  }, [dispatch]); // Add dispatch as a dependency

  return (
    <BrowserRouter basename={DEV_MODE ? "/" : "/cloud/"}>
      <div className="flex flex-col items-center font-opensans font-normal">
        <Navbar />
        <div className="w-full sm:w-4/5 px-1 sm:px-0 flex flex-col">
          <Routes>
            {!isAuth ? (
              <>
                <Route path="/login" element={<Authorization />} />
                <Route path="/registration" element={<Authorization />} />
                <Route path="*" element={<Navigate to="/login" />} />
                {/* Redirect to login if no match */}
              </>
            ) : (
              <>
                <Route path="/" element={<Disk />} />
                <Route path="*" element={<Navigate to="/" />} />
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
