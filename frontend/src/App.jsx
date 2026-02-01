import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Header from "./pages/Header";
import NoMatch from "./pages/NoMatch";
import BookAppointment from "./pages/BookAppointment";
import UpdateAppointment from "./pages/UpdateAppointment";
import Doctors from "./pages/Doctors";
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
          path="/bookappointment"
          element={
            <PrivateRoute>
              <BookAppointment />
            </PrivateRoute>
          }
        />
        <Route
          path="/doctors"
          element={
            <PrivateRoute>
              <Doctors />
            </PrivateRoute>
          }
        />
        <Route
          path="/appointment/:id"
          element={
            <PrivateRoute>
              <UpdateAppointment />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
//this comment is for to push test pushes to check webhook functionalityy
