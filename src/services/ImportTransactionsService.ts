import { getCustomRepository, getRepository, In } from 'typeorm';
import csvParse from 'csv-parse';
import fs from 'fs';

import Transaction from '../models/Transaction';
// import Category from '../models/Category';

// import TransactionRepository from '../repositories/TransactionsRepository';

interface CsvTransaction {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class ImportTransactionsService {
  async execute(filePath: string): Promise<Transaction[]> {
    const contactsReadStream = fs.createReadStream(filePath);

    const parsers = csvParse({
      from_line: 2,
    });

    const parseCSV = contactsReadStream.pipe(parsers);

    const transactions: CsvTransaction[] = [];
    const categories: string[] = [];

    parseCSV.on('data', async line => {
      const [title, type, value, category] = line.map((cell: string) =>
        cell.trim(),
      );

      if (!title || !type || !value) return;

      categories.push(category);

      transactions.push({ title, type, value, category });
    });

    await new Promise(resolve => parseCSV.on('end', resolve));

    const existentCategories = await categoriesRepository.find({
      where: {
        title: In(categories),
      },
    });

    console.log(existentCategories);
    console.log(transactions);
    // const existentCategoriesTitles = existentCategories.map(
    //   (category: Category) => category.title,
    // );

    // const addCategoryTitles = categories.filter(
    //   category => !existentCategoriesTitles.includes(category),
    // );

    // console.log(addCategoryTitles);
  }
}

export default ImportTransactionsService;
