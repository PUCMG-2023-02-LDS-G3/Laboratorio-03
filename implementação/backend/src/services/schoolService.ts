import { PrismaClient, School } from "@prisma/client";

class SchollService {
  db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async createSchool (school: School) {
    await this.db.school.create({
      data: {
       ...school 
      }
    })
  }

  async getSchools () {
    return await this.db.school.findMany()
  }
    
}

export default SchollService;
