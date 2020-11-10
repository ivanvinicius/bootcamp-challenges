import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface ITransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
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
    const sum = this.transactions.reduce(
      (accumulator: Omit<Balance, 'total'>, trasaction: Transaction) => {
        switch (trasaction.type) {
          case 'income':
            accumulator.income += trasaction.value;
            break;
          case 'outcome':
            accumulator.outcome += trasaction.value;
            break;
          default:
            break;
        }

        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
      },
    );

    return {
      income: sum.income,
      outcome: sum.outcome,
      total: sum.income - sum.outcome,
    };
  }

  public create(data: ITransactionDTO): Transaction {
    const transaction = new Transaction(data);

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
