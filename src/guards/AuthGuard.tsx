/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { decodeToken, selectToken } from "../slice/tokenSlice";

interface AdminGuardProps {
  children: ReactNode;
  roleid?: number;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const token = localStorage.getItem("_token") || "";
  const name = localStorage.getItem("name") || "";

  const dispatch = useDispatch();
  const tokenData = useSelector(selectToken);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(decodeToken() as any);
  }, [dispatch]);

  useEffect(() => {
    const expiration = tokenData?.exp ? tokenData.exp * 1000 : 0;
    const isTokenExpired = expiration ? Date.now() >= expiration : false;
    const role = tokenData?.roleId;

    if (role === 2) {
      navigate("/user/dashboard");
    } else {
      navigate("/admin/dashboard");
    }

    if (isTokenExpired) {
      localStorage.removeItem("_token");
      localStorage.removeItem("name");
      localStorage.removeItem("id");

      navigate("/auth/login");
    }

    if (token === "") {
      localStorage.removeItem("name");
      localStorage.removeItem("id");

      navigate("/auth/login");
    }

    if (!token || !tokenData || tokenData.name !== name) {
      navigate("/auth/login");
    }
  }, [navigate, token, tokenData, name]);

  const isAttendancePage = location.pathname === "/user/attendance";
  if (isAttendancePage) {
    <Navigate to={"/user/attendance"} />;
  } else {
    <Navigate to={"/user/dashboard"} />;
  }
  return <>{children}</>;
}
