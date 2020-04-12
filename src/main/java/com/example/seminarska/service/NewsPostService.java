package com.example.seminarska.service;

import com.example.seminarska.model.NewsPost;
import com.example.seminarska.repository.NewsPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;

@Service
public class NewsPostService {

    @Autowired
    NewsPostRepository newsPostRepository;

    public void save(NewsPost np){
        np.setCreatedAt(new Date());
        newsPostRepository.save(np);
    }
    public List<NewsPost> getAllPosts(){
        return newsPostRepository.findAll();
    }
}
