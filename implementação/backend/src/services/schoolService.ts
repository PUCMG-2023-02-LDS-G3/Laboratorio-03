import { PrismaClient, School, Teacher } from "@prisma/client";

class SchoolService {
  db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async createSchool(school: School) {
    await this.db.school.create({
      data: {
        ...school,
      },
    });
  }

  async getSchools() {
    return await this.db.school.findMany({
      include: {
        students: true,
        teachers: true,
      },
    });
  }

  async getSchoolByName(name: string) {
    return await this.db.school.findFirst({
      where: {
        name: name,
      },
    });
  }

  async getSchoolByUUID(uuid: string) {
    return await this.db.school.findFirst({
      where: {
        id: uuid,
      },
    });
  }

  async updateSchool(school: School) {
    return await this.db.school.update({
      where: {
        id: school.id,
      },
      data: {
        ...school,
      },
    });
  }

  async deleteSchool(uuid: string) {
    return await this.db.school.delete({
      where: {
        id: uuid,
      },
    });
  }

  async getTeachers(id: string) {
    return await this.db.school.findUnique({
      where: {
        id: id,
      },
      select: {
        teachers: true,
      },
    });
  }

  async getStudents(id: string) {
    return await this.db.school.findUnique({
      where: {
        id: id,
      },
      select: {
        students: true,
      },
    });
  }

  async addTeacher(id: string, teacher: Teacher) {
    await this.db.school.update({
      where: {
        id: id,
      },
      data: {
        teachers: {
          create: {
            ...teacher,
          },
        },
      },
    });
  }
}

export default SchoolService;
