import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: string;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransactionDTO): Transaction {
    const { total } = this.transactionsRepository.getBalance();
    console.log('[Balance]', this.transactionsRepository.getBalance());

    if (type === 'outcome' && total < value) {
      throw Error('Limite excedido');
    }

    const newTransaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return newTransaction;
  }
}

export default CreateTransactionService;
