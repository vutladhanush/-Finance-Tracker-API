package com.finance.controller;

import com.finance.dto.TransactionRequest;
import com.finance.entity.Transaction;
import com.finance.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping
    public ResponseEntity<Transaction> createTransaction(
            @Valid @RequestBody TransactionRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(transactionService.createTransaction(request));
    }

    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions(
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                transactionService.getTransactionsByEmail(email)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getTransactionById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                transactionService.getTransactionById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Transaction>> getTransactionsByUser(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                transactionService.getTransactionsByUser(userId));
    }

    @GetMapping("/user/{userId}/expenses")
    public ResponseEntity<List<Transaction>> getExpenses(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                transactionService.getExpensesByUser(userId));
    }

    @GetMapping("/user/{userId}/income")
    public ResponseEntity<List<Transaction>> getIncome(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                transactionService.getIncomeByUser(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transaction> updateTransaction(
            @PathVariable Long id,
            @Valid @RequestBody TransactionRequest request) {

        return ResponseEntity.ok(
                transactionService.updateTransaction(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(
            @PathVariable Long id) {

        transactionService.deleteTransaction(id);

        return ResponseEntity.noContent().build();
    }
}