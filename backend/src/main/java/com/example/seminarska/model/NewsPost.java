package com.example.seminarska.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@Table(name="NEWSPOST")
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
        property  = "newsPostId",
        scope     = Long.class)
public class NewsPost implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "newsPostId")
    private Long newsPostId;

    @Size(max = 40)
    private String title;

    private String content;

    private String path;

    private Date createdAt;

    private int likes;

    private String tag;

    //@JsonManagedReference()
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user_id", nullable = false, updatable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    User owner;

   // @JsonManagedReference(value = "liked")
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false, insertable = false, updatable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    Set<User> likedByUsers;

    //@JsonManagedReference
    @OneToMany(mappedBy = "newsPost", targetEntity = Comment.class)
    private Set<Comment> comments;


    public  NewsPost(){
        this.createdAt = new Date();
    }
}
