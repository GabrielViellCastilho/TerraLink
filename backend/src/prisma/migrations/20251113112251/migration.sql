-- CreateTable
CREATE TABLE "Continente" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,

    CONSTRAINT "Continente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pais" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "populacao" INTEGER NOT NULL,
    "idioma_oficial" VARCHAR(100) NOT NULL,
    "moeda" VARCHAR(100) NOT NULL,
    "id_continente" INTEGER NOT NULL,

    CONSTRAINT "Pais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cidade" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "populacao" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "id_pais" INTEGER NOT NULL,

    CONSTRAINT "Cidade_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pais" ADD CONSTRAINT "Pais_id_continente_fkey" FOREIGN KEY ("id_continente") REFERENCES "Continente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cidade" ADD CONSTRAINT "Cidade_id_pais_fkey" FOREIGN KEY ("id_pais") REFERENCES "Pais"("id") ON DELETE CASCADE ON UPDATE CASCADE;
