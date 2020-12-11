package com.covid19.demo.controller;

import com.covid19.demo.model.Data;
import com.covid19.demo.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.io.IOException;


@RestController
@RequestMapping("/data")
@CrossOrigin(origins = "*")
public class StatisticsController {

    @Autowired
    private DataService service;

    @PostMapping("/fetch")
    public Data fetchDataByDateAndCountry(@RequestBody Data data) throws IOException,InterruptedException {
        return service.fetchDataByCountryAndDate(data);
    }

    @PostMapping("/saveSnapshot")
    public boolean saveSnapshot(@RequestBody Data data) {
        return service.saveSnapshot(data);
    }

    @GetMapping("/all")
    public List<Data> getAll() {
        return service.getAll();
    }

    @GetMapping("/summary/usa")
    public Data summaryUSA() {
        return service.getUSASummary();
    }

    @GetMapping("/summary/india")
    public Data summaryIndia() {
        return service.getIndiaSummary();
    }

    @GetMapping("/summary/italy")
    public Data summaryItaly() {
        return service.getItalySummary();
    }
}

