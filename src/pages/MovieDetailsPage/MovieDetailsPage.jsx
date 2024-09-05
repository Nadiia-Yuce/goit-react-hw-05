import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export default function MovieDetailsPage() {
  return (
    <div>
      <div>Movie Detail Page</div>
      <Suspense fallback="Loading subpage ...">
        <Outlet />
      </Suspense>
    </div>
  );
}
