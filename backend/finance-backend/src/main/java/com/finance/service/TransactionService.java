package com.finance.service;

import com.finance.dto.TransactionRequest;
import com.finance.entity.Category;
import com.finance.entity.Transaction;
import com.finance.entity.User;
import com.finance.exception.ResourceNotFoundException;
import com.finance.repository.CategoryRepository;
import com.finance.repository.TransactionRepository;
import com.finance.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public TransactionService(
            TransactionRepository transactionRepository,
            UserRepository userRepository,
            CategoryRepository categoryRepository) {

        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    public Transaction createTransaction(TransactionRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with id: " + request.getUserId()));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Category not found with id: " + request.getCategoryId()));

        Transaction transaction = new Transaction();

        transaction.setUser(user);
        transaction.setCategory(category);
        transaction.setAmount(request.getAmount());
        transaction.setType(request.getType());
        transaction.setDescription(request.getDescription());
        transaction.setTransactionDate(request.getTransactionDate());

        return transactionRepository.save(transaction);
    }

    public List<Transaction> getTransactionsByEmail(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with email: " + email
                        ));

        return transactionRepository.findByUserId(user.getId());
    }
    public Transaction getTransactionById(Long id) {

        return transactionRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Transaction not found with id: " + id));
    }

    public List<Transaction> getTransactionsByUser(Long userId) {

        return transactionRepository.findByUserId(userId);
    }

    public List<Transaction> getExpensesByUser(Long userId) {

        return transactionRepository.findByUserIdAndType(
                userId, "EXPENSE");
    }

    public List<Transaction> getIncomeByUser(Long userId) {

        return transactionRepository.findByUserIdAndType(
                userId, "INCOME");
    }

    public Transaction updateTransaction(
            Long id,
            TransactionRequest request) {

        Transaction transaction = getTransactionById(id);

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Category not found"));

        transaction.setUser(user);
        transaction.setCategory(category);
        transaction.setAmount(request.getAmount());
        transaction.setType(request.getType());
        transaction.setDescription(request.getDescription());
        transaction.setTransactionDate(request.getTransactionDate());

        return transactionRepository.save(transaction);
    }

    public void deleteTransaction(Long id) {

        Transaction transaction = getTransactionById(id);

        transactionRepository.delete(transaction);
    }
}