import { PrismaClient, Admin } from "@prisma/client";

class AdminService {
  db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async getAdminByEmail(email: string) {
    return await this.db.admin.findUnique({
      where: {
        email: email,
      },
    });
  }

  async createAdmin(admin: Admin) {
    await this.db.admin.create({
      data: {
        ...admin,
      },
    });
  }

}

export default AdminService;
