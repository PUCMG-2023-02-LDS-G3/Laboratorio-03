import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import StudentService from "../services/studentService.js";
import { randomUUID } from "crypto";
import AdvantageService from "../services/advantageService.ts";
import TransactionService from "../services/transactionService.ts";

const prisma = new PrismaClient();
const studentService = new StudentService(prisma);
const advantageService = new AdvantageService(prisma);
const transactionService = new TransactionService(prisma);
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

route.post("/update", async (req: Request, res: Response) => {
  const { id, name, major, password, address } = req.body;

  if (!id || !name || !major || !address || !password) {
    return res.status(400).json({ error: "Dados insuficientes" });
  }

  const student = await studentService.getStudentByUUID(id);

  if (!student) {
    return res.status(400).json({ error: "Estudante não encontrado" });
  }

  const {school, transactions, ...rest} = student

  await studentService.updateStudent({
    ...rest,
    name,
    major,
    address,
    password,
  });

  return res.status(200).json({ message: "Estudante atualizado com sucesso" });
});

route.post("/profile", async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Dados insuficientes" });
  }

  const student = await studentService.getStudentByUUID(id);

  if (!student) {
    return res.status(400).json({ error: "Estudante não encontrado" });
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
  const { id, advantageId } = req.body;

  if (!id || !advantageId) {
    return res.status(400).json({ error: "Dados insuficientes" });
  }

  const student = await studentService.getStudentByUUID(id);

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

  await studentService.addAdvantage(student.id, {
    id: randomUUID(),
    companyId: advantage.companyId,
    name: advantage.name,
    price: advantage.price,
  });

  await studentService.updateCoins(student.id, student.coins - advantage.price);
  await transactionService.createTransaction({
    id: randomUUID(),
    quantity: advantage.price,
    studentId: student.id,
    teacherId: null,
    date: new Date(),
    description: advantage.name,
    toCompanyId: advantage.companyId,
  });
});

route.post("/transactions", async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Dados insuficientes" });
  }

  const student = await studentService.getStudentByUUID(id);

  if (!student) {
    return res.status(400).json({ error: "Estudante não encontrado" });
  }

  const transactions = await transactionService.getTransactionsByStudent(
    student.id
  );

  return res.status(200).json(transactions);
});

export default route;
