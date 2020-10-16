package com.mercury.finalserver.bean;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "card")
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String cardnumber;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column
    private String cardid;

    @Column(precision = 10, scale = 2)
    private double postedcharge;

    @Column(precision = 10, scale = 2)
    private double totalbalance;

    @Column
    private int cardlimit;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "usersid", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "cardtypeid", referencedColumnName = "id")
    private CardType cardType;

    @OneToMany(mappedBy = "card", fetch = FetchType.EAGER)
    private Set<Transaction> transactions;

    public Card() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCardnumber() {
        return cardnumber;
    }

    public void setCardnumber(String cardnumber) {
        this.cardnumber = cardnumber;
    }

    public double getPostedcharge() {
        return postedcharge;
    }

    public void setPostedcharge(double postedcharge) {
        this.postedcharge = postedcharge;
    }

    public double getTotalbalance() {
        return totalbalance;
    }

    public void setTotalbalance(double totalbalance) {
        this.totalbalance = totalbalance;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public CardType getCardType() {
        return cardType;
    }

    public void setCardType(CardType cardType) {
        this.cardType = cardType;
    }

    public String getCardid() {
        return cardid;
    }

    public void setCardid(String cardid) {
        this.cardid = cardid;
    }

    public Set<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(Set<Transaction> transactions) {
        this.transactions = transactions;
    }

    public int getCardlimit() {
        return cardlimit;
    }

    public void setCardlimit(int cardlimit) {
        this.cardlimit = cardlimit;
    }
}
