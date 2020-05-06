package com.example.seminarska.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.dom4j.tree.AbstractEntity;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@Table(name="POST_LIKE")
@Entity

public class Like implements Serializable {

//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    private Long id;

    private boolean isLiked;

    @EmbeddedId
    @JsonIgnore
    private LikeId likeId;

    //TODO: like functionality back end

}
@NoArgsConstructor
@Embeddable
@Getter
@Setter
class LikeId implements Serializable {

    @JsonBackReference
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "news_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    NewsPost news;

    @JsonBackReference(value="user")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    User user;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LikeId likeId = (LikeId) o;
        return Objects.equals(news, likeId.news) &&
                Objects.equals(user, likeId.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(news, user);
    }
}