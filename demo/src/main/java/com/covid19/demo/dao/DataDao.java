package com.covid19.demo.dao;

import com.covid19.demo.model.Data;
import com.covid19.demo.model.DataId;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface DataDao extends JpaRepository<Data, DataId> {
    List<Data> findAllByCountryName(String countryName);
}
