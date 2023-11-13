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

  async updateStudent(student: Student) {
    return await this.db.student.update({
      where: {
        id: student.id,
      },
      data: {
        ...student,
      },
    });
  }

  async updateCoins(id: string, coins: number) {
    return await this.db.student.update({
      where: {
        id: id,
      },
      data: {
        coins: coins,
      },
      include: {
        school: true,
        transactions: true,
        StudentAdvantages: true
      },
    });
  }

  async addAdvantage(id: string, advantage: Omit<Advantage, "studentId">) {
    await this.db.student.update({
      where: {
        id: id
      },
      data: {
        advantages: {
          create: {
            ...advantage,
          },
        },
      },
    });
  }
}

export default StudentService;
