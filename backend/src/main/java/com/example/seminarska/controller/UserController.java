package com.example.seminarska.controller;

import com.example.seminarska.model.User;
import com.example.seminarska.payload.UserIdentityAvailability;
import com.example.seminarska.payload.UserSummary;
import com.example.seminarska.repository.UserRepository;
import com.example.seminarska.security.CurrentUser;
import com.example.seminarska.security.UserPrincipal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/user/me")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser){
        return new UserSummary(currentUser.getId(),currentUser.getUsername(),currentUser.getName());
        //return userSummary;
    }

    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }
    @GetMapping("/user/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
        Boolean isAvailable = !userRepository.existsByUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }
    @GetMapping("user/{userId}")
    public User getUserById(@PathVariable(value = "userId") String id){
        return userRepository.findById((Long.parseLong(id)));
    }
    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }

}
