/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { decodeToken, selectToken } from "../slice/tokenSlice";

interface GuestGuardProps {
  children: ReactNode;
}

export default function GuestGuard({ children }: GuestGuardProps) {
  const token = localStorage.getItem("_token") || "";
  const name = localStorage.getItem("name") || "";
  const dispatch = useDispatch();
  const tokenData = useSelector(selectToken);

  useEffect(() => {
    dispatch(decodeToken() as any);
  }, [dispatch]);

  if (token && tokenData && tokenData.name === name) {
    return <Navigate to="/user/dashboard" />;
  }

  return <>{children}</>;
}
