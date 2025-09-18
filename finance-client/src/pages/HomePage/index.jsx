import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip as ChartTooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { Wallet, ArrowDownCircle, PiggyBank } from "lucide-react";
import { KpiCard } from 'components/common/KpiCard/KpiCard';
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
    <div>
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
          <Link className="btn btn-primary" to="/register">התחילי עכשיו</Link>
          <Link className="btn btn-ghost"  to="/login">כבר רשומה? התחברי</Link>
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
                <Bar dataKey="income" name="הכנסות" radius={[6, 6, 0, 0]} fill="var(--brand)"/>
                <Bar dataKey="expense" name="הוצאות" radius={[6, 6, 0, 0]} fill="#ff4d4d"/>
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
                <Bar dataKey="income" name="הכנסות" radius={[6, 6, 0, 0]} fill="var(--brand)"/>
                <Bar dataKey="expense" name="הוצאות" radius={[6, 6, 0, 0]} fill="#ff4d4d"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Ruth Raful&Lea Seller</p>
      </footer>
    </div>
  );
}

