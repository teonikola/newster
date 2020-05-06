package com.example.seminarska.service;


import com.example.seminarska.model.User;
import com.example.seminarska.payload.UserSummary;
import com.example.seminarska.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository repo;

    public User findUserByUsername(String username){
        return repo.findByUsername(username);
    }

    public User save(User user){
        if(findUserByUsername(user.getUsername())==null)
             return repo.save(user);
        else return null;
    }
    public User getUserById(long id){
        User user = repo.findById(id);
        return user;
    }
    public List<User> getAllUsers(){
        return repo.findAll();
    }
    public void deleteAll(){
        repo.deleteAll();
    }
}
