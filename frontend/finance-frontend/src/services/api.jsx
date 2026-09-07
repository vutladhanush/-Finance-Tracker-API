const API_URL = import.meta.env.VITE_API_URL ||"https://finance-tracker-api-production-651f.up.railway.app/api";


const getHeaders = (isJson = true) => {
  const token = localStorage.getItem("token");

  const headers = {};

  if (isJson) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

const handleResponse = async (response) => {
  const contentType = response.headers.get("content-type");

  const isJson =
    contentType && contentType.includes("application/json");

  const data = isJson
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const errorMessage =
      typeof data === "object"
        ? data.message || JSON.stringify(data)
        : data;

    throw new Error(
      errorMessage ||
      `Request failed with status ${response.status}`
    );
  }

  return data;
};

// =========================
// AUTH
// =========================

export const createUser = async (userData) => {
  const response = await fetch(
    `${API_URL}/auth/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    }
  );

  return handleResponse(response);
};
export const loginUser = async (loginData) => {
  const response = await fetch(
    `${API_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    }
  );

  return handleResponse(response);
};

//=============
// USERS
// =========================

export const getUsers = async () => {
  const response = await fetch(
    `${API_URL}/users`,
    {
      method: "GET",
      headers: getHeaders(false),
    }
  );

  return handleResponse(response);
};

// =========================
// CATEGORIES
// =========================

export const getCategories = async () => {
  const response = await fetch(`${API_URL}/categories`, {
    method: "GET",
    headers: getHeaders(false),
  });

  return handleResponse(response);
};

// =========================
// TRANSACTIONS
// =========================

export const getTransactions = async () => {
  const response = await fetch(
    `${API_URL}/transactions`,
    {
      method: "GET",
      headers: getHeaders(false),
    }
  );

  return handleResponse(response);
};

export const createTransaction = async (transaction) => {
  const response = await fetch(
    `${API_URL}/transactions`,
    {
      method: "POST",
      headers: getHeaders(true),
      body: JSON.stringify(transaction),
    }
  );

  return handleResponse(response);
};

export const deleteTransaction = async (id) => {
  const response = await fetch(
    `${API_URL}/transactions/${id}`,
    {
      method: "DELETE",
      headers: getHeaders(false),
    }
  );

  return handleResponse(response);
};
