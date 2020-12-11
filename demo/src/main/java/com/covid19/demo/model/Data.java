package com.covid19.demo.model;

import org.hibernate.annotations.DynamicUpdate;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@DynamicUpdate
@IdClass(DataId.class)
public class Data {
    @Id
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date date;
    @Id
    private String countryName;
    private int totalDeathCases;
    private int totalCases;
    private int totalRecovered;
    @ManyToOne
    @JoinColumn(name = "user")
    private User user;

    public Data() {
    }

    public Data(int totalDeathCases, int totalCases, int totalRecovered) {
        this.totalDeathCases = totalDeathCases;
        this.totalCases = totalCases;
        this.totalRecovered = totalRecovered;
    }

    public Data(Date date, String countryName, int totalDeathCases, int totalCases, int totalRecovered) {
        this.date = date;
        this.countryName = countryName;
        this.totalDeathCases = totalDeathCases;
        this.totalCases = totalCases;
        this.totalRecovered = totalRecovered;
    }

    public Data(Date date, String countryName, int totalDeathCases, int totalCases, int totalRecovered, User user) {
        this.date = date;
        this.countryName = countryName;
        this.totalDeathCases = totalDeathCases;
        this.totalCases = totalCases;
        this.totalRecovered = totalRecovered;
        this.user = user;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public int getTotalDeathCases() {
        return totalDeathCases;
    }

    public void setTotalDeathCases(int totalDeathCases) {
        this.totalDeathCases = totalDeathCases;
    }

    public int getTotalCases() {
        return totalCases;
    }

    public void setTotalCases(int totalCases) {
        this.totalCases = totalCases;
    }

    public int getTotalRecovered() {
        return totalRecovered;
    }

    public void setTotalRecovered(int totalRecovered) {
        this.totalRecovered = totalRecovered;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
