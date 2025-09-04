const express = require('express');
const router = express.Router();
const SavingsGoal = require('../models/SavingGoal');

router.post("/", async (req, res) => {
  try {
    const { userId, title, targetAmount, currentAmount, autoSaving } = req.body;

    const newSavingGoal = new SavingsGoal({
      userId,
      title,
      targetAmount,
      currentAmount: (currentAmount || 0) + (autoSaving?.amount || 0),
      autoSaving: {
        amount: autoSaving?.amount || 0,
        frequency: autoSaving?.frequency || 'none',
        isUnlimited: autoSaving?.isUnlimited ?? true,
        timesToRepeat: autoSaving?.isUnlimited === false ? autoSaving?.timesToRepeat : null
      }
    });

    const saved = await newSavingGoal.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, targetAmount, currentAmount, autoSaving } = req.body;

    const updatedGoal = await SavingsGoal.findByIdAndUpdate(
      req.params.id,
      {
        title,
        targetAmount,
        currentAmount,
        autoSaving: {
          amount: autoSaving?.amount || 0,
          frequency: autoSaving?.frequency || 'none',
          isUnlimited: autoSaving?.isUnlimited ?? true,
          timesToRepeat: autoSaving?.isUnlimited === false ? autoSaving?.timesToRepeat : null
        }
      },
      { new: true }
    );

    if (!updatedGoal) {
      return res.status(404).json({ error: "Saving goal not found" });
    }

    res.status(200).json(updatedGoal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedGoal = await SavingsGoal.findByIdAndDelete(req.params.id);
    if (!deletedGoal) {
      return res.status(404).json({ error: "Saving goal not found" });
    }
    res.status(200).json({ message: "Saving goal deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/getall", async (req, res) => {
  try {
    const allGoals = await SavingsGoal.find();
    res.status(200).json(allGoals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    const query = userId ? { userId } : {};
    const allGoals = await SavingsGoal.find(query);
    res.status(200).json(allGoals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;