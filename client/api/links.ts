import axios from "axios";

const api = axios.create({
  baseURL: "https://url-shortening-1.onrender.com", // example: http://localhost:5000
  headers: {
    "Content-Type": "application/json",
  },
});

export async function createShortLink(data) {
  try {
    const res = await api.post("/api/links", data);
    return res.data;
  } catch (err) {
    return { error: err.response?.data?.error || "Something went wrong" };
  }
}

export async function getAllLinks() {
  try {
    const res = await api.get("/api/links");
    return res.data.result;
  } catch (err) {
    return [];
  }
}

export async function deleteShortLink(code) {
  try {
    const res = await api.delete(`/api/links/${code}`);
    return res.data;
  } catch (err) {
    return { error: "Failed to delete" };
  }
}

export async function getLinkStats(code) {
  try {
    console.log("Code in api: ", code);
    const res = await api.get(`/code/${code}`);
    return res.data.result;
  } catch (err) {
    return null;
  }
}

export async function redirectToOriginalUrl(code) {
  try {
    const res = await api.get(`/${code}`);
  } catch (error) {
    console.log("Error: ", error);
    return null;
  }
}

export async function getHealth() {
  try {
    const res = await api.get(`/healthz`);
    console.log(res)
    return res;
  } catch (error) {
    console.log("Error: ", error);
    return null;
  }
}
export default api;
