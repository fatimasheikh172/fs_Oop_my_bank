#! /usr/bin/env node
import inquirer from "inquirer";
// Bank account class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit money
    withdram(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`withdraw of $${amount} successful, Remaining balance is $${this.balance}`);
        }
        else {
            console.log("Insufficient balance.");
        }
    }
    // Credit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} successfull. Remaining balance: $${this.balance} `);
    }
    // Check balance
    checkBalance() {
        console.log(`Current balance $${this.balance}`);
    }
}
// Customer class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lasName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lasName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// Create bank account
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000)
];
// create customers 
const customers = [
    new Customer("Fatima", "Asad", "Female", 18, 314543892, accounts[0]),
    new Customer("Rabia", "Asad", "Female", 16, 314543892, accounts[1]),
    new Customer("Ibrahim", "Asad", "male", 15, 306543892, accounts[2])
];
// function to interact with bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "account",
            type: "number",
            message: "Enter your account Number"
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.account);
        if (customer) {
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "Select an operation",
                    choices: ["Deposit", "Withdraw", "check balance", "Exit"]
                }]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "enter the amount to deposit:"
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdramAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "enter the amount to Withdraw:"
                    });
                    customer.account.withdram(withdramAmount.amount);
                    break;
                case "check balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting the program");
                    console.log("\n Thank you for using our bank services.");
                    return;
            }
        }
        else {
            console.log("Invalid account number.Please try again");
        }
    } while (true);
}
service();
