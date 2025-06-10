
const express = require('express');
const router = express.Router();
const SavingsGoal = require('../models/SavingGoal')

router.post("/goals", async (req, res) => {
    try {
        const newSavingGoal = new SavingsGoal(req.body);
        const saved = await newSavingGoal.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/goals", async (req, res) => {
 try{
    const allGoals = await SavingsGoal.find({ userId: req.user._id });
    res.status(200).json(allGoals); 

 }catch(err){
    res.status(400).json({error:err.message});
 }
});

router.get("/goals/:id", async (req, res) => {
  try {
    const goal = await SavingsGoal.findOne({
      _id: req.params.id,
      userId: req.user._id // חשוב לוודא שהמשתמש מקבל רק את היעדים שלו
    });

    if (!goal) {
      return res.status(404).json({ error: "Saving goal not found" });
    }

    res.status(200).json(goal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.put("/goals/:id", async (req, res) => {
  try {
    const updatedGoal = await SavingsGoal.findByIdAndUpdate(
      req.params.id,      // מזהה היעד שברצונך לעדכן
      req.body,           // השדות החדשים לעדכון
      { new: true }       // כדי לקבל את המסמך המעודכן בתשובה
    );
    if (!updatedGoal) {
      return res.status(404).json({ error: "Saving goal not found" });
    }
    res.status(200).json(updatedGoal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/goals/:id", async (req, res) => {
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


module.exports = router;