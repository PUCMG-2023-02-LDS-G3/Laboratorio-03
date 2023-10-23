import { PrismaClient, Transaction } from "@prisma/client";

class TransactionService {
  db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async getTransactionsByStudent(uuid: string) {
    return await this.db.transaction.findMany({
      where: {
        studentId: uuid,
      },
    });
  }

  async getTransactionsByTeacher(uuid: string) {
    return await this.db.transaction.findMany({
      where: {
        teacherId: uuid,
      },
    });
  }

  async getTransactionByCompany(uuid: string) {
    return await this.db.transaction.findMany({
      where: {
        toCompanyId: uuid,
      },
    });
  }

  async createTransaction(transaction: Transaction) {
    await this.db.transaction.create({
      data: {
        ...transaction,
      },
    });
  }
}

export default TransactionService;
