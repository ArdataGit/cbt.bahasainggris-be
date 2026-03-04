import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const updatedPaket = await prisma.paket.update({
    where: { id: 2 },
    data: {
      readings: {
        connect: { id: 5 } // Reading 2
      }
    },
    include: { readings: true }
  });
  console.log('Updated Paket 2 Readings:', JSON.stringify(updatedPaket.readings, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
