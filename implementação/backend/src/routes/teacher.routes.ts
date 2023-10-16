import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import TeacherService from "../services/teacherService.ts";
import StudentService from "../services/studentService.ts";

const prisma = new PrismaClient();
const teacherService = new TeacherService(prisma);
const studentService = new StudentService(prisma);
const route = Router();

route.post("/login", async (req: Request, res: Response) => {
  const {email, password} = req.body

  if(!email || !password) {
    return res.status(400).json({error: "Dados insuficientes"})
  }


  const teacher = await teacherService.getTeacherByEmail(email)

  if(!teacher) {
    return res.status(400).json({error: "Professor não encontrado"})
  }

  return res.status(200).json(teacher)
})

route.post("/exchange/coins", async (req: Request, res: Response) => {
  const { email, quantity, studentId } = req.body;

  if (!email || !quantity || !studentId) {
    return res.status(400).json({ error: "Dados insuficientes" });
  }

  const teacher = await teacherService.getTeacherByEmail(email);

  if (!teacher) {
    return res.status(400).json({ error: "Professor não encontrado" });
  }

  if (teacher.coins < quantity) {
    return res.status(400).json({ error: "Saldo insuficiente" });
  }

  const student = await studentService.getStudentByUUID(studentId);

  if (!student) {
    return res.status(400).json({ error: "Estudante não encontrado" });
  }

  await teacherService.updateCoins(teacher.id, teacher.coins - quantity);
  await studentService.updateCoins(student.id, student.coins + quantity);

  return res.status(200).json({ message: "Troca realizada com sucesso" });
});



export default route;
