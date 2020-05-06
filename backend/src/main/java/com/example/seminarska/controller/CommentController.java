package com.example.seminarska.controller;

import com.example.seminarska.model.Comment;
import com.example.seminarska.payload.ApiResponse;
import com.example.seminarska.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("comment")
    public ResponseEntity<?> comment(@RequestBody Comment commentPayload){
        commentService.save(commentPayload);
        return ResponseEntity.ok().body(new ApiResponse(true, "Comment added successfully"));
    }

    @GetMapping("fetchComments")
    public List<Comment> getAllComments(){
        return commentService.getAll();
    }
}
