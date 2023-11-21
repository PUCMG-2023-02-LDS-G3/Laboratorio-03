import { PrismaClient, School, Teacher } from "@prisma/client";

class AdvantageService {
  db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async getAdvantageByUUID(uuid: string) {
    return await this.db.advantage.findUnique({
      where: {
        id: uuid,
      },
      include: {
        Company: true,
      }
    });
  }
}

export default AdvantageService;
