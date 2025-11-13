import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Recriando função e trigger...");

  // Exclui função anterior, se existir
  await prisma.$executeRawUnsafe(`DROP FUNCTION IF EXISTS atualizar_populacao_pais() CASCADE;`);

  // Cria função com nomes corretos (com aspas)
  await prisma.$executeRawUnsafe(`
    CREATE OR REPLACE FUNCTION atualizar_populacao_pais()
    RETURNS TRIGGER AS $$
    BEGIN
      UPDATE "Pais"
      SET populacao = (
        SELECT COALESCE(SUM(c."populacao"), 0)
        FROM "Cidade" c
        WHERE c."id_pais" = NEW."id_pais"
      )
      WHERE "id" = NEW."id_pais";
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

  // Exclui trigger antiga
  await prisma.$executeRawUnsafe(`
    DROP TRIGGER IF EXISTS trigger_atualizar_populacao ON "Cidade";
  `);

  // Cria trigger nova
  await prisma.$executeRawUnsafe(`
    CREATE TRIGGER trigger_atualizar_populacao
    AFTER INSERT OR UPDATE OR DELETE ON "Cidade"
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_populacao_pais();
  `);

  console.log("Trigger atualizada e corrigida com sucesso!");
}

main()
  .catch((e) => {
    console.error("Erro ao criar trigger:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
