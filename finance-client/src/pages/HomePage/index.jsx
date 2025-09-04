// import RegisterForm from 'components/auth/RegisterForm';

// export default function HomePage() {
//   return (
//     <div>
//       <h2>כאן יהיה דף הביתתתתתתתתתתתת</h2>
//       <RegisterForm />

      
//     </div>
//   );
// }



// import React from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   CartesianGrid,
// } from "recharts";
// import { Wallet, ArrowDownCircle, PiggyBank, UserRound } from "lucide-react";
// import "./HomePage.scss";

// // נתוני דוגמה – החליפי בקריאה ל-API שלך
// const monthlyData = [
//   { name: "ינו", income: 9200, expense: 6500, savings: 2700 },
//   { name: "פבר", income: 8800, expense: 6100, savings: 2700 },
//   { name: "מרץ", income: 10000, expense: 6900, savings: 3100 },
//   { name: "אפר", income: 9800, expense: 6400, savings: 3400 },
//   { name: "מאי", income: 10200, expense: 7200, savings: 3000 },
//   { name: "יונ", income: 10500, expense: 7600, savings: 2900 },
// ];

// export default function HomePage() {
//   const totals = monthlyData.reduce(
//     (acc, m) => {
//       acc.income += m.income;
//       acc.expense += m.expense;
//       acc.savings += m.savings;
//       return acc;
//     },
//     { income: 0, expense: 0, savings: 0 }
//   );

//   return (
//     <div className="app-root semi-dark">
//       {/* HEADER */}
//       <header className="header">
//         <Link to="/" className="brand" aria-label="דף הבית">
//           <Logo />
//           <span>FinTrack</span>
//         </Link>

//         <nav className="nav" aria-label="ניווט ראשי">
//           <Link to="/profile" className="nav-link">
//             <UserRound size={18} />
//             <span>פרופיל</span>
//           </Link>
//           <Link to="/login" className="btn btn-ghost">כניסה</Link>
//           <Link to="/register" className="btn btn-primary">הרשמה</Link>
//         </nav>
//       </header>

//       {/* HERO */}
//       <section className="hero">
//         <motion.h1
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           השליטה על הכסף – במקום אחד
//         </motion.h1>
//         <p className="hero-sub">עקבי אחרי הכנסות, הוצאות וחסכונות בלוח מחוונים נוח.</p>
//         <div className="hero-cta">
//           <Link to="/register" className="btn btn-primary">התחילי עכשיו</Link>
//           <Link to="/login" className="btn btn-ghost">כבר רשומה? התחברי</Link>
//         </div>
//       </section>

//       {/* KPI CARDS */}
//       <section className="grid kpis">
//         <KpiCard
//           title="הכנסות סה'כ"
//           value={formatCurrency(totals.income)}
//           icon={<Wallet />}
//           caption="במצטבר לחצי שנה"
//         />
//         <KpiCard
//           title="הוצאות סה'כ"
//           value={formatCurrency(totals.expense)}
//           icon={<ArrowDownCircle />}
//           caption="במצטבר לחצי שנה"
//         />
//         <KpiCard
//           title="סהכ חסכונות"
//           value={formatCurrency(totals.savings)}
//           icon={<PiggyBank />}
//           caption="במצטבר לחצי שנה"
//         />
//       </section>

//       {/* CHARTS */}
//       <section className="grid charts">
//         <div className="card">
//           <div className="card-header">
//             <h3>הכנסות מול הוצאות</h3>
//             <p>התמונה החודשית שלך</p>
//           </div>
//           <div className="card-body">
//             <ResponsiveContainer width="100%" height={280}>
//               <BarChart data={monthlyData} barSize={18}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip formatter={(v) => formatCurrency(Number(v))} />
//                 <Bar dataKey="income" name="הכנסות" radius={[6, 6, 0, 0]} />
//                 <Bar dataKey="expense" name="הוצאות" radius={[6, 6, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         <div className="card">
//           <div className="card-header">
//             <h3>מגמת חיסכון</h3>
//             <p>כמה נשאר בסוף כל חודש</p>
//           </div>
//           <div className="card-body">
//             <ResponsiveContainer width="100%" height={280}>
//               <LineChart data={monthlyData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip formatter={(v) => formatCurrency(Number(v))} />
//                 <Line type="monotone" dataKey="savings" name="חיסכון" strokeWidth={3} dot />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="footer">
//         <p>© {new Date().getFullYear()} FinTrack — נבנה באהבה ל-React</p>
//       </footer>
//     </div>
//   );
// }

// function KpiCard({ title, value, caption, icon }) {
//   return (
//     <motion.div className="card kpi" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
//       <div className="kpi-icon">{icon}</div>
//       <div className="kpi-main">
//         <h4>{title}</h4>
//         <div className="kpi-value">{value}</div>
//         <div className="kpi-caption">{caption}</div>
//       </div>
//     </motion.div>
//   );
// }

// function formatCurrency(n) {
//   return new Intl.NumberFormat("he-IL", { style: "currency", currency: "ILS", maximumFractionDigits: 0 }).format(n);
// }

// function Logo() {
//   return (
//     <svg className="logo" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden>
//       <defs>
//         <linearGradient id="g" x1="0" x2="1" y1="1" y2="0">
//           <stop offset="0%" stopColor="#2dd4bf" />
//           <stop offset="100%" stopColor="#60a5fa" />
//         </linearGradient>
//       </defs>
//       <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#g)" />
//       <path d="M16 40 L26 28 L34 36 L48 20" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" />
//       <circle cx="48" cy="20" r="3" fill="#fff" />
//     </svg>
//   );
// }





// import React from "react";
// import { Link } from "react-router-dom";
// import { Box, AppBar, Toolbar, Typography, Button, IconButton, Grid, Paper } from "@mui/material";
// import { AccountCircle, Wallet, Savings, ArrowDownward } from "@mui/icons-material";
// import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid } from "recharts";

// // נתוני דוגמה
// const monthlyData = [
//   { name: "ינו", income: 9200, expense: 6500, savings: 2700 },
//   { name: "פבר", income: 8800, expense: 6100, savings: 2700 },
//   { name: "מרץ", income: 10000, expense: 6900, savings: 3100 },
//   { name: "אפר", income: 9800, expense: 6400, savings: 3400 },
//   { name: "מאי", income: 10200, expense: 7200, savings: 3000 },
//   { name: "יונ", income: 10500, expense: 7600, savings: 2900 },
// ];

// function formatCurrency(n) {
//   return new Intl.NumberFormat("he-IL", { style: "currency", currency: "ILS", maximumFractionDigits: 0 }).format(n);
// }

// export default function HomePage() {
//   const totals = monthlyData.reduce(
//     (acc, m) => {
//       acc.income += m.income;
//       acc.expense += m.expense;
//       acc.savings += m.savings;
//       return acc;
//     },
//     { income: 0, expense: 0, savings: 0 }
//   );

//   return (
//     <Box sx={{ minHeight: "100vh", bgcolor: "#1f2937", color: "#f3f4f6" }}>
//       {/* HEADER */}
//       <AppBar position="static" sx={{ bgcolor: "#111827" }}>
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//           <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: "none", color: "inherit" }}>
//             💰 FinTrack
//           </Typography>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <IconButton component={Link} to="/profile" color="inherit"><AccountCircle /></IconButton>
//             <Button component={Link} to="/login" variant="outlined" sx={{ color: "#f3f4f6", borderColor: "#f3f4f6" }}>כניסה</Button>
//             <Button component={Link} to="/register" variant="contained" sx={{ bgcolor: "#2563eb", color: "#fff" }}>הרשמה</Button>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* HERO */}
//       <Box sx={{ textAlign: "center", p: 4 }}>
//         <Typography variant="h3" gutterBottom>השליטה על הכסף – במקום אחד</Typography>
//         <Typography variant="subtitle1" gutterBottom>עקבי אחרי הכנסות, הוצאות וחסכונות בלוח מחוונים נוח.</Typography>
//         <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
//           <Button component={Link} to="/register" variant="contained" sx={{ bgcolor: "#2563eb", color: "#fff" }}>התחילי עכשיו</Button>
//           <Button component={Link} to="/login" variant="outlined" sx={{ color: "#f3f4f6", borderColor: "#f3f4f6" }}>כבר רשומה? התחברי</Button>
//         </Box>
//       </Box>

//       {/* KPI CARDS */}
//       <Grid container spacing={2} sx={{ p: 2 }}>
//         <KpiCard title="הכנסות סה'כ" value={formatCurrency(totals.income)} icon={<Wallet />} />
//         <KpiCard title="הוצאות סה'כ" value={formatCurrency(totals.expense)} icon={<ArrowDownward />} />
//         <KpiCard title="סהכ חסכונות" value={formatCurrency(totals.savings)} icon={<Savings />} />
//       </Grid>

//       {/* CHARTS */}
//       <Grid container spacing={2} sx={{ p: 2 }}>
//         <Grid item xs={12} md={6}>
//           <Paper sx={{ p: 2, bgcolor: "#111827", color: "#f3f4f6" }}>
//             <Typography variant="h6">הכנסות מול הוצאות</Typography>
//             <Typography variant="body2" color="#9ca3af" gutterBottom>התמונה החודשית שלך</Typography>
//             <ResponsiveContainer width="100%" height={280}>
//               <BarChart data={monthlyData} barSize={18}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//                 <XAxis dataKey="name" stroke="#f3f4f6" />
//                 <YAxis stroke="#f3f4f6" />
//                 <Tooltip formatter={(v) => formatCurrency(Number(v))} />
//                 <Bar dataKey="income" name="הכנסות" fill="#22c55e" radius={[6, 6, 0, 0]} />
//                 <Bar dataKey="expense" name="הוצאות" fill="#ef4444" radius={[6, 6, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </Paper>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Paper sx={{ p: 2, bgcolor: "#111827", color: "#f3f4f6" }}>
//             <Typography variant="h6">מגמת חיסכון</Typography>
//             <Typography variant="body2" color="#9ca3af" gutterBottom>כמה נשאר בסוף כל חודש</Typography>
//             <ResponsiveContainer width="100%" height={280}>
//               <LineChart data={monthlyData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//                 <XAxis dataKey="name" stroke="#f3f4f6" />
//                 <YAxis stroke="#f3f4f6" />
//                 <Tooltip formatter={(v) => formatCurrency(Number(v))} />
//                 <Line type="monotone" dataKey="savings" name="חיסכון" stroke="#3b82f6" strokeWidth={3} dot />
//               </LineChart>
//             </ResponsiveContainer>
//           </Paper>
//         </Grid>
//       </Grid>

//       {/* FOOTER */}
//       <Box sx={{ textAlign: "center", p: 2, bgcolor: "#111827", color: "#9ca3af" }}>
//         <Typography variant="body2">© {new Date().getFullYear()} FinTrack — נבנה באהבה ל‑React</Typography>
//       </Box>
//     </Box>
//   );
// }

// // KPI Card Component
// function KpiCard({ title, value, icon }) {
//   return (
//     <Grid item xs={12} md={4}>
//       <Paper sx={{ p: 2, display: "flex", alignItems: "center", gap: 2, bgcolor: "#1f2937", color: "#f3f4f6" }}>
//         <Box sx={{ fontSize: 40 }}>{icon}</Box>
//         <Box>
//           <Typography variant="subtitle2">{title}</Typography>
//           <Typography variant="h6">{value}</Typography>
//         </Box>
//       </Paper>
//     </Grid>
//   );
// }
////////////////////////////////

// import * as React from "react";
// import { AppBar, Toolbar, Typography, Box, Button, IconButton, Avatar, Container, Grid, Card, CardContent, LinearProgress, List, ListItem, ListItemText, Divider, Chip, Link } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import SavingsTwoToneIcon from "@mui/icons-material/SavingsTwoTone";
// import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
// import ArrowUpwardTwoToneIcon from "@mui/icons-material/ArrowUpwardTwoTone";
// import ArrowDownwardTwoToneIcon from "@mui/icons-material/ArrowDownwardTwoTone";
// import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";

// // Demo Data
// const demo = {
//   balance: 18350.75,
//   incomeThisMonth: 12450.0,
//   expenseThisMonth: 8450.55,
//   savingsThisMonth: 2300.2,
//   goals: [
//     { name: "Emergency Fund", progress: 68 },
//     { name: "Family Trip", progress: 35 },
//     { name: "Professional Course", progress: 52 }
//   ],
//   transactions: [
//     { id: 1, type: "Income", category: "Salary", amount: 9200, date: "2025-09-01" },
//     { id: 2, type: "Expense", category: "Groceries", amount: 320.5, date: "2025-09-02" },
//     { id: 3, type: "Expense", category: "Fuel", amount: 250, date: "2025-09-02" },
//     { id: 4, type: "Savings", category: "Savings Fund", amount: 1000, date: "2025-09-03" }
//   ]
// };

// // Format currency
// const fmt = new Intl.NumberFormat("he-IL", { style: "currency", currency: "ILS" });

// export default function HomePage() {
//   const [anchorNav, setAnchorNav] = React.useState(null);
//   const openNav = (e) => setAnchorNav(e.currentTarget);
//   const closeNav = () => setAnchorNav(null);

//   return (
//     <Box dir="rtl" sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
//       {/* AppBar */}
//       <AppBar position="sticky" color="primary" elevation={3}>
//         <Toolbar>
//           <Box sx={{ display: { xs: "block", md: "none" } }}>
//             <IconButton aria-label="Menu" onClick={openNav}>
//               <MenuIcon />
//             </IconButton>
//           </Box>
//           <Link href="/" sx={{ display: "flex", alignItems: "center", gap: 1, textDecoration: "none" }}>
//             <Avatar sx={{ bgcolor: "secondary.main" }}>
//               <SavingsTwoToneIcon />
//             </Avatar>
//             <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
//               FinManage
//             </Typography>
//           </Link>
//           <Box sx={{ flexGrow: 1 }} />
//           <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, alignItems: "center" }}>
//             <Button href="/profile" color="inherit" startIcon={<AccountCircleTwoToneIcon />}>
//               פרופיל
//             </Button>
//             <Divider orientation="vertical" flexItem />
//             <Button href="/login" variant="text" color="inherit">
//               כניסה
//             </Button>
//             <Button href="/signup" variant="contained" color="secondary">
//               הרשמה
//             </Button>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Hero Section */}
//       <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
//         <Grid container spacing={3} alignItems="center">
//           <Grid item xs={12} md={7}>
//             <Typography variant="h3" sx={{ fontWeight: "bold", color: "#333" }} gutterBottom>
//               שליטה מלאה על הכסף שלך
//             </Typography>
//             <Typography variant="h6" color="text.secondary" gutterBottom>
//               עקוב אחרי הכנסות, הוצאות וחסכונות במקום אחד — בפשטות וביעילות.
//             </Typography>
//             <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
//               <Button size="large" variant="contained" startIcon={<ArrowUpwardTwoToneIcon />}>
//                 הוספת הכנסה
//               </Button>
//               <Button size="large" variant="outlined" startIcon={<ArrowDownwardTwoToneIcon />}>
//                 הוספת הוצאה
//               </Button>
//               <Button size="large" variant="text" startIcon={<SavingsTwoToneIcon />} href="#goals">
//                 יצירת יעד חיסכון
//               </Button>
//             </Box>
//           </Grid>
//           <Grid item xs={12} md={5}>
//             <Card sx={{ borderRadius: 2, borderColor: "divider", bgcolor: "background.paper", boxShadow: 3 }}>
//               <CardContent>
//                 <Typography variant="h6">יתרת ארנק</Typography>
//                 <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
//                   {fmt.format(demo.balance)}
//                 </Typography>
//                 <Box sx={{ mt: 2 }}>
//                   <StatRow label="הכנסות" value={fmt.format(demo.incomeThisMonth)} positive />
//                   <StatRow label="הוצאות" value={fmt.format(demo.expenseThisMonth)} />
//                   <StatRow label="חיסכון" value={fmt.format(demo.savingsThisMonth)} info />
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>

//         {/* KPI Cards */}
//         <Grid container spacing={3} sx={{ mt: 3 }}>
//           <Grid item xs={12} md={4}>
//             <InfoCard title="הכנסות החודש" value={fmt.format(demo.incomeThisMonth)} icon={<ArrowUpwardTwoToneIcon />} chip="+12%" chipColor="success" />
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <InfoCard title="הוצאות החודש" value={fmt.format(demo.expenseThisMonth)} icon={<ArrowDownwardTwoToneIcon />} chip="-4%" chipColor="error" />
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <InfoCard title="חיסכון החודש" value={fmt.format(demo.savingsThisMonth)} icon={<SavingsTwoToneIcon />} chip="יעד: 3,500₪" chipColor="info" />
//           </Grid>
//         </Grid>

//         {/* Goals */}
//         <Grid container spacing={3} sx={{ mt: 3 }} id="goals">
//           <Grid item xs={12} md={6}>
//             <Card sx={{ borderRadius: 2, borderColor: "divider", bgcolor: "background.paper" }}>
//               <CardContent>
//                 <Typography variant="h6">יעדי חיסכון</Typography>
//                 <List>
//                   {demo.goals.map((goal, index) => (
//                     <React.Fragment key={goal.name}>
//                       <ListItem>
//                         <ListItemText
//                           primary={
//                             <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                               <Typography>{goal.name}</Typography>
//                               <Typography>{goal.progress}%</Typography>
//                             </Box>
//                           }
//                           secondary={<LinearProgress value={goal.progress} />}
//                         />
//                       </ListItem>
//                       {index < demo.goals.length - 1 && <Divider />}
//                     </React.Fragment>
//                   ))}
//                 </List>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Card sx={{ borderRadius: 2, borderColor: "divider", bgcolor: "background.paper" }}>
//               <CardContent>
//                 <Typography variant="h6">תנועות אחרונות</Typography>
//                 <List>
//                   {demo.transactions.map((transaction) => (
//                     <React.Fragment key={transaction.id}>
//                       <ListItem secondaryAction={<Typography>{fmt.format(transaction.amount)}</Typography>}>
//                         <ListItemText
//                           primary={<Typography>{transaction.category}</Typography>}
//                           secondary={new Date(transaction.date).toLocaleDateString()}
//                         />
//                       </ListItem>
//                       <Divider />
//                     </React.Fragment>
//                   ))}
//                 </List>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </Container>

//       {/* Footer */}
//       <Box sx={{ py: 4, bgcolor: "#f0f0f0", textAlign: "center" }}>
//         <Typography variant="body2" color="text.secondary">
//           © {new Date().getFullYear()} FinManage — כל הזכויות שמורות
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

// function StatRow({ label, value, positive, info }) {
//   return (
//     <Box sx={{ display: "flex", justifyContent: "space-between", py: 0.5 }}>
//       <Typography
//         color={info ? "info.main" : positive ? "success.main" : "error.main"}
//         fontWeight={600}
//       >
//         {label}
//       </Typography>
//       <Typography fontWeight={700}>{value}</Typography>
//     </Box>
//   );
// }


// function InfoCard({ title, value, icon, chip, chipColor }) {
//   return (
//     <Card sx={{ borderRadius: 2, borderColor: "divider", bgcolor: "background.paper" }}>
//       <CardContent>
//         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//           <Typography variant="subtitle2" color="text.secondary">{title}</Typography>
//           {chip && (
//             <Chip size="small" label={chip} color={chipColor} variant="outlined" />
//           )}
//         </Box>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <Avatar sx={{ bgcolor: "action.selected" }}>{icon}</Avatar>
//           <Typography variant="h5" sx={{ fontWeight: "bold" }}>{value}</Typography>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// }


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
    <div className="app-root">
      {/* HEADER */}
      <header className="header">
        <Link to="/" className="brand">
          <Logo />
          <span>FinTrack</span>
        </Link>

        <nav className="nav">
          <Link to="/profile" className="nav-link">
            <UserRound size={18} />
            <span>פרופיל</span>
          </Link>
          <Link to="/login" className="btn btn-ghost">
            כניסה
          </Link>
          <Link to="/register" className="btn btn-primary">
            הרשמה
          </Link>
        </nav>
      </header>

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
