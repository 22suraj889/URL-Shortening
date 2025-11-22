"use client"

import { useState } from "react";
import { createShortLink } from "@/api/links";

export default function AddLinkForm({ onSuccess }) {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await createShortLink({ originalUrl, shortCode });
    if (res.error) setError(res.error);

    setLoading(false);
    setOriginalUrl("");
    setShortCode("");

    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-3">
      <input
        type="text"
        className="border p-2 w-full"
        placeholder="Enter long URL"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        required
      />

      <input
        type="text"
        className="border p-2 w-full"
        placeholder="Custom short code (optional)"
        value={shortCode}
        onChange={(e) => setShortCode(e.target.value)}
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Creating..." : "Create Short Link"}
      </button>
    </form>
  );
}
