import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRoute from "./Hooks/private/PrivateRoute";

import Navbar from "./Components/Navbar/Navbar";
import SignInPage from "./Pages/SignInPage/page/SignInPage";
import SignUpPage from "./Pages/SignUpPage/page/SignUpPage";
import HomePage from "./Pages/HomePage/page/HomePage";
import Notes from "./Pages/Notes/page/Notes";
import NotesActiveList from "./Pages/Notes/NotesActiveList/page/NotesActiveList";
import NotesArchivedList from "./Pages/Notes/NotesArchivedList/page/NotesArchivedList";
import NotesDetails from "./Pages/Notes/NotesDetails/page/NotesDetails";
import Page404 from "./Pages/Page404/Page404";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/notes"
            element={
              <PrivateRoute>
                <Notes />
              </PrivateRoute>
            }
          >
            <Route
              path="active"
              element={
                <PrivateRoute>
                  <NotesActiveList />
                </PrivateRoute>
              }
            />
            <Route
              path="archived"
              element={
                <PrivateRoute>
                  <NotesArchivedList />
                </PrivateRoute>
              }
            />
            <Route
              path="details"
              element={
                <PrivateRoute>
                  <NotesDetails />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
