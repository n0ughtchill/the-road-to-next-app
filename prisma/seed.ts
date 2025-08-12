import { hash } from "@node-rs/argon2";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

const users = [
  {
    username: "admin",
    email: "admin@example.com",
  },
  {
    username: "user",
    email: "brian.stempien@pm.me",
  },
];

const tickets = [
  {
    title: "ticket 1",
    content: "This is the first ticket from the database",
    status: "DONE" as const,
    bounty: 499,
    deadline: new Date().toISOString().split("T")[0],
  },
  {
    title: "ticket 2",
    content: "This is the second ticket from the database",
    status: "OPEN" as const,
    bounty: 399,
    deadline: new Date().toISOString().split("T")[0],
  },
  {
    title: "ticket 3",
    content: "This is the third ticket database",
    status: "IN_PROGRESS" as const,
    bounty: 599,
    deadline: new Date().toISOString().split("T")[0],
  },
];

const seed = async () => {
  const t0 = performance.now();
  console.log("DB Seed: Started...");

  await prisma.user.deleteMany();
  await prisma.ticket.deleteMany();

  const passwordHash = await hash("password");

  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({
      ...user,
      passwordHash,
    })),
  });

  await prisma.ticket.createMany({
    data: tickets.map((ticket) => ({
      ...ticket,
      userId: dbUsers[0].id,
    })),
  });
  const t1 = performance.now();
  console.log(`DB Seed: Finished (${t1 - t0}ms)`);
};

seed();
