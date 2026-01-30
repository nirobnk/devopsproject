import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Header from "./pages/Header";
import NoMatch from "./pages/NoMatch";
import PostUser from "./pages/PostUser";
import UpdateUser from "./pages/UpdateUser";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/postemployee"
          element={
            <PrivateRoute>
              <PostUser />
            </PrivateRoute>
          }
        />
        <Route
          path="/employee/:id"
          element={
            <PrivateRoute>
              <UpdateUser />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
//this comment is for to push test pushes to check webhook functionality