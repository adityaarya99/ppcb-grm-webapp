"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// ✅ helper function
function isTokenValid(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export default function RequireAuth({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // ✅ YOUR LOGIC HERE
    if (!token || !isTokenValid(token)) {
      localStorage.removeItem("token");
      router.replace("/login");
    } else {
      setChecking(false);
    }
  }, [router]);

  if (checking) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: 60, height: 60 }}
        >
          <span className="visually-hidden">
            Checking authentication...
          </span>
        </div>
      </div>
    );
  }

  return children;
}