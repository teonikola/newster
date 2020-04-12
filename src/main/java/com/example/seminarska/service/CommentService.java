package com.example.seminarska.service;

import com.example.seminarska.model.Comment;
import com.example.seminarska.model.NewsPost;
import com.example.seminarska.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

    @Autowired
    CommentRepository commentRepository;

    public void save(Comment comment){
        commentRepository.save(comment);
    }
}
