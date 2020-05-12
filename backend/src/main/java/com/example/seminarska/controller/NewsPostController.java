package com.example.seminarska.controller;

import com.example.seminarska.model.NewsPost;
import com.example.seminarska.model.User;
import com.example.seminarska.payload.ApiResponse;
import com.example.seminarska.repository.NewsPostRepository;
import com.example.seminarska.service.NewsPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public List<Long> getAll(){
        return newsPostService.getAllPostIds();
    }
    @GetMapping("fetchPost/{id}")
    public NewsPost getNewsPostById(@PathVariable Long id){
        return newsPostService.findPostById(id);
    }
    @GetMapping("/fetchPosts/science")
    public List<Long> getSciencePosts(){
        return newsPostService.sciencePosts();
    }
    @GetMapping("/fetchPosts/sports")
    public List<Long> getSportsPosts(){
        return newsPostService.sportsPosts();
    }
    @GetMapping("/fetchPosts/entertainment")
    public List<Long> getEntertainmentPosts(){
        return newsPostService.entertainmentPosts();
    }
    @GetMapping("/fetchPosts/other")
    public List<Long> getOtherPosts(){
        return newsPostService.otherPosts();
    }

    @PutMapping("likedBy/{id}")
    public ResponseEntity<?> likedByUser(@PathVariable Long id,@RequestBody User user){
        newsPostService.postLikedByUser(id, user);
        return ResponseEntity.ok().body(new ApiResponse(true,"Post liked!"));
    }
    @PutMapping("unlikedBy/{id}")
    public ResponseEntity<?> unlikedByUser(@PathVariable Long id,@RequestBody User user){
        newsPostService.postUnlikedByUser(id, user);
        return ResponseEntity.ok().body(new ApiResponse(true,"Post unliked!"));
    }
}
