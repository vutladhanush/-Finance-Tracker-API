import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

function SummaryCards({
  totalBalance,
  totalIncome,
  totalExpenses
}) {
  return (
    <div className="summary-grid">

      {/* Total Balance */}
      <div className="summary-card">

        <div className="summary-header">
          <span>Total Balance</span>

          <Wallet className="summary-icon balance-icon" />
        </div>

        <div
          className={`summary-value ${
            totalBalance >= 0 ? "balance-positive" : "balance-negative"
          }`}
        >
          ₹{totalBalance.toFixed(2)}
        </div>

      </div>


      {/* Total Income */}
      <div className="summary-card">

        <div className="summary-header">
          <span>Total Income</span>

          <ArrowUpRight className="summary-icon income-icon" />
        </div>

        <div className="summary-value income">
          +₹{totalIncome.toFixed(2)}
        </div>

      </div>


      {/* Total Expenses */}
      <div className="summary-card">

        <div className="summary-header">
          <span>Total Expenses</span>

          <ArrowDownRight className="summary-icon expense-icon" />
        </div>

        <div className="summary-value expense">
          -₹{totalExpenses.toFixed(2)}
        </div>

      </div>

    </div>
  );
}

export default SummaryCards;