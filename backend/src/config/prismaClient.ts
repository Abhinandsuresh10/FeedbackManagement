import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); 

export const connectprismaPgDB = async () => {
    try {
      await prisma.$connect();
      console.log("PostgreSQL connected");
    } catch (error) {
      console.error("Error connecting to PostgreSQL:", error);
      process.exit(1);
    }
  }

  export interface IUser {
    id?: number;
    name: string;
    email: string;
    password: string;
    role: string;
  }

export default prisma;