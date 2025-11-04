interface Pais {
  id?: number
  nome: string
  populacao: number
  idiomaOficial: string
  moeda: string
  continenteId: number
  continente: Continente
  cidades: Cidade[]
}