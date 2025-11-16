import type { CreatePaisDTO } from "../../schemas/paisSchemas";


export async function createPais(data: CreatePaisDTO) {
  const response = await fetch("http://localhost:3000/createPais", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => null);
    throw new Error(err?.message || "Failed to create country");
  }

  return response.json();
}

export async function getAllCountries() {
  const response = await fetch("http://localhost:3000/paises");
  if (!response.ok) throw new Error("Failed to fetch countries");
  return response.json();
}
