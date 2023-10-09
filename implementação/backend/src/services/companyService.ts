import { Company, PrismaClient } from "@prisma/client";
import { Student } from "../models/index.js";

class CompanyService {
  db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async createCompany (company: Company) {
    await this.db.company.create({
      data: {
       ...company 
      }
    })
  }

  async getCompanyByEmail (email: string) {
    return await this.db.company.findUnique({
      where: {
        email: email
      },
      include: {
        advantages: true,
        transactions: true
    }
    })
  }
    
}

export default CompanyService;
