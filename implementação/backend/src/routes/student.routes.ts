import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import StudentService from "../services/studentService.js";
import { randomUUID } from "crypto";
import AdvantageService from "../services/advantageService.ts";

const prisma = new PrismaClient();
const studentService = new StudentService(prisma);
const advantageService = new AdvantageService(prisma);
const route = Router();

route.get("/", async (req: Request, res: Response) => {
  const students = await studentService.getStudents();
  return res.status(200).json(students);
});

route.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const student = await studentService.getStudentByEmail(email);

  if (!student || student.password !== password) {
    return res.status(400).json({ error: "Senha invalida" });
  }
  return res.status(200).json(student);
});

route.post("/register", async (req: Request, res: Response) => {
  const { email, password, name, cpf, schoolId, rg, major, address } = req.body;

  if (
    !email ||
    !password ||
    !name ||
    !cpf ||
    !schoolId ||
    !rg ||
    !major ||
    !address
  ) {
    return res.status(400).json({ error: "Dados insuficientes" });
  }

  try {
    await studentService.createStudent({
      coins: 0,
      cpf,
      email,
      name,
      password,
      schoolId,
      rg,
      address,
      major,
      id: randomUUID(),
    });

    return res.status(201).json({ message: "Estudante criado com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar estudante" });
  }
});

route.post("/exchange/advantage", async (req: Request, res: Response) => {
  const { email, advantageId } = req.body;

  if (!email || !advantageId) {
    return res.status(400).json({ error: "Dados insuficientes" });
  }

  const student = await studentService.getStudentByEmail(email);

  if (!student) {
    return res.status(400).json({ error: "Estudante não encontrado" });
  }

  const advantage = await advantageService.getAdvantageByUUID(advantageId);

  if (!advantage) {
    return res.status(400).json({ error: "Vantagem não encontrada" });
  }

  if (student.coins < advantage.price) {
    return res.status(400).json({ error: "Saldo insuficiente" });
  }

  await studentService.updateCoins(student.id, student.coins - advantage.price);
  await studentService.addAdvantage(email, advantage);
});

export default route;
