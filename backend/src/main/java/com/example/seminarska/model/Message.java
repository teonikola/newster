package com.example.seminarska.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@NoArgsConstructor
@Getter
@Setter
public class Message {
    private String writer;
    private String message;
    private Date createdAt;
}
