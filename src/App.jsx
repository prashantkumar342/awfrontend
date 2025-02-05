import { Routes, Route, Navigate } from "react-router-dom";
import Form from "./components/Form/Form.jsx";
import PWABadge from "./PWABadge.jsx";
import Dashboard from "./components/Home/Dashboard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { validateUser } from "./redux/api/authUserSlice.js";
import { useEffect } from "react";
import Admin from "./components/Admin/Admin.jsx";
import Stepper from "./components/Form/Stepper.jsx";
import AdminHome from "./components/Admin/AdminHome.jsx";
import Courses from "./components/Admin/Courses.jsx";
import CoursesList from "./components/Admin/CoursesList.jsx";
import Drafts from "./components/Admin/Drafts.jsx";
import Published from "./components/Admin/Published.jsx";

function App() {
  const dispatch = useDispatch();
  const { status, loggedIn } = useSelector((state) => state.authUser);

  useEffect(() => {
    if (status === "idle") {
      dispatch(validateUser());
    }
  }, [dispatch, status]);

  // useEffect(() => {
  //   if (status === "succeeded") {
  //     console.log(user)
  //   }
  // }, [status, user])

  return (
    <div>
      <Routes>
        <Route
          path="/administrativeworld/login"
          element={
            loggedIn ? <Navigate to="/administrativeworld/home" /> : <Form />
          }
        />
        <Route path="/administrativeworld/home" element={<Dashboard />} />

        {/* nested Routes of admin */}
        <Route path="/administrativeworld/admin" element={<Admin />}>
          <Route index element={<AdminHome />} />
          <Route path="course" element={<Courses />}>
            <Route index element={<CoursesList />} />
            <Route path="create" element={<Stepper />} />
            <Route path="draft" element={<Drafts />} />
            <Route path="published" element={<Published />} />

          </Route>
        </Route>

        {/* <Route path='*' element={<Navigate to="/login" />} /> */}
      </Routes>
      <PWABadge />
    </div>
  );
}

export default App;
