interface Continente {
  id?: number
  nome: string
  descricao: string
  paises: Pais[]
}

interface CreateContinente {
  nome: string
  descricao: string
  paises: number[]
}
