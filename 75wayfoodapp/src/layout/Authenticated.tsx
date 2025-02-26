import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/store";

export default function Authenticated() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
