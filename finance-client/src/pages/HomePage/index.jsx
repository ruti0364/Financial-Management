import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip as ChartTooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { Wallet, ArrowDownCircle, PiggyBank, UserRound } from "lucide-react";
import "./HomePage.scss";

// נתוני דוגמה
const monthlyData = [
  { name: "ינו", income: 9200, expense: 6500, savings: 2700 },
  { name: "פבר", income: 8800, expense: 6100, savings: 2700 },
  { name: "מרץ", income: 10000, expense: 6900, savings: 3100 },
  { name: "אפר", income: 9800, expense: 6400, savings: 3400 },
  { name: "מאי", income: 10200, expense: 7200, savings: 3000 },
  { name: "יונ", income: 10500, expense: 7600, savings: 2900 },
];

const formatCurrency = (n) =>
  new Intl.NumberFormat("he-IL", { style: "currency", currency: "ILS", maximumFractionDigits: 0 }).format(n);

export default function HomePage() {
  const totals = monthlyData.reduce(
    (acc, m) => {
      acc.income += m.income;
      acc.expense += m.expense;
      acc.savings += m.savings;
      return acc;
    },
    { income: 0, expense: 0, savings: 0 }
  );

  return (
    <div className="">
      {/* HERO */}
      <section className="hero">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          השליטה על הכסף – במקום אחד
        </motion.h1>
        <p className="hero-sub">עקוב אחרי הכנסות, הוצאות וחסכונות בלוח מחוונים נוח.</p>
        <div className="hero-cta">
          <button className="btn btn-primary">התחילי עכשיו</button>
          <button className="btn btn-ghost">כבר רשומה? התחברי</button>
        </div>
      </section>

      {/* KPI CARDS */}
      <section className="grid kpis">
        <KpiCard
          title="הכנסות סה'כ"
          value={formatCurrency(totals.income)}
          icon={<Wallet />}
          caption="במצטבר לחצי שנה"
        />
        <KpiCard
          title="הוצאות סה'כ"
          value={formatCurrency(totals.expense)}
          icon={<ArrowDownCircle />}
          caption="במצטבר לחצי שנה"
        />
        <KpiCard
          title="סהכ חסכונות"
          value={formatCurrency(totals.savings)}
          icon={<PiggyBank />}
          caption="במצטבר לחצי שנה"
        />
      </section>

      {/* CHARTS */}
      <section className="grid charts">
        <div className="card">
          <div className="card-header">
            <h3>הכנסות מול הוצאות</h3>
            <p>התמונה החודשית שלך</p>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyData} barSize={18}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="income" name="הכנסות" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expense" name="הוצאות" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>מגמת חיסכון</h3>
            <p>כמה נשאר בסוף כל חודש</p>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="income" name="הכנסות" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expense" name="הוצאות" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} FinTrack — נבנה באהבה ל-React</p>
      </footer>
    </div>
  );
}

function KpiCard({ title, value, caption, icon }) {
  return (
    <motion.div className="card kpi" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="kpi-icon">{icon}</div>
      <div className="kpi-main">
        <h4>{title}</h4>
        <div className="kpi-value">{value}</div>
        <div className="kpi-caption">{caption}</div>
      </div>
    </motion.div>
  );
}

function Logo() {
  return (
    <svg className="logo" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="1" y2="0">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#g)" />
      <path d="M16 40 L26 28 L34 36 L48 20" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="48" cy="20" r="3" fill="#fff" />
    </svg>
  );
}
