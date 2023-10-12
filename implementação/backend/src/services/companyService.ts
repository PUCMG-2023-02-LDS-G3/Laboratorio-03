import { Advantage, Company, PrismaClient } from "@prisma/client";
import { Student } from "../models/index.js";

class CompanyService {
  db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async createCompany(company: Company) {
    await this.db.company.create({
      data: {
        ...company,
      },
    });
  }

  async getCompanyByEmail(email: string) {
    return await this.db.company.findUnique({
      where: {
        email: email,
      },
      include: {
        advantages: true,
        transactions: true,
      },
    });
  }

    async getCompanyByUUID(email: string) {
    return await this.db.company.findUnique({
      where: {
        email: email,
      },
      include: {
        advantages: true,
        transactions: true,
      },
    });
  }

  async addAdvantage(id: string, advantage: Advantage) {
    await this.db.company.update({
      where: {
        id: id,
      },
      data: {
        advantages: {
          create: {
            ...advantage
          }
        },
      },
    });
  }

  async getAdvantageByUUID(id: string, uuid: string) {
    return await this.db.company.findUnique({
      where: {
        id: id,
      },
      select: {
        advantages: {
          where: {
            id: uuid,
          },
        },
      },
    });
  }

  async getAdvantageByName(id: string, name: string) {
    return await this.db.company.findUnique({
      where: {
        id: id,
      },
      select: {
        advantages: {
          where: {
            name: name
          }
        },
      },
    });
  }

}

export default CompanyService;
