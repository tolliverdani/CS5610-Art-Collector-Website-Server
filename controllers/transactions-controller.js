import transactionDao from "../database/transactions/transactions-dao.js";
//let comments = require('./comments.json'); // TODO: replace with Mongo

const transactionsController = (app) => {
    app.get('/api/transaction', findAllTransactions);
    app.post('/api/transaction', createTransaction);
    app.put('/api/comment/:transaction_id', updateTransaction);
    app.delete('/api/comment/:transaction_id', deleteTransaction);
    app.get('/api/transaction/paintings/:painting_id', findAllTransactionsByPaintingId);
    app.get('/api/transaction/artists/:artist_id', findAllTransactionsByArtistId);
    app.get('/api/transaction/sellers/:seller_id', findAllTransactionsBySellerId);
    app.get('/api/transaction/buyers/:buyer_id', findAllTransactionsByBuyerId);
}

const findAllTransactions = async (req, res) => {
    const transactions = await transactionDao.findAllTransactions();
    res.json(transactions);
}

const findAllTransactionsByPaintingId = async (req, res) => {
    const painting_id = req.params.painting_id;
    const transactions = await transactionDao.findTransactionByKey("painting_id", painting_id);
    res.json(transactions);
}

const findAllTransactionsByArtistId = async (req, res) => {
    const artist_id = req.params.artist_id;
    const transactions = await transactionDao.findTransactionByKey("artist_id", artist_id);
    res.json(transactions);
}

const findAllTransactionsBySellerId = async (req, res) => {
    const seller_id = req.params.seller_id;
    const transactions = await transactionDao.findTransactionByKey("seller_id", seller_id);
    res.json(transactions);
}

const findAllTransactionsByBuyerId = async (req, res) => {
    const buyer_id = req.params.buyer_id;
    const transactions = await transactionDao.findTransactionByKey("painting_id", buyer_id);
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