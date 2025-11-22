import { getLinkStats } from "@/api/links";

export default async function StatsPage({ params }: any) {
  const { code } = await params;
  console.log("Params: ", params);
  console.log("Code afeter oarams: ", code);
  const data = await getLinkStats(code);

  console.log("Code: ", data);
  if (!data) return <p>Not found</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Link Stats</h1>

      <p>
        <strong>Short Code:</strong> {data.short_code}
      </p>
      <p>
        <strong>Long URL:</strong> {data.long_url}
      </p>
      <p>
        <strong>Short URL:</strong> {data.short_url}
      </p>
      <p>
        <strong>Total Clicks:</strong> {data.clicks}
      </p>
      <p>
        <strong>Last Clicked:</strong> {data.last_clicked || "Never"}
      </p>
    </div>
  );
}
