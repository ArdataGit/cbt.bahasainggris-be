import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const paket = await prisma.paket.findUnique({
    where: { id: 2 },
    include: { readings: true }
  });
  console.log('Paket 2 Readings:', JSON.stringify(paket.readings, null, 2));
  
  const allReadings = await prisma.reading.findMany({
    include: { pakets: true }
  });
  console.log('All Readings with Pakets:', JSON.stringify(allReadings, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
