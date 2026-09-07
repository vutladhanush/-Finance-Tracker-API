import { useEffect, useState } from "react";
import TransactionForm from "../components/Transaction";

function Dashboard({ token, userId, onLogout }) {

  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  // =====================================================
  // LOAD TRANSACTIONS
  // =====================================================

  const loadTransactions = async () => {
    try {

      const response = await fetch(
        "http://localhost:8082/api/transactions",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      if (response.status === 401 || response.status === 403) {
        onLogout();
        return;
      }

      if (!response.ok) {
        throw new Error(
          `Failed to load transactions: ${response.status}`
        );
      }

      const data = await response.json();

      setTransactions(data);

      // Calculate totals
      let totalIncome = 0;
      let totalExpense = 0;

      data.forEach((transaction) => {

        if (transaction.type === "INCOME") {
          totalIncome += Number(transaction.amount);
        }

        if (transaction.type === "EXPENSE") {
          totalExpense += Number(transaction.amount);
        }

      });

      setIncome(totalIncome);
      setExpense(totalExpense);

    } catch (error) {

      console.error("Error loading transactions:", error);

    }
  };

  // =====================================================
  // LOAD TRANSACTIONS WHEN DASHBOARD OPENS
  // =====================================================

  useEffect(() => {

    if (token) {
      loadTransactions();
    }

  }, [token]);

  // =====================================================
  // DELETE TRANSACTION
  // =====================================================

  const deleteTransaction = async (id) => {

    try {

      const response = await fetch(
        `http://localhost:8082/api/transactions/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      if (response.status === 401 || response.status === 403) {
        onLogout();
        return;
      }

      if (!response.ok) {
        throw new Error(
          `Failed to delete transaction: ${response.status}`
        );
      }

      await loadTransactions();

    } catch (error) {

      console.error("Error deleting transaction:", error);

    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="dashboard">

      {/* HEADER */}

      <header>

        <h1>
          Expense Tracker
        </h1>

        <button
          className="logout-button"
          onClick={onLogout}
        >
          Logout
        </button>

      </header>

      {/* SUMMARY CARDS */}

      <div className="summary-grid">

        {/* TOTAL BALANCE */}

        <div className="summary-card">

          <div className="summary-header">
            <span>Total Balance</span>
          </div>

          <p className="summary-value">
            ₹{(income - expense).toFixed(2)}
          </p>

        </div>

        {/* TOTAL INCOME */}

        <div className="summary-card">

          <div className="summary-header">
            <span>Total Income</span>
          </div>

          <p className="summary-value income">
            +₹{income.toFixed(2)}
          </p>

        </div>

        {/* TOTAL EXPENSE */}

        <div className="summary-card">

          <div className="summary-header">
            <span>Total Expenses</span>
          </div>

          <p className="summary-value expense">
            -₹{expense.toFixed(2)}
          </p>

        </div>

      </div>

      {/* ADD TRANSACTION */}

   <TransactionForm
  userId={userId}
  onAddTransaction={loadTransactions}
/>
      {/* TRANSACTIONS */}

      <div className="transaction-container">

        <h2>
          Transactions
        </h2>

        <table>

          <thead>

            <tr>

              <th>ID</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Description</th>
              <th>Date</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {transactions.map((transaction) => (

              <tr key={transaction.id}>

                <td>
                  {transaction.id}
                </td>

                <td>
                  ₹{Number(transaction.amount).toFixed(2)}
                </td>

                <td>
                  {transaction.type}
                </td>

                <td>
                  {transaction.description}
                </td>

                <td>
                  {transaction.transactionDate}
                </td>

                <td>

                  <button
                    className="delete-button"
                    onClick={() =>
                      deleteTransaction(transaction.id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Dashboard;