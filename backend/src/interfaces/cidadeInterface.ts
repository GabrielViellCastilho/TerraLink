interface Cidade {
  id?: number
  nome: string
  populacao: number
  latitude: number
  longitude: number
  paisId: number
  pais: Pais
}
