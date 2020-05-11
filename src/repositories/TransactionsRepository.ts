import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface CreateTransaction {
  id: string;
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category_id: string;
  created_at: Date;
  updated_at: Date;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    // TODO
  }
}

export default TransactionsRepository;
