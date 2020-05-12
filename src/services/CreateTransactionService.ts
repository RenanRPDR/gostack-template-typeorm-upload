// import AppError from '../errors/AppError';
import { getCustomRepository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoryRepository = getRepository(Category);

    let findCategoryWithSameName = await categoryRepository.findOne({
      where: {
        title: category,
      },
    });

    if (!findCategoryWithSameName) {
      findCategoryWithSameName = categoryRepository.create({
        title: category,
      });

      await categoryRepository.save(findCategoryWithSameName);
    } else {
      console.log({ message: 'This category already exist' });
    }

    /* else {
      console.log({ message: 'This category already exist' });
    } */

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category: findCategoryWithSameName,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
