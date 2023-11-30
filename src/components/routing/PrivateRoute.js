import { Navigate, Route } from "react-router-dom";
import Dashboard from "../Dashboard";

function PrivateRoute({ path, element }) {
  const sessionToken = localStorage.getItem("sessionToken");
  return sessionToken ? (
    <Route path={path} element={<Dashboard />} />
  ) : (
    <Navigate to="/signin" replace />
  );
}

export default PrivateRoute;
