package com.example.seminarska.repository;

import com.example.seminarska.model.User;
import com.example.seminarska.payload.UserSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    User findByUsername(String username);

    User findByUsernameOrEmail(String usernameOrEmail, String usernameOrEmail1);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    User findById(long id);
}
