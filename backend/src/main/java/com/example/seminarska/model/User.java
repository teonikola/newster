package com.example.seminarska.model;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.dom4j.tree.AbstractEntity;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="USERS", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "username"
        }),
        @UniqueConstraint(columnNames = {
                "email"
        })
})

@Entity

public class User implements Serializable  {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    @Size(max = 40)
    private String name;

    @NotBlank
    @Size(max = 15)
    private String username;

    @NaturalId
    @NotBlank
    @Size(max = 40)
    @Email
    private String email;

    @NotBlank
    @Size(max = 100)
    private String password;

    public User(String name, String username, String email, String password) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
    }
//    @JsonManagedReference(value="user")
//    @OneToMany(mappedBy = "likeId.user",targetEntity = Like.class)
//    private Set<Like> like;

    @JsonManagedReference
    @ManyToMany(mappedBy = "likedByUsers", targetEntity = NewsPost.class)
    private Set<NewsPost> likedPosts;

    @JsonManagedReference
    @OneToMany(mappedBy = "owner", targetEntity = NewsPost.class)
    private Set<NewsPost> createdPosts;


}
