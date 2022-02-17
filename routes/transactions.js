const express = require("express");
const router = express.Router();
const { getTransactions,addTransaction, deleteTransaction,editTransaction } = require("../controllers/transactionsController");

router
  .route("/")
  .get(getTransactions)
  .post(addTransaction);

router
.route("/:id")
.delete(deleteTransaction)
.put(editTransaction);


module.exports = router;
