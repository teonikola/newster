package com.example.seminarska.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.dom4j.tree.AbstractEntity;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@Getter
@Setter
@Table(name="NEWSPOST")
@Entity
public class NewsPost implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Size(max = 40)
    private String title;

    private String content;

    private String path;

    private Date createdAt;

    private int likes;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user_id", nullable = false, insertable = false, updatable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    User owner;

    @JsonBackReference
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false, insertable = false, updatable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    Set<User> likedByUsers;

    @JsonManagedReference
    @OneToMany(mappedBy = "newsPost", targetEntity = Comment.class)
    private Set<Comment> comments;

//    @JsonManagedReference()
//    @OneToMany(mappedBy = "likeId.news", targetEntity = Like.class)
//    private Set<Like> like;

    public  NewsPost(){
        this.createdAt = new Date();
    }
}
