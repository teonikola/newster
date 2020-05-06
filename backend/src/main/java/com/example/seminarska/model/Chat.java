package com.example.seminarska.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.dom4j.tree.AbstractEntity;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.io.Serializable;



@Getter
@Setter
@AllArgsConstructor
@Table(name = "CHAT")
@Entity
public class Chat implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String sentMessage;

    private String receivedMessage;
    //TODO: enable chat

    @ManyToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name = "sender_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    User sender;

    @ManyToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name = "reciever_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    User reciever;
}
