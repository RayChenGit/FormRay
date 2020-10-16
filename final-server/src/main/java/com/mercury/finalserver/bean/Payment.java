package com.mercury.finalserver.bean;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String bank;

    @Column
    private String accountnumber;

    @Column
    private String routenumber;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "usersid", referencedColumnName = "id")
    private User user;

    public Payment() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getBank() {
        return bank;
    }

    public void setBank(String bank) {
        this.bank = bank;
    }

    public String getAccountnumber() {
        return accountnumber;
    }

    public void setAccountnumber(String accountnumber) {
        this.accountnumber = accountnumber;
    }

    public String getRoutenumber() {
        return routenumber;
    }

    public void setRoutenumber(String routenumber) {
        this.routenumber = routenumber;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
