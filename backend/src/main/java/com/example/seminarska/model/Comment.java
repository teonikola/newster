package com.example.seminarska.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.dom4j.tree.AbstractEntity;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@Table(name = "COMMENT")
@Entity
public class Comment implements Serializable {
    public Comment() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String comment;

    //@JsonBackReference
    @ManyToOne(fetch = FetchType.EAGER,optional = false)
    @JoinColumn(name = "newsPost_newsPostId", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    NewsPost newsPost;

    @ManyToOne(fetch = FetchType.EAGER,optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    User user;
}
