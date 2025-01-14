import prisma from "@/lib/prisma"; 

async function main() {
  // Crée une nouvelle salle
  const room = await prisma.room.create({
    data: {
      host: "Alice",
      status: "WAITING",
    },
  });

  console.log("Nouvelle salle créée :", room);

  // Liste toutes les salles
  const rooms = await prisma.room.findMany();
  console.log("Toutes les salles :", rooms);
}

main()
  .catch((e) => {
    console.error("Erreur :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
