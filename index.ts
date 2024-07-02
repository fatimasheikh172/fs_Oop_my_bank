#! /usr/bin/env node

import inquirer from "inquirer"

// Bank Account interface

interface BankAccount{
    accountNumber: number
    balance:number
    withdram(amount : number):void
    deposit(amount:number) : void
    checkBalance():void
}
// Bank account class

class   BankAccount implements BankAccount{
    accountNumber: number
    balance: number

    constructor(accountNumber:number,balance:number){
        this.accountNumber = accountNumber
        this.balance = balance
    }
// Debit money

withdram(amount: number): void {
    if(this.balance >= amount){
        this.balance-= amount
        console.log(`withdraw of $${amount} successful, Remaining balance is $${this.balance}`)
    }else{
        console.log("Insufficient balance.")
    }
}
// Credit money

deposit(amount: number): void {
    if(amount > 100){
        amount -=1
    }this.balance += amount
    console.log(`Deposit of $${amount} successfull. Remaining balance: $${this.balance} `); 
}
// Check balance
checkBalance(): void {
    console.log(`Current balance $${this.balance}`)
}
}

// Customer class
class Customer{
    firstName:string
    lastName:string
    gender:string
    age:number
    mobileNumber:number
    account:BankAccount

    constructor(firstName:string,lasName:string,gender:string,age:number,mobileNumber:number,account:BankAccount){
        this.firstName = firstName
        this.lastName = lasName
        this.gender = gender
        this.age = age
        this.mobileNumber = mobileNumber
        this.account = account
    }
}

// Create bank account

const accounts: BankAccount[] = [
    new BankAccount (1001,500),
    new BankAccount (1002,1000),
    new BankAccount (1003,2000)
]

// create customers 

const customers: Customer[] = [
    new Customer("Fatima","Asad","Female",18,314543892,accounts[0]),
    new Customer("Rabia","Asad","Female",16,314543892,accounts[1]),
    new Customer("Ibrahim","Asad","male",15,306543892,accounts[2])
]

// function to interact with bank account

async function service(){
    do{
        const accountNumberInput = await inquirer.prompt(
            {
                name: "account",
                type: "number",
                message: "Enter your account Number"
            }
        )
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.account)
        if(customer){
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`)
            const ans = await inquirer.prompt([{
                name: "select",
                type: "list",
                message: "Select an operation",
                choices: ["Deposit","Withdraw","check balance","Exit"]
            }])
            switch (ans.select){
                case "Deposit":
                    const depositAmount = await inquirer.prompt(
                        {
                            name: "amount",
                            type: "number",
                            message: "enter the amount to deposit:"
                        }
                    )
                    customer.account.deposit(depositAmount.amount)
                        break;
                    case "Withdraw":
                        const withdramAmount = await inquirer.prompt(
                            {
                                name: "amount",
                                type: "number",
                                message: "enter the amount to Withdraw:"
                            }
                        )
                        customer.account.withdram(withdramAmount.amount)
                        break;
                    case "check balance":
                           customer.account.checkBalance();
                        break;
                    case "Exit":
                         console.log("Exiting the program")   
                         console.log("\n Thank you for using our bank services.")
                         return;
            }
        }else {
            console.log("Invalid account number.Please try again");
            
        }
    } while (true)
}
service();