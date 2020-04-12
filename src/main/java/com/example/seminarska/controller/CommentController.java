package com.example.seminarska.controller;

import com.example.seminarska.model.Comment;
import com.example.seminarska.repository.CommentRepository;
import com.example.seminarska.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("comment")
    public void comment(@RequestBody Comment comment){
        commentService.save(comment);
    }
}
