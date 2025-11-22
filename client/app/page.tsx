"use client";

import { useEffect, useState } from "react";
import { getAllLinks } from "@/api/links";
import AddLinkForm from "@/components/AddLinkForm";
import LinkTable from "@/components/LinkTable";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";

export default function Home() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  async function loadLinks() {
    setLoading(true);
    const data = await getAllLinks();
    setLinks(data);
    setLoading(false);
  }

  useEffect(() => {
    loadLinks();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">TinyLink Dashboard</h1>

      <AddLinkForm onSuccess={loadLinks} />

      {/* Show loader while fetching */}
      {loading ? <Loader /> : <LinkTable links={links} onDelete={loadLinks} />}
      <button
        onClick={()=> router.push('/healthz')}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Get TinyLink Health
      </button>
    </div>
  );
}
