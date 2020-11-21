import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const allInc = this.transactions.reduce(
      (accumulator: number, transaction: Transaction) => {
        if (transaction.type === 'income') {
          accumulator += transaction.value;
        }
        return accumulator;
      },
      0,
    );

    const allOut = this.transactions.reduce(
      (accumulator: number, transaction: Transaction) => {
        if (transaction.type === 'outcome') {
          accumulator += transaction.value;
        }
        return accumulator;
      },
      0,
    );

    const totalBalance = allInc - allOut;

    return { income: allInc, outcome: allOut, total: totalBalance };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
