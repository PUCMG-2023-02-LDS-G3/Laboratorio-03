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

  async getCompanies() {
    return await this.db.company.findMany({
      include: {
        advantages: true,
        transactions: true,
      },
    });
  }

  async updateCompany(company: Company) {
    return await this.db.company.update({
      where: {
        id: company.id,
      },
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

  async getCompanyByUUID(uuid: string) {
    return await this.db.company.findUnique({
      where: {
        id: uuid,
      },
      include: {
        advantages: true,
        transactions: true,
      },
    });
  }


  async addAdvantage(id: string, advantage: Omit<Advantage, "companyId">) {
    await this.db.company.update({
      where: {
        id: id,
      },
      data: {
        advantages: {
          create: {
            name: advantage.name,
            price: advantage.price,
            id: advantage.id,
            studentId: advantage.studentId,
          },
        },
      },
    });
  }

  async getAdvantageByUUID(companyId: string, uuid: string) {
    return await this.db.company.findUnique({
      where: {
        id: companyId,
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
            name: name,
          },
        },
      },
    });
  }


  async updateAdvantage(advantage: Advantage) {
    return await this.db.advantage.update({
      where: {
        id: advantage.id,
      },
      data: {
        ...advantage,
      },
    });
  }

  async deleteAdvantage(id: string, uuid: string) {
    await this.db.company.update({
      where: {
        id: id,
      },
      data: {
        advantages: {
          delete: {
            id: uuid,
          },
        },
      },
    });
  }

}

export default CompanyService;
