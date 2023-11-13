import { PrismaClient, School, StudentAdvantages, Teacher } from "@prisma/client";

class StudentAdvantagesService {
  db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async createStudentAdvantages(studentAdvantages: StudentAdvantages) {
    await this.db.studentAdvantages.create({
      data: {
        ...studentAdvantages,
      },
    });
  }

  async getStudentAdvantages() {
    return await this.db.studentAdvantages.findMany({
      include: {
        Student: true,
        Advantage: true,
      },
    });
  }

  async getStudentAdvantagesByStudentId(studentId: string) {
    return await this.db.studentAdvantages.findMany({
      where: {
        studentId: studentId,
      },
      include: {
        Student: true,
        Advantage: true,
      },
    });
  }

  async getStudentAdvantagesByAdvantageId(advantageId: string) {
    return await this.db.studentAdvantages.findMany({
      where: {
        advantageId: advantageId,
      },
      include: {
        Student: true,
        Advantage: true,
      },
    });
  }

}

export default StudentAdvantagesService;
