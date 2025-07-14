require("dotenv").config();
const mongoose = require("mongoose");
const cron = require("node-cron");
const SavingsGoal = require("./models/SavingGoal");

// התחברות למונגו
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected for autoSaving cron"))
    .catch(err => console.error("MongoDB connection error:", err));

function shouldUpdateGoal(lastUpdatedAt, frequency) {
    const now = new Date();
    const last = new Date(lastUpdatedAt);

    switch (frequency) {
        case "daily":
            return true; // כל יום מעדכן
        case "weekly":
            return now - last >= 7 * 24 * 60 * 60 * 1000; // שבוע
        case "monthly":
            return now.getMonth() !== last.getMonth() || now.getFullYear() !== last.getFullYear();
        case "yearly":
            return now.getFullYear() !== last.getFullYear();
        default:
            return false;
    }
}


// משימת cron – תרוץ כל יום בחצות (תעדכני בהתאם לצורך)
cron.schedule("0 0 * * *", async () => {
// cron.schedule("* * * * *", async () => {//לצורך בדיקה שישתנה כל דקה

    console.log("Running daily auto-saving update...");

    try {
        const goals = await SavingsGoal.find({ "autoSaving.amount": { $gt: 0 }, "autoSaving.frequency": { $ne: "none" } });

        for (let goal of goals) {
            if (shouldUpdateGoal(goal.updatedAt, goal.autoSaving.frequency)) {
                goal.currentAmount += goal.autoSaving.amount;
                await goal.save();
                console.log(`Updated goal ${goal.title} with +${goal.autoSaving.amount}`);
            }
        }

        console.log("Auto-saving update completed.");
    } catch (err) {
        console.error("Error in auto-saving cron job:", err);
    }
});

