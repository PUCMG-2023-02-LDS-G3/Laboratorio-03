import { Router, Request, Response } from "express";
import { Advantage, PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import CompanyService from "../services/companyService.ts";

const prisma = new PrismaClient();
const companyService = new CompanyService(prisma);
const route = Router();

route.get("/", async (req: Request, res: Response) => {
  const companies = await companyService.getCompanies();
  return res.status(200).json(companies);
});

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

  if (!email || !password || !name || !cnpj) {
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

route.post("/profile", async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Dados insuficientes" });
  }

  const company = await companyService.getCompanyByUUID(id);

  if (!company) {
    return res.status(400).json({ error: "Empresa não encontrada" });
  }

  return res.status(200).json(company);
});

route.post("/profile/update", async (req: Request, res: Response) => {
  const { id, name, password } = req.body;

  if (!id || !name || !password) {
    return res.status(400).json({ error: "Dados insuficientes" });
  }

  const oldCompany = await companyService.getCompanyByUUID(id);

  if(!oldCompany) {
    return res.status(400).json({ error: "Empresa não encontrada" });
  }

  const company = await companyService.updateCompany({...oldCompany, name, password});

  return res.status(201).json(company);
});

route.post("/advantage", async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Dados insuficientes" });
  }

  const company = await companyService.getCompanyByUUID(id);

  if (!company) {
    return res.status(400).json({ error: "Empresa não encontrada" });
  }

  return res.status(200).json(company.advantages);
});

route.post("/advantage/register", async (req: Request, res: Response) => {
  const { companyId, name, price } = req.body;

  if (!companyId || !name || !price) {
    return res.status(400).json({ error: "Dados insuficientes" });
  }

  const advantage = await companyService.addAdvantage(companyId, {
    id: randomUUID(),
    name,
    price,
    studentId: null,
  });

  return res.status(201).json(advantage);
});

route.post("/advantage/update", async (req: Request, res: Response) => {
  const { companyId, id, name, price } = req.body;

  if (!companyId || !id || !name || !price) {
    return res.status(400).json({ error: "Dados insuficientes" });
  }

  const oldAdvantage = await companyService.getAdvantageByUUID(companyId, id);

  const editedAdvantage = oldAdvantage?.advantages
    .filter((advantage) => advantage.id === id)
    .reduce((acc, advantage) => {
      return {
        ...advantage,
        name,
        price,
      };
    }, {} as Advantage);

  if (!editedAdvantage) {
    return res.status(400).json({ error: "Vantagem não encontrada" });
  }

  const advantage = await companyService.updateAdvantage(editedAdvantage);

  return res.status(201).json(advantage);
});

route.post("/advantage/delete", async (req: Request, res: Response) => {
  const { companyId, id } = req.body;

  if (!companyId || !id) {
    return res.status(400).json({ error: "Dados insuficientes" });
  }

  const advantage = await companyService.deleteAdvantage(companyId, id);

  return res.status(201).json(advantage);
});

export default route;
