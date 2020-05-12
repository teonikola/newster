package com.example.seminarska.service;

import com.example.seminarska.model.NewsPost;
import com.example.seminarska.model.User;
import com.example.seminarska.repository.NewsPostRepository;
import com.example.seminarska.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class NewsPostService {

    @Autowired
    NewsPostRepository newsPostRepository;
    @Autowired
    UserRepository userRepository;

    public void save(NewsPost np){
        np.setCreatedAt(new Date());
        newsPostRepository.save(np);
    }
    public List<Long> getAllPostIds(){
        List<Long> listOfIds = new ArrayList<>();
        for(int i = 0;i<newsPostRepository.findAll().size();i++){
            listOfIds.add(newsPostRepository.findAll().get(i).getNewsPostId());
        }
        return listOfIds;
    }
    public NewsPost findPostById(Long id){
        return newsPostRepository.findById(id).get();
    }

    public List<Long> sciencePosts(){
        List<Long> listOfIds = new ArrayList<>();
        for(int i = 0;i<newsPostRepository.findAll().size();i++){
            if(newsPostRepository.findAll().get(i).getTag().equals("science"))
                listOfIds.add(newsPostRepository.findAll().get(i).getNewsPostId());
        }
        return listOfIds;
    }

    public List<Long> sportsPosts(){
        List<Long> listOfIds = new ArrayList<>();
        for(int i = 0;i<newsPostRepository.findAll().size();i++){
            if(newsPostRepository.findAll().get(i).getTag().equals("sports"))
                listOfIds.add(newsPostRepository.findAll().get(i).getNewsPostId());
        }
        return listOfIds;
    }
    public List<Long> entertainmentPosts(){
        List<Long> listOfIds = new ArrayList<>();
        for(int i = 0;i<newsPostRepository.findAll().size();i++){
            if(newsPostRepository.findAll().get(i).getTag().equals("entertainment"))
                listOfIds.add(newsPostRepository.findAll().get(i).getNewsPostId());
        }
        return listOfIds;
    }
    public List<Long> otherPosts(){
        List<Long> listOfIds = new ArrayList<>();
        for(int i = 0;i<newsPostRepository.findAll().size();i++){
            if(newsPostRepository.findAll().get(i).getTag().equals("other"))
                listOfIds.add(newsPostRepository.findAll().get(i).getNewsPostId());
        }
        return listOfIds;
    }

    public void postLikedByUser(Long post_id,User user){

        newsPostRepository.findById(post_id).get().getLikedByUsers().add(user);
        newsPostRepository.findById(post_id).get().setLikes(newsPostRepository.findById(post_id).get().getLikes()+1);
        newsPostRepository.save(newsPostRepository.findById(post_id).get());
    }

    public void postUnlikedByUser(Long post_id,User user) {
        newsPostRepository.findById(post_id).get().getLikedByUsers().remove(userRepository.findById(user.getId()).get());
        newsPostRepository.findById(post_id).get().setLikes(newsPostRepository.findById(post_id).get().getLikes() - 1);
        //newsPostRepository.findById(post_id).get().setLikes(2);
        newsPostRepository.save(newsPostRepository.findById(post_id).get());
    }


}
