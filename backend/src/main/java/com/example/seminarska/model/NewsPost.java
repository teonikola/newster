package com.example.seminarska.model;

import lombok.Getter;
import lombok.Setter;
import org.dom4j.tree.AbstractEntity;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@Table(name="NEWSPOST")
@Entity
public class NewsPost extends AbstractEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    @Size(max = 40)
    private String title;


    private String content;

    private String path;



    private Date createdAt;

    public NewsPost(Long id,  @Size(max = 40) String title, @NotBlank String text) {
        this.id = id;
        this.title = title;
        this.content = text;
        this.createdAt = new Date();
    }

    public NewsPost(Long id,  @Size(max = 40) String title, @NotBlank String text, String path) {
        this.id = id;
        this.title = title;
        this.content = text;
        this.path = path;
        this.createdAt = new Date();
    }
    public  NewsPost(){}
}
