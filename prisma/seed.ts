import { PrismaClient, ApproveStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ----------------------------------------------------
  // CREATE ORGANIZATIONS
  // ----------------------------------------------------
  const orgs = await Promise.all([
    prisma.organization.create({
      data: { name: "Acme Corp", description: "Org A description" },
    }),
    prisma.organization.create({
      data: { name: "Globex Ltd", description: "Org B description" },
    }),
    prisma.organization.create({
      data: { name: "Stark Systems", description: "Org C description" },
    }),
  ]);

  // ----------------------------------------------------
  // CREATE USERS
  // ----------------------------------------------------
  const userNames = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eve",
    "Frank",
    "Grace",
    "Heidi",
    "Ivan",
    "Judy",
    "Mallory",
    "Oscar",
    "Peggy",
    "Sybil",
    "Trent",
  ];
  const roles = ["ADMIN", "MANAGER", "DEV", "QA", "HR"];

  const users = await Promise.all(
    userNames.map((name, idx) =>
      prisma.user.create({
        data: {
          displayName: name,
          role: roles[idx % roles.length],
          orgId: orgs[idx % orgs.length].id, // distribute users across orgs
        },
      }),
    ),
  );

  // ----------------------------------------------------
  // CREATE TEAMS (2 per org)
  // ----------------------------------------------------
  const teams = [];

  for (const org of orgs) {
    const created = await Promise.all([
      prisma.team.create({
        data: { name: `${org.name} Team Alpha`, orgId: org.id },
      }),
      prisma.team.create({
        data: { name: `${org.name} Team Beta`, orgId: org.id },
      }),
    ]);

    teams.push(...created);
  }

  // ----------------------------------------------------
  // ASSIGN TEAM MEMBERS (users must belong to SAME org)
  // ----------------------------------------------------
  const members = [];

  for (const team of teams) {
    const orgUsers = users.filter((u) => u.orgId === team.orgId);

    const sampleUsers = [...orgUsers]
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);

    const created = await Promise.all(
      sampleUsers.map((usr, idx) =>
        prisma.tMember.create({
          data: {
            userId: usr.id,
            teamId: team.id,
            role: idx === 0 ? "LEAD" : "MEMBER",
          },
        }),
      ),
    );

    members.push(...created);
  }

  // ----------------------------------------------------
  // PROJECTS (2 per org, assigned to existing org teams)
  // ----------------------------------------------------
  const projects = [];

  for (const org of orgs) {
    const orgTeams = teams.filter((t) => t.orgId === org.id);

    const created = await Promise.all([
      prisma.project.create({
        data: {
          orgId: org.id,
          teamId: orgTeams[0].id,
        },
      }),
      prisma.project.create({
        data: {
          orgId: org.id,
          teamId: orgTeams[1].id,
        },
      }),
    ]);

    projects.push(...created);
  }

  // ----------------------------------------------------
  // TIMESHEETS (20 randomized entries)
  // ----------------------------------------------------
  const randomStatus = () => {
    const r = Math.random();
    if (r < 0.2) return ApproveStatus.APPROVED;
    if (r < 0.4) return ApproveStatus.REJECTED;
    return ApproveStatus.PENDING;
  };

  const hour = () => Math.floor(Math.random() * 8) + 1; // 1–8

  const timesheets = [];

  for (let i = 0; i < 20; i++) {
    const usr = users[Math.floor(Math.random() * users.length)];
    const prj = projects.filter((p) => p.orgId === usr.orgId)[
      Math.floor(
        Math.random() * projects.filter((p) => p.orgId === usr.orgId).length,
      )
    ];

    timesheets.push(
      prisma.timesheet.create({
        data: {
          projectId: prj.id,
          userId: usr.id,
          status: randomStatus(),

          monday_duration: hour(),
          tuesday_duration: hour(),
          wednesday_duration: hour(),
          thursday_duration: hour(),
          friday_duration: hour(),
          saturday_duration: hour(),
          sunday_duration: hour(),
        },
      }),
    );
  }

  await Promise.all(timesheets);

  console.log("Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
