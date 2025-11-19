import type { CreatePaisDTO, UpdatePaisDTO } from "../../schemas/paisSchemas";
import type { Pais, PaisesResponse } from "../../types/paisTypes";

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

export interface PaisesFilters {
  id_continente?: number;
  idioma_oficial?: string;
  id?: number;
}

export async function getAllPaises(
  page: number,
  limit: number,
  filters?: PaisesFilters
): Promise<PaisesResponse> {

  let url = `http://localhost:3000/paises?page=${page}&limit=${limit}`;

  if (filters) {
    const queryParams = new URLSearchParams();
    if (filters.id_continente !== undefined) {
      queryParams.append("id_continente", String(filters.id_continente));
    }
    if (filters.idioma_oficial) {
      queryParams.append("idioma_oficial", filters.idioma_oficial);
    }
    const queryString = queryParams.toString();
    if (queryString) {
      url += `&${queryString}`;
    }
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch countries");
  }

  return res.json();
}

export async function deletePais(id: number) {
  const response = await fetch(`http://localhost:3000/pais/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete country with ID ${id}`);
  }

  return response.json();
}

export async function updatePais(id: number, data: UpdatePaisDTO) {
  const response = await fetch(`http://localhost:3000/pais/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => null);
    throw new Error(err?.message || "Failed to update country");
  }

  return response.json();
}

export async function getPaisById(id: number): Promise<Pais> {
  try {
    const response = await fetch(`http://localhost:3000/pais/${id}`);

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      throw new Error(err?.message || "Failed to fetch country");
    }

    const data = await response.json();

    return {
      id: data.id,
      nome: data.nome,
      populacao: data.populacao,
      idioma_oficial: data.idioma_oficial,
      moeda: data.moeda,
      id_continente: data.id_continente,
      url_bandeira: data.url_bandeira ?? null,
      pib_per_capita: data.pib_per_capita ?? null,
      inflacao: data.inflacao ?? null,
      continente: data.continente,
    };
  } catch (error) {
    console.error("Error fetching country by ID:", error);
    throw error;
  }
}

export async function getPaisCount(): Promise<number> {
  const res = await fetch("http://localhost:3000/paises/count");

  if (!res.ok) {
    throw new Error("Failed to fetch country count");
  }

  const data = await res.json();
  return data.total;
}

export async function getTop5PibPerCapita() {
  const res = await fetch("http://localhost:3000/paises/top/pib");

  if (!res.ok) {
    throw new Error("Failed to fetch top 5 GDP per capita countries");
  }

  return res.json();
}

export async function getTop5Inflacao() {
  const res = await fetch("http://localhost:3000/paises/top/inflacao");

  if (!res.ok) {
    throw new Error("Failed to fetch top 5 inflation countries");
  }

  return res.json();
}

export async function getTotalWorldPopulation() {
  const res = await fetch("http://localhost:3000/paises/populacao/total");

  if (!res.ok) {
    throw new Error("Failed to fetch total world population");
  }

  const data = await res.json();
  return data.total;
}
