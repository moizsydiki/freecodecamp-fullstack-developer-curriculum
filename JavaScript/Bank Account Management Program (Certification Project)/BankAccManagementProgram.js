class BankAccount {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  }

  deposit(amount) {
    if (amount > 0) {
      this.transactions.push({
        type: "deposit",
        amount: amount,
      });

      this.balance += amount;

      return `Successfully deposited $${amount}. New balance: $${this.balance}`;
    } else {
      return "Deposit amount must be greater than zero.";
    }
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.balance) {
      this.transactions.push({
        type: "withdraw",
        amount: amount,
      });

      this.balance -= amount;

      return `Successfully withdrew $${amount}. New balance: $${this.balance}`;
    } else {
      return `Insufficient balance or invalid amount.`;
    }
  }

  checkBalance() {
    return `Current balance: $${this.balance}`;
  }

  listAllDeposits() {
    const desposits = this.transactions
      .filter((transaction) => transaction.type === "deposit")
      .map((transaction) => transaction.amount);

    return `Deposits: ${desposits.join(",")}`;
  }

  listAllWithdrawals() {
    const withdrawals = this.transactions
      .filter((transaction) => transaction.type === "withdraw")
      .map((transaction) => transaction.amount);

    return `Withdrawals: ${withdrawals.join(",")}`;
  }
}

const myAccount = new BankAccount();

myAccount.deposit(200);
myAccount.deposit(150);
myAccount.withdraw(50);
myAccount.withdraw(25);
myAccount.deposit(100);
console.log(myAccount.listAllDeposits());
console.log(myAccount.listAllWithdrawals());
