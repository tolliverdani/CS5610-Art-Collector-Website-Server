import transactionDao from "../database/transactions/transactions-dao.js";
//let comments = require('./comments.json'); // TODO: replace with Mongo

const transactionsController = (app) => {
    app.get('/api/comment', findAllTransactions);
    app.post('/api/comment', createTransaction);
    app.put('/api/comment/:comment_id', updateTransaction);
    app.delete('/api/comment/:comment_id', deleteTransaction);
}

const findAllTransactions = async (req, res) => {
    const transactions = await transactionDao.findAllTransactions();
    res.json(transactions);
}

const createTransaction = async (req, res) => {
    const newTransaction = req.body;
    // in the undergrad lecture the prof added the comment
    // and then returned the whole list back like below
    const insertedTransaction = await transactionDao.createTransaction(newTransaction);
    res.json(insertedTransaction);
}

const updateTransaction = async (req, res) => {
    const transaction_id = req.params['transaction_id'];
    const updatedTransaction = req.body;
    const status = await transactionDao.updateTransaction(transaction_id, updatedTransaction);
    if (status.acknowledged === true) {
        res.sendStatus(200)
    }
}

const deleteTransaction = async (req, res) => {
    const transaction_id = req.params['transaction_id'];
    // in the undergrad lecture the prof deleted the comment
    // and then returned the whole list back like below
    await transactionDao.deleteTransaction(transaction_id);
    const status = await transactionDao.findAllTransactions();
    if (status.acknowledged === true) {
        res.sendStatus(200)
    }
}

export default transactionsController;