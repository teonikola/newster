package com.example.seminarska.model;

import lombok.Getter;
import lombok.Setter;
import org.dom4j.tree.AbstractEntity;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@Table(name="NEWSPOST")
@Entity

public class Like extends AbstractEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private int likes;

    @ManyToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name = "newsPost_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)

    NewsPost newsPost;

    @ManyToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    User user;
}
