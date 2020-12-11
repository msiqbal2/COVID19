package com.covid19.demo.model;

import org.springframework.format.annotation.DateTimeFormat;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class DataDTO {

    private String country;
    private List<Province> provinces = new ArrayList<>();
    private double latitude;
    private double longitude;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date date;

    public DataDTO() {
    }

    public DataDTO(String country, List<Province> provinces, double latitude, double longitude, Date date) {
        this.country = country;
        this.provinces = provinces;
        this.latitude = latitude;
        this.longitude = longitude;
        this.date = date;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public List<Province> getProvinces() {
        return provinces;
    }

    public void setProvinces(List<Province> provinces) {
        this.provinces = provinces;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
