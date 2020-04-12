package com.example.seminarska.controller;


import com.example.seminarska.model.NewsPost;
import com.example.seminarska.repository.NewsPostRepository;
import com.example.seminarska.service.NewsPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class NewsPostController {

    @Autowired
    private NewsPostService newsPostService;

    @PostMapping("/createNewsPost")
    public void createNews(@RequestBody NewsPost newsPost){
        newsPostService.save(newsPost);
    }

    @GetMapping("/fetchPosts")
    public List<NewsPost> getAll(){
        return newsPostService.getAllPosts();
    }
}
