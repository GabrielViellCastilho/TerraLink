import type { CidadeUpdateForm } from "../../pages/City";
import type { Cidade, CreateCidadeDTO, PaginatedCidades } from "../../types/cidadeType";

export async function createCidade(data: CreateCidadeDTO) {

  if (!data.nome) throw new Error("City name is required");
  if (data.populacao <= 0) throw new Error("Population must be a positive number");
  if (!data.id_pais || data.id_pais <= 0) throw new Error("Country ID is required and must be positive");

  const res = await fetch("http://localhost:3000/createCidade", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(errorBody?.message || "Failed to create city");
  }

  return res.json();
}

export const getAllCidades = async (
  page: number = 1,
  limit: number = 10,
  paisId?: number,
  continenteId?: number
): Promise<PaginatedCidades> => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("limit", limit.toString());
  if (paisId) params.append("paisId", paisId.toString());
  if (continenteId) params.append("continenteId", continenteId.toString());

  const response = await fetch(`http://localhost:3000/cidades?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch cities: ${response.statusText}`);
  }

  const data: PaginatedCidades = await response.json();
  return data;
};


export async function deleteCidade(id: number) {
  const response = await fetch(`http://localhost:3000/cidade/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete city with ID ${id}`);
  }

  return response.json();
}

export async function updateCidade(id: number, cidade: CidadeUpdateForm) {
  const response = await fetch(`http://localhost:3000/cidade/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cidade),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to update city");
  }

  return response.json();
}

import type { Pais } from "../../types/paisTypes";

export async function getCidadeById(id: number): Promise<Cidade> {
  try {
    const response = await fetch(`http://localhost:3000/cidade/${id}`);
    if (!response.ok) throw new Error("Failed to fetch city");

    const data = await response.json();

    const cidade: Cidade = {
      id: data.id,
      nome: data.nome,
      populacao: data.populacao,
      latitude: data.latitude,
      longitude: data.longitude,
      pais: {
        id: data.pais.id,
        nome: data.pais.nome,
        populacao: data.pais.populacao,
        idioma_oficial: data.pais.idioma_oficial,
        moeda: data.pais.moeda,
        id_continente: data.pais.id_continente,
        url_bandeira: data.pais.url_bandeira,
        pib_per_capita: data.pais.pib_per_capita,
        inflacao: data.pais.inflacao,
      } as Pais,
    };

    return cidade;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCidadeCount() {
  const res = await fetch(`http://localhost:3000/cidades/count`);

  if (!res.ok) {
    throw new Error("Failed to fetch city count");
  }

  const data = await res.json();
  return data.total;
}
