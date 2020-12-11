package com.covid19.demo.service;

import com.covid19.demo.model.Data;

import java.io.IOException;
import java.util.List;

public interface DataService {
    Data fetchDataByCountryAndDate(Data data) throws IOException,InterruptedException;
    boolean saveSnapshot(Data data);
    List<Data> getAll();
    Data getUSASummary();
    Data getItalySummary();
    Data getIndiaSummary();
}
