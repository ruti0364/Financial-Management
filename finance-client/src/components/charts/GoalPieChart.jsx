import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function GoalPieChart({ progress }) {
  // progress הוא מספר בין 0 ל-100 המייצג אחוז התקדמות

  const data = [
    { name: "Completed", value: progress },
    { name: "Remaining", value: 100 - progress },
  ];

  const COLORS = ["#0088FE", "#EEEEEE"]; // כחול ואפור בהיר

  return (
    <PieChart width={100} height={100}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={0}
        outerRadius={40}
        fill="#8884d8"
        dataKey="value"
        stroke="none"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="14"
      >
        {progress}%
      </text>
    </PieChart>
  );
}
