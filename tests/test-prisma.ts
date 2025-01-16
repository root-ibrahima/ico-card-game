import prisma from "@/lib/prisma";

async function main() {
  // Ajouter une nouvelle salle
  const newRoom = await prisma.room.create({
    data: {
      host: "Test Host", 
      status: "WAITING",
    },
  });
  console.log("Nouvelle salle créée :", newRoom);

  // Récupérer toutes les salles
  const rooms = await prisma.room.findMany();
  console.log("Salles dans la base de données :", rooms);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect(); // Fermer proprement la connexion
  });
