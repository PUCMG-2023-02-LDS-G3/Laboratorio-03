import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import AdminService from "../services/adminService.ts";
import TeacherService from "../services/teacherService.ts";
import SchoolService from "../services/schoolService.ts";
import TransactionService from "../services/transactionService.ts";

const prisma = new PrismaClient();
const adminService = new AdminService(prisma);
const schoolService = new SchoolService(prisma);
const teacherService = new TeacherService(prisma);
const transactionService = new TransactionService(prisma);
const route = Router();

route.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const admin = await adminService.getAdminByEmail(email);

  if (!admin || admin.password !== password) {
    return res.status(400).json({ error: "Senha invalida" });
  }
  return res.status(200).json(admin);
});

route.post("/register", async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  const admin = await adminService.createAdmin({
    id: randomUUID(),
    email,
    name,
    password,
  });

  return res.status(201).json(admin);
});

route.get("/school", async (req: Request, res: Response) => {
  const schools = await schoolService.getSchools();
  return res.status(200).json(schools);
});

route.post("/school/register", async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const schoolAlreadyExists = await schoolService.getSchoolByName(name);

    if (schoolAlreadyExists) {
      return res.status(400).json({ message: `Escola ${name} ja existe` });
    }

    const school = await schoolService.createSchool({
      id: randomUUID(),
      name,
    });

    return res.status(201).json(school);
  } catch (err) {
    return res.status(500).json({ message: "Erro ao criar nova escola",  error: err });
  }
});

route.post("/school/teacher", async (req: Request, res: Response) => {
  const { schoolId } = req.body;
  const teachers = await schoolService.getTeachers(schoolId);
  return res.status(200).json(teachers);
});

route.post("/school/teacher/register", async (req: Request, res: Response) => {
  const { email, name, cpf, password, schoolId } = req.body;

  try {
    if (!email || !name || !cpf || !password || !schoolId) {
      return res.status(400).json({ message: "Dados insuficientes" });
    }
    const emailAlreadyExists = await teacherService.getTeacherByEmail(email);

    if (emailAlreadyExists) {
      return res
        .status(400)
        .json({ message: `Professor com email ${email} ja existe` });
    }

    const cpfAlreadyExists = await teacherService.getTeacherByCPF(cpf);

    if (cpfAlreadyExists) {
      return res
        .status(400)
        .json({ message: `Professor com cpf ${cpf} ja existe` });
    }

    const teacher = await teacherService.createTeacher({
      id: randomUUID(),
      email,
      password,
      name,
      cpf,
      schoolId,
      coins: 0,
    });

    return res.status(201).json(teacher);
  } catch (err) {
    return res.status(500).json(err);
  }
});

route.post("/school/teacher/addCoins", async (req: Request, res: Response) => {
  const { teacherId, amount } = req.body;

  try {
    if (!teacherId || !amount) {
      return res.status(400).json({ error: "Dados insuficientes" });
    }

    const teacher = await teacherService.getTeacherByUUID(teacherId);

    if (!teacher) {
      return res.status(400).json({ error: "Professor não encontrado" });
    }

    const updatedTeacher = await teacherService.updateCoins(teacher.id, teacher.coins + amount);
    await transactionService.createTransaction({
      id: randomUUID(),
      quantity: amount,
      studentId: null,
      teacherId: teacher.id,
      date: new Date(),
      description: "Adicionado pelo admin",
      toCompanyId: null,
    })

    return res.status(200).json(updatedTeacher);
  } catch (err) {
    return res.status(500).json({ message: "Erro com o prisma", error: err });
  }
});

export default route;
