"use client";

import { deleteShortLink } from "@/api/links";
import { useRouter } from "next/navigation";

export default function LinkTable({ links, onDelete }: any) {
  const router = useRouter();

  async function handleDelete(code: string) {
    await deleteShortLink(code);
    onDelete();
  }

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Short Code</th>
          <th className="border p-2">Long URL</th>
          <th className="border p-2">Short URL</th>
          <th className="border p-2">Clicks</th>
          <th className="border p-2">Last Clicked</th>
          <th className="border p-2">Action</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link: any) => (
          <tr key={link.short_code}>
            <td className="border p-2">
              <a
                href={`/code/${link.short_code}`}
                className="text-blue-600 underline"
              >
                {link.short_code}
              </a>
            </td>

            <td className="border p-2 truncate max-w-xs">{link.long_url}</td>

            <td className="border p-2 truncate max-w-xs">
              <a
                href={link.short_url}
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {link.short_url}
              </a>
            </td>

            <td className="border p-2">{link.clicks}</td>

            <td className="border p-2">
              {link.last_clicked ? link.last_clicked : "—"}
            </td>

            <td className="border p-2">
              <button
                onClick={() => handleDelete(link.short_code)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
