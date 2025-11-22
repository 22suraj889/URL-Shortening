"use client";
import { getHealth } from "@/api/links";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";

export default function Healthz() {
  const [healthResponse, setHealthResponse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchHealth() {
      const healthRes = await getHealth();
      console.log(healthRes);
      setHealthResponse(healthRes?.data);
    }
    fetchHealth();
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {loading ? (
        <Loader />
      ) : (
        <>
          {healthResponse?.ok && (
            <div>
              <h1
                className={`text-2xl font-bold ${
                  healthResponse.ok ? "text-green-600" : "text-red-600"
                }`}
              >
                {healthResponse.ok ? "OK" : "DOWN"}
              </h1>
              <p className="text-gray-600 mt-2">
                Version: {healthResponse.version}
              </p>
              <p className="text-gray-600 mt-2">
                Uptime: {Math.floor(healthResponse.uptime / 60)} min
              </p>
              <p
                className={`text-gray-600 mt-2 ${
                  healthResponse.ok ? "text-green-600" : "text-red-600"
                }`}
              >
                Database: {healthResponse.database}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
