import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import StudentService from "../services/studentService.js";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();
const studentService = new StudentService(prisma);
const route = Router();

route.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const student = await studentService.getStudentByEmail(email);

  if (!student || student.password !== password) {
    return res.status(400).json({ error: "Senha invalida" });
  }
  return res.status(200).json(student);
});

route.post("/register", async (req: Request, res: Response) => {
  const { email, password, name, cpf, schoolId } = req.body;

  if(!email || !password || !name || !cpf || !schoolId) {
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
      id: randomUUID(),
    });
  
    return res.status(201).json({ message: "Estudante criado com sucesso"});

  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar estudante" });
  }

});

export default route;
