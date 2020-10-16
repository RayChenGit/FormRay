package com.mercury.finalserver.bean;


import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "cardtype")
public class CardType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String name;
    @Column
    private String description;
    @Column
    private String bonus;
    @Column
    private String otherbonus;
    @Column
    private String annualfee;
    @Column
    private String image;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "cardtype_benefit",
            joinColumns = {@JoinColumn(name = "cardtypeid", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "benefitid", referencedColumnName = "id")}
    )
    private Set<Benefit> benefits;

    public CardType() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBonus() {
        return bonus;
    }

    public void setBonus(String bonus) {
        this.bonus = bonus;
    }

    public String getOtherbonus() {
        return otherbonus;
    }

    public void setOtherbonus(String otherbonus) {
        this.otherbonus = otherbonus;
    }

    public String getAnnualfee() {
        return annualfee;
    }

    public void setAnnualfee(String annualfee) {
        this.annualfee = annualfee;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Set<Benefit> getBenefits() {
        return benefits;
    }

    public void setBenefits(Set<Benefit> benefits) {
        this.benefits = benefits;
    }
}
