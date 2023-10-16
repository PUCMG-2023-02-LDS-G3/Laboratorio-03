import { Advantage, PrismaClient } from "@prisma/client";
import { Student } from "../models/index.js";

class StudentService {
  db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async getStudents() {
    return await this.db.student.findMany({
      include: {
        school: true,
        transactions: true,
      },
    });
  }

  async createStudent(student: Student) {
    await this.db.student.create({
      data: {
        ...student,
      },
    });
  }

  async getStudentByEmail(email: string) {
    return await this.db.student.findUnique({
      where: {
        email: email,
      },
      include: {
        school: true,
        transactions: true,
      },
    });
  }

  async getStudentByUUID(uuid: string) {
    return await this.db.student.findUnique({
      where: {
        id: uuid,
      },
      include: {
        school: true,
        transactions: true,
      },
    });
  }

  async updateCoins(id: string, coins: number) {
    await this.db.student.update({
      where: {
        id: id,
      },
      data: {
        coins: coins,
      },
    });
  }

  async addAdvantage(email: string, advantage: Advantage) {
    await this.db.student.update({
      where: {
        email: email
      },
      data: {
        advantages: {
          create: {
            ...advantage
          }
        }
      }
    })
  }
}

export default StudentService;
