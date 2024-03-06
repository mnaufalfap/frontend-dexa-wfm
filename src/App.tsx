import { Suspense } from "react";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <>
      <Suspense>
        <AppRoutes />
      </Suspense>
    </>
  );
}
