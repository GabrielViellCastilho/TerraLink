import apiClient from "../apiClient";

export interface AddPaisRequest {
  continenteId: number;
  paisId: number;
}

export async function addPaisAoContinente(data: AddPaisRequest) {
  try {
    const response = await apiClient.post("/addPais", data);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao adicionar país ao continente:", error);
    throw error;
  }
}
