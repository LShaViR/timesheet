const { PrismaClient, ApproveStatus } = require("@prisma/client");

const prisma = new PrismaClient();

async function wipe() {
  await prisma.timesheet.deleteMany();
  await prisma.project.deleteMany();
  await prisma.tMember.deleteMany();
  await prisma.team.deleteMany();
  await prisma.user.deleteMany();
  await prisma.organization.deleteMany();
}

wipe()
  .then(() => {
    console.log("Database wiped");
  })
  .catch((e) => {
    console.error(e);
  });
