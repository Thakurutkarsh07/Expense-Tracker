const express = require('express');
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const newExpense = new Expense({ ...req.body, user: req.user.id });
  const saved = await newExpense.save();
  res.status(201).json(saved);
});

router.get('/', auth, async (req, res) => {
  const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
  res.json(expenses);
});

router.put('/:id', auth, async (req, res) => {
  const updated = await Expense.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  res.json(updated);
});

router.delete('/:id', auth, async (req, res) => {
  await Expense.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.status(204).send();
});

module.exports = router;
