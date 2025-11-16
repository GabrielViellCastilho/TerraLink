import type { ContinenteResponse, CreateContinenteDTO } from "../../types/continenteTypes";


export async function createContinente(data: CreateContinenteDTO) {
  const response = await fetch("http://localhost:3000/createContinente", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create continent");
  }

  return await response.json();
}

export async function getAllContinentes(page: number, limit: number): Promise<ContinenteResponse> {
  const url = `http://localhost:3000/continentes?page=${page}&limit=${limit}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch continents");
  }

  return res.json();
}

export async function deleteContinente(id: number) {
  const response = await fetch(`http://localhost:3000/continente/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Erro ao deletar continente com ID ${id}`);
  }

  return response.json();
}

export async function updateContinente(id: number, data: { nome: string; descricao: string }) {
  const response = await fetch(`http://localhost:3000/continente/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar continente");
  }

  return response.json();
}

export async function getContinenteById(id: number) {
  try {
    const response = await fetch(`http://localhost:3000/continente/${id}`);

    if (!response.ok) {
      throw new Error("Erro ao buscar continente");
    }

    const data = await response.json();

    return {
      id: data.id,
      nome: data.nome,
      descricao: data.descricao,
      paises: data.paises || []
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getOrCreateContinentId(name: string): Promise<number> {
  try {
    const response = await fetch("http://localhost:3000/getOrCreateContinent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar/criar continente: ${response.statusText}`);
    }

    const data = await response.json();
    return data.id;
  } catch (err: any) {
    console.error(err);
    throw new Error(err.message || "Erro ao acessar o backend");
  }
}
