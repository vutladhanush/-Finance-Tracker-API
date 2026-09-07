import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { getCategories } from "../services/api";

function TransactionForm({ userId, onAddTransaction }) {

  const [categories, setCategories] = useState([]);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("EXPENSE");
  const [categoryId, setCategoryId] = useState("");
  const [transactionDate, setTransactionDate] =
    useState(
      new Date().toISOString().split("T")[0]
    );

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);

      if (data.length > 0) {
        setCategoryId(data[0].id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleTypeChange = (newType) => {
    setType(newType);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !amount || !categoryId) {
      return;
    }
const transaction = {
  userId: userId,
  categoryId: Number(categoryId),
  amount: Number(amount),
  type: type,
  description: description,
  transactionDate: transactionDate
};
    await onAddTransaction(transaction);

    setDescription("");
    setAmount("");
  };

  return (
    <div className="panel">

      <h3 className="panel-title">
        <Plus size={17} />
        Add New Transaction
      </h3>

      <form onSubmit={handleSubmit}>

        <div className="type-toggle">

          <button
            type="button"
            className={
              type === "EXPENSE"
                ? "type-button expense-active"
                : "type-button"
            }
            onClick={() =>
              handleTypeChange("EXPENSE")
            }
          >
            Expense
          </button>

          <button
            type="button"
            className={
              type === "INCOME"
                ? "type-button income-active"
                : "type-button"
            }
            onClick={() =>
              handleTypeChange("INCOME")
            }
          >
            Income
          </button>

        </div>

        <div className="form-group">

          <label>Description</label>

          <input
            type="text"
            placeholder="e.g. Grocery Store"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

        </div>

        <div className="form-row">

          <div className="form-group">

            <label>Amount</label>

            <input
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
            />

          </div>

          <div className="form-group">

      <label>Category</label>

<select
  value={categoryId}
  onChange={(e) => setCategoryId(e.target.value)}
>
  <option value="">Select Category</option>

  {categories.map((category) => (
    <option
      key={category.id}
      value={category.id}
    >
      {category.name}
    </option>
  ))}
</select>
          </div>

        </div>

        <div className="form-group">

          <label>Date</label>

          <input
            type="date"
            value={transactionDate}
            onChange={(e) =>
              setTransactionDate(e.target.value)
            }
          />

        </div>

        <button className="primary-button">
          Add Transaction
        </button>

      </form>

    </div>
  );
}

export default TransactionForm;