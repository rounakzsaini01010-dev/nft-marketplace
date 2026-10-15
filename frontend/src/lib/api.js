import { env } from "@/config/env";

export async function fetchMetadata(uri) {
  try {
    const res = await fetch(uri);
    if (!res.ok) throw new Error("bad response");
    return await res.json();
  } catch {
    return { name: undefined, description: "", image: "", attributes: [] };
  }
}

export async function uploadNftToBackend({ name, description, walletAddress, imageFile }) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description ?? "");
  formData.append("wallet_address", walletAddress);
  formData.append("image", imageFile);

  const res = await fetch(`${env.apiUrl}/nft/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to upload NFT");
  }

  return data;
}
