package com.covid19.demo.model;

import java.io.Serializable;
import java.util.Date;

public class DataId implements Serializable {
    private Date date;
    private String countryName;

    public DataId() {
    }

    public DataId(Date date, String countryName) {
        this.date = date;
        this.countryName = countryName;
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
}
