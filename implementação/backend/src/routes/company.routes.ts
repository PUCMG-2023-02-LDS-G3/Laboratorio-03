import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import CompanyService from "../services/companyService.ts";

const prisma = new PrismaClient();
const companyService = new CompanyService(prisma);
const route = Router();

route.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const company = await companyService.getCompanyByEmail(email);

  if (!company || company.password !== password) {
    return res.status(400).json({ error: "Senha invalida" });
  }
  return res.status(200).json(company);
});

route.post("/register", async (req: Request, res: Response) => {
  const { email, password, name, cnpj } = req.body;

  if(!email || !password || !name || !cnpj) {
    return res.status(400).json({ error: "Dados insuficientes" });
  }

  const company = await companyService.createCompany({
    id: randomUUID(),
    cnpj,
    email,
    name,
    password,
  });

  return res.status(201).json(company);
});

export default route;
