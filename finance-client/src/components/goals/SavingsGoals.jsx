
import React, { useState, useEffect } from "react";
import SavingsGoalForm from "./SavingsGoalForm";
import { useSelector } from "react-redux";
// import { PieChart } from 'react-minimal-pie-chart';
// import { PieChart, Pie, Cell, Tooltip } from "recharts";
import GoalPieChart from "components/charts/GoalPieChart";




export default function SavingsGoals() {
  const userId = useSelector((state) => state.user.userId);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchGoals();
    }
  }, [userId]);

  const fetchGoals = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/goals?userId=${userId}`);
      if (!response.ok) throw new Error("Failed to fetch goals");

      const data = await response.json();
      setGoals(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this goal?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/goals/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete goal");
      fetchGoals();
    } catch (err) {
      alert("Error deleting goal");
    }
  };

  const handleEdit = (goal) => {
    setSelectedGoal(goal);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setSelectedGoal(null);
    setShowForm(true);
  };

  const calculateProgress = (goal) => {
    if (!goal.targetAmount) return 0;
    return Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
  };
  const renderPie = (progress) => {
    const data = [
      { name: "Progress", value: progress },
      { name: "Remaining", value: 100 - progress }
    ];
    const COLORS = ["#00C49F", "#E0E0E0"];

    return (
      <PieChart width={50} height={50}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={10}
          outerRadius={20}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
    );
  };


  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h2>ניהול יעדי חיסכון</h2>

      {loading && <p>טוען יעדים...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleAddNew}>הוסף יעד חדש</button>

      <table style={{ direction: "rtl", width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>שם המטרה</th>
            <th>יעד (ש"ח)</th>
            <th>הוספה אוטומטית</th>
            <th>נצבר (ש"ח)</th>
            {/* <th>תאריך יעד</th> */}
            <th>אחוז התקדמות</th>
            {/* <th>פאי</th> */}
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {goals.map((goal) => (
            <tr key={goal._id} style={{ borderBottom: "1px solid #ccc" }}>
              <td>{goal.title}</td>
              <td>{goal.targetAmount}</td>
              <td>{goal.autoSaving && goal.autoSaving.frequency !== "none"
                ? goal.autoSaving.frequency // weekly / monthly / yearly
                : "❌"}</td>
              <td>{goal.currentAmount}</td>
              {/* <td>{goal.deadline ? new Date(goal.deadline).toLocaleDateString() : "-"}</td> */}
              {/* <td>{calculateProgress(goal)}%</td> */}
              {/* <td>{renderPie(calculateProgress(goal))}</td> */}
              {/* <td>
                <PieChart
                  data={[
                    { title: 'Progress', value: calculateProgress(goal), color: '#4caf50' },
                    { title: 'Remaining', value: 100 - calculateProgress(goal), color: '#ccc' }
                  ]}
                  lineWidth={100} // 100 אומר שאין חור – עוגה מלאה
                  rounded
                  animate
                  style={{ height: '50px' }}
                />
              </td> */}
              <td>
                <GoalPieChart progress={calculateProgress(goal)} />
              </td>
              <td>
                <button onClick={() => handleEdit(goal)} style={{ marginRight: "10px" }}>
                  ערוך
                </button>
                <button onClick={() => handleDelete(goal._id)}>מחק</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <SavingsGoalForm goal={selectedGoal} onClose={() => setShowForm(false)} onSave={fetchGoals} />
      )}
    </div>
  );
}


