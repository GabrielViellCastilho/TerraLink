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


export async function getAllPaises(page: number, limit: number): Promise<PaisesResponse> {
  const url = `http://localhost:3000/paises?page=${page}&limit=${limit}`;

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
    throw new Error(`Erro ao deletar pais com ID ${id}`);
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
    throw new Error(err?.message || "Erro ao atualizar país");
  }

  return response.json();
}

export async function getPaisById(id: number): Promise<Pais> {
  try {
    const response = await fetch(`http://localhost:3000/pais/${id}`);

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      throw new Error(err?.message || "Erro ao buscar país");
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
    console.error("Erro ao buscar país por ID:", error);
    throw error;
  }
}