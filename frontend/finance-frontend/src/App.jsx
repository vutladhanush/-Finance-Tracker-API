import { useMemo, useState } from "react";

import Navbar from "./components/Navbar";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/Transaction";
import TransactionList from "./components/TransactionList";
import LoginForm from "./components/Login";
import SignupForm from "./components/Signup";
import Footer from "./components/Footer";
import Home from "./components/Home";
import {
  loginUser,
  getTransactions,
  createTransaction,
   getCategories,
  deleteTransaction
} from "./services/api";

import "./App.css";

function App() {

  const [user, setUser] = useState(null);

  // Home page should open first
  const [currentPage, setCurrentPage] =
    useState("home");

  const [transactions, setTransactions] =
    useState([]);

  const [userId, setUserId] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

const [categories, setCategories] = useState([]);
const [error, setError] = useState("");




// =========================
// LOGIN
// =========================
const handleLogin = async (userData) => {
  try {
    setLoading(true);

    const data = await loginUser(userData);

    console.log("LOGIN RESPONSE:", data);
    console.log("NAME:", data.name);
    console.log("USER ID:", data.userId);
    console.log("EMAIL:", data.email);

    localStorage.setItem("token", data.token);

    setUser({
      id: data.userId,
      name: data.name,
      email: data.email
    });

    setUserId(data.userId);

    setCurrentPage("dashboard");

    await loadTransactions();
    await loadCategories();

  } catch (error) {
    console.error("Login error:", error);
    localStorage.removeItem("token");
    throw error;
  } finally {
    setLoading(false);
  }
};

  // =========================
  // LOAD TRANSACTIONS
  // =========================

  const loadTransactions = async () => {

    try {

      const data = await getTransactions();

      setTransactions(data);

    } catch (error) {

      console.error(error);

    }
  };


  // =========================
  // ADD TRANSACTION
  // =========================

  const handleAddTransaction =
    async (transaction) => {

      try {

        const newTransaction =
          await createTransaction(
            transaction
          );

        setTransactions((previous) => [
          newTransaction,
          ...previous
        ]);

      } catch (error) {

        console.error(error);

        alert(
          "Unable to add transaction"
        );

      }
    };


  // =========================
  // DELETE TRANSACTION
  // =========================

  const handleDeleteTransaction =
    async (id) => {

      try {

        await deleteTransaction(id);

        setTransactions(
          (previous) =>
            previous.filter(
              (transaction) =>
                transaction.id !== id
            )
        );

      } catch (error) {

        console.error(error);

        alert(
          "Unable to delete transaction"
        );

      }
    };


  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    localStorage.removeItem("token");

    setUser(null);
    setUserId(null);
    setTransactions([]);

    setCurrentPage("home");
  };


  // =========================
  // CALCULATE SUMMARY
  // =========================

  const {
    totalIncome,
    totalExpenses,
    totalBalance
  } = useMemo(() => {

    let income = 0;
    let expenses = 0;

    transactions.forEach(
      (transaction) => {

        const amount =
          Number(transaction.amount);

        if (transaction.type === "INCOME") {
          income += amount;
        }

        if (transaction.type === "EXPENSE") {
          expenses += amount;
        }

      }
    );

    return {
      totalIncome: income,
      totalExpenses: expenses,
      totalBalance: income - expenses
    };

  }, [transactions]);

  const loadCategories = async () => {
  try {
    const data = await getCategories();
    setCategories(data);
  } catch (error) {
    console.error("Error loading categories:", error);
  }
};

  return (
    <div className="app">

      {/* =========================
          NAVBAR
      ========================= */}

      <Navbar
        user={user}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onLogout={handleLogout}
      />


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="main-content">


        {/* =========================
            HOME PAGE
        ========================= */}

        {currentPage === "home" && (
          <Home
            user={user}
            setCurrentPage={setCurrentPage}
          />
        )}


        {/* =========================
            LOGIN PAGE
        ========================= */}

        {currentPage === "login" && (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToSignup={() =>
              setCurrentPage("signup")
            }
          />
        )}


        {/* =========================
            SIGNUP PAGE
        ========================= */}

        {currentPage === "signup" && (
          <SignupForm
            onSwitchToLogin={() =>
              setCurrentPage("login")
            }
          />
        )}


        {/* =========================
            DASHBOARD
        ========================= */}

        {currentPage === "dashboard" &&
          user && (

            <div className="dashboard">

              <div className="dashboard-heading">

                <h1>
                  Dashboard Overview
                </h1>

                <p>
                  Monitor your cash flow and
                  manage your transactions.
                </p>

              </div>


              {/* SUMMARY */}

              <SummaryCards
                totalBalance={totalBalance}
                totalIncome={totalIncome}
                totalExpenses={totalExpenses}
              />


              {/* TRANSACTIONS */}

              <div className="dashboard-grid">

                <TransactionForm
                  userId={userId}
                  onAddTransaction={
                    handleAddTransaction
                  }
                />

                <TransactionList
                  transactions={transactions}
                  onDeleteTransaction={
                    handleDeleteTransaction
                  }
                />

              </div>

            </div>

          )}

      </main>
 
      <Footer />

    </div>
  );
}

export default App;