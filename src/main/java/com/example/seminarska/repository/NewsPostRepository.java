package com.example.seminarska.repository;

import com.example.seminarska.model.NewsPost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsPostRepository extends JpaRepository<NewsPost,Long> {

}
