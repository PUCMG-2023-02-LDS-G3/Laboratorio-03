import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import SchoolService from "../services/schoolService.ts";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();
const schoolService = new SchoolService(prisma);
const route = Router();

route.get("/", async (req: Request, res: Response) => {
  const schools = await schoolService.getSchools();
  return res.status(200).json(schools);
});

route.post("/register", async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Dados insuficientes" });
  }

  try {
    await schoolService.createSchool({
      id: randomUUID(),
      name,
    });

    return res.status(201).json({ message: "Escola criada com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar escola" });
  }
});

export default route;
