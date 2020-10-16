package com.mercury.finalserver.bean;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "submission")
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String fullname;

    @Column
    private String email;

    @Column
    private String datebirth;

    @Column
    private String phonenumber;

    @Column
    private String address;

    @Column
    private String aptste;

    @Column
    private String zip;

    @Column
    private String city;

    @Column
    private String state;

    @Column
    private String ssn;

    @Column
    private double annualincome;

    @Column
    private String incomesource;

    @Column
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime submittime = LocalDateTime.now();

    @Column
    private String bankeradvice;

    @Column
    private boolean reviewed;

    @Column
    private boolean decided;

    @Column
    private String finalresult;

    @Column
    private boolean approval;

    @ManyToOne
    @JoinColumn(name = "cardtypeid", referencedColumnName = "id")
    private CardType cardtype;

    public Submission() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDatebirth() {
        return datebirth;
    }

    public void setDatebirth(String datebirth) {
        this.datebirth = datebirth;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAptste() {
        return aptste;
    }

    public void setAptste(String aptste) {
        this.aptste = aptste;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getSsn() {
        return ssn;
    }

    public void setSsn(String ssn) {
        this.ssn = ssn;
    }

    public double getAnnualincome() {
        return annualincome;
    }

    public void setAnnualincome(double annualincome) {
        this.annualincome = annualincome;
    }

    public String getIncomesource() {
        return incomesource;
    }

    public void setIncomesource(String incomesource) {
        this.incomesource = incomesource;
    }

    public LocalDateTime getSubmittime() {
        return submittime;
    }

    public void setSubmittime(LocalDateTime submittime) {
        this.submittime = submittime;
    }

    public String getBankeradvice() {
        return bankeradvice;
    }

    public void setBankeradvice(String bankeradvice) {
        this.bankeradvice = bankeradvice;
    }

    public boolean isReviewed() {
        return reviewed;
    }

    public void setReviewed(boolean reviewed) {
        this.reviewed = reviewed;
    }

    public boolean isDecided() {
        return decided;
    }

    public void setDecided(boolean decided) {
        this.decided = decided;
    }

    public String getFinalresult() {
        return finalresult;
    }

    public void setFinalresult(String finalresult) {
        this.finalresult = finalresult;
    }

    public boolean isApproval() {
        return approval;
    }

    public void setApproval(boolean approval) {
        this.approval = approval;
    }

    public CardType getCardtype() {
        return cardtype;
    }

    public void setCardtype(CardType cardtype) {
        this.cardtype = cardtype;
    }
}
