import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const verifyIfTitleExist = await transactionsRepository.findOne(id);

    if (!verifyIfTitleExist) {
      throw new AppError('Transaction does not exist');
    }
    await transactionsRepository.remove(verifyIfTitleExist);
  }
}

export default DeleteTransactionService;
