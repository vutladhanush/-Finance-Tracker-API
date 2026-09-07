import { useState } from "react";
import {
  Search,
  Trash2,
  Tag
} from "lucide-react";

function TransactionList({
  transactions,
  onDeleteTransaction
}) {

  const [filterType, setFilterType] =
    useState("ALL");

  const [searchTerm, setSearchTerm] =
    useState("");

  const filteredTransactions =
    transactions.filter((transaction) => {

      const matchesType =
        filterType === "ALL" ||
        transaction.type === filterType;

      const description =
        transaction.description?.toLowerCase() || "";

      const category =
        transaction.category?.name?.toLowerCase() || "";

      const search =
        searchTerm.toLowerCase();

      const matchesSearch =
        description.includes(search) ||
        category.includes(search);

      return matchesType && matchesSearch;
    });

  return (
    <div className="panel">

      <div className="transaction-header">

        <h3 className="panel-title">
          Recent Transactions
        </h3>

        <div className="transaction-controls">

          <div className="search-box">

            <Search size={15} />

            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />

          </div>

          <select
            value={filterType}
            onChange={(e) =>
              setFilterType(e.target.value)
            }
          >
            <option value="ALL">All</option>
            <option value="INCOME">Income</option>
            <option value="EXPENSE">Expense</option>
          </select>

        </div>

      </div>

      <div className="transaction-list">

        {filteredTransactions.length > 0 ? (

          filteredTransactions.map(
            (transaction) => {

              const isIncome =
                transaction.type === "INCOME";

              return (
                <div
                  className="transaction-item"
                  key={transaction.id}
                >

                  <div className="transaction-left">

                    <div
                      className={
                        isIncome
                          ? "transaction-icon income-icon"
                          : "transaction-icon expense-icon"
                      }
                    >
                      <Tag size={16} />
                    </div>

                    <div>

                      <div className="transaction-title">
                        {transaction.description}
                      </div>

                      <div className="transaction-meta">

                        <span>
                          {transaction.category?.name ||
                            "Category"}
                        </span>

                        <span>•</span>

                        <span>
                          {transaction.transactionDate}
                        </span>

                      </div>

                    </div>

                  </div>

                  <div className="transaction-right">

                    <span
                      className={
                        isIncome
                          ? "transaction-amount income"
                          : "transaction-amount expense"
                      }
                    >
                      {isIncome ? "+" : "-"}
                      ₹
                      {Number(
                        transaction.amount
                      ).toFixed(2)}
                    </span>

                    <button
                      className="delete-button"
                      onClick={() =>
                        onDeleteTransaction(
                          transaction.id
                        )
                      }
                    >
                      <Trash2 size={15} />
                    </button>

                  </div>

                </div>
              );
            }
          )

        ) : (

          <div className="empty-state">
            No transactions found.
          </div>

        )}

      </div>

    </div>
  );
}

export default TransactionList;