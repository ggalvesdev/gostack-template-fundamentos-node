import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TranscationDTO {
  title: string;
  value: number;
  type: string;
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
    const balance = { income: 0, outcome: 0, total: 0 } as Balance;
    this.transactions.forEach(item => {
      if (item.type === 'income') {
        balance.income += item.value;
      } else {
        balance.outcome += item.value;
      }
    });

    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create({ title, value, type }: TranscationDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
