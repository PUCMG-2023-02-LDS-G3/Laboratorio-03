import { PrismaClient, Teacher } from "@prisma/client";

class TeacherService {
  db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async getTeachers() {
    return await this.db.teacher.findMany({
      include: {
        school: true,
      },
    });
  }

  async createTeacher(teacher: Teacher) {
    return await this.db.teacher.create({
      data: {
        ...teacher,
      },
    });
  }

  async getTeacherByUUID(uuid: string) {
    return await this.db.teacher.findUnique({
      where: {
        id: uuid,
      },
      include: {
        school: true,
      },
    });
  }

  async getTeacherByEmail(email: string) {
    return await this.db.teacher.findUnique({
      where: {
        email: email,
      },
      include: {
        school: true,
      },
    });
  }

  async getTeacherByCPF(cpf: string) {
    return await this.db.teacher.findUnique({
      where: {
        cpf: cpf,
      },
      include: {
        school: true,
      },
    });
  }

  async updateCoins(id: string, coins: number) {
    await this.db.teacher.update({
      where: {
        id: id,
      },
      data: {
        coins: coins,
      },
    });
  }

  async updateTeacher(teacher: Teacher) {
    return await this.db.teacher.update({
      where: {
        id: teacher.id,
      },
      data: {
        ...teacher,
      },
    });
  }

  async deleteTeacher(uuid: string) {
    return await this.db.teacher.delete({
      where: {
        id: uuid,
      },
    });
  }
}

export default TeacherService;
