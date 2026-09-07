package com.finance.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginRequest {

    private String email;
    private String password;
    private final Long userId;
    private final String name;


    }
