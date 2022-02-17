const Transaction = require("../models/TransactionModel");

//@desc Get all transactions
//@route Get /api/v1/transactions
//@access Public
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

//@desc Add transaction
//@route Post /api/v1/transactions
//@access Public
exports.addTransaction = async (req, res, next) => {
  const { text, amount } = req.body;
  try {
    const transaction = await Transaction.create(req.body);
    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server error",
      });
    }
  }
};

//@desc Delete  transaction
//@route delete /api/v1/transaction/:id
//@access Public
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "No transaction found",
      });
    }

    await transaction.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

//@desc Edit  transaction
//@route Edit /api/v1/transaction/:id
//@access Public
exports.editTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "No transaction found",
      });
    }

    const updatedTransaction = await transaction.updateOne(req.body);
    return res.status(200).json({
      success: true,
      data: updatedTransaction,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};
