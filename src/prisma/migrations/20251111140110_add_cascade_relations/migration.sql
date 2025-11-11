-- DropForeignKey
ALTER TABLE "public"."Cidade" DROP CONSTRAINT "Cidade_id_pais_fkey";

-- DropForeignKey
ALTER TABLE "public"."Pais" DROP CONSTRAINT "Pais_id_continente_fkey";

-- AddForeignKey
ALTER TABLE "Pais" ADD CONSTRAINT "Pais_id_continente_fkey" FOREIGN KEY ("id_continente") REFERENCES "Continente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cidade" ADD CONSTRAINT "Cidade_id_pais_fkey" FOREIGN KEY ("id_pais") REFERENCES "Pais"("id") ON DELETE CASCADE ON UPDATE CASCADE;
