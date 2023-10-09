import { PrismaClient } from "@prisma/client";
import { Student } from "../models/index.js";

class StudentService {
  db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async createStudent (student: Student) {
    await this.db.student.create({
      data: {
       ...student 
      }
    })
  }

  async getStudentByEmail (email: string) {
    return await this.db.student.findUnique({
      where: {
        email: email
      },
      include: {
        school: true,
        transactions: true
      }
    })
  }
    
}

export default StudentService;
