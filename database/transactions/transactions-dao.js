import transactionsModel from "./transactions-model.js";

const findAllTransactions = () => transactionsModel.find();
const findTransactionsById = (transaction_id) => transactionsModel.findById(transaction_id);
const findTransactionByKey = (key, value) => transactionsModel.find({key: value});
const createTransaction = (transaction) => transactionsModel.create(transaction);
const deleteTransaction = (transaction_id) => transactionsModel.deleteOne({_id: transaction_id});
const updateTransaction = (transaction_id, transaction) => transactionsModel.updateOne({_id: transaction_id}, {$set: transaction});

export default {
    findAllTransactions,
    findTransactionsById,
    createTransaction,
    deleteTransaction,
    updateTransaction,
    findTransactionByKey
}