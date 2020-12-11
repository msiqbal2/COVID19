package com.covid19.demo.service;

import com.covid19.demo.dao.DataDao;
import com.covid19.demo.dao.UserDao;
import com.covid19.demo.model.Data;
import com.covid19.demo.model.DataDTO;
import com.covid19.demo.model.Province;
import com.covid19.demo.model.User;
import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class DataServiceImpl implements DataService {

    private final static String API_DOMAIN = "https://covid-19-data.p.rapidapi.com/report/country/name";
    private final static SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

    @Autowired
    private DataDao dataDao;

    @Autowired
    private UserDao userDao;

    @Override
    public Data fetchDataByCountryAndDate(Data data) throws IOException,InterruptedException {
        System.out.println(data.getCountryName());
        System.out.println(data.getDate());
        System.out.println(API_DOMAIN + "?date=" + dateFormat.format(data.getDate()) + "&name=" + data.getCountryName());
        if(data.getCountryName() == null || data.getCountryName().isEmpty() || data.getDate() == null) {
            return null; // No required information to fetch
        } else {
            OkHttpClient client = new OkHttpClient();

            Request request = new Request.Builder()
                    .url(API_DOMAIN + "?date=" + dateFormat.format(data.getDate()) + "&name=" + data.getCountryName())
                    .get()
                    .addHeader("x-rapidapi-key", "86bf0b779dmshe179f62c8a7fe38p1da141jsn00eb72cb891f")
                    .addHeader("x-rapidapi-host", "covid-19-data.p.rapidapi.com")
                    .build();

            Response response = client.newCall(request).execute();
            if(response == null || response.body() == null || response.body().toString() == null || response.body().toString().isEmpty()) {
                return null;
            }
            List<DataDTO> list;
            try {
                Type type = new TypeToken<ArrayList<DataDTO>>() {}.getType();
                list = new Gson().fromJson(response.body().string(),type);
            } catch (JsonSyntaxException | ClassCastException e) {
                e.printStackTrace();
                return null;
            }
            if(list == null || list.get(0) == null) return null;
            DataDTO dataDTO = list.get(0);
            int toatlDeaths = 0;
            int totalRecovered = 0;
            int totalConfirmed = 0;
            for(Province province : dataDTO.getProvinces()) {
                toatlDeaths += province.getDeaths();
                totalConfirmed += province.getConfirmed();
                totalRecovered += province.getRecovered();
            }
            Data data1 = new Data(data.getDate(),dataDTO.getCountry(),toatlDeaths,totalConfirmed,totalRecovered);
            return data1;
        }
    }

    @Override
    public boolean saveSnapshot(Data data) {
        if(data == null || data.getDate() == null || data.getCountryName() == null ||
        data.getCountryName().isEmpty()) {
            return false;
        }
        if(data.getUser() == null || data.getUser().getUsername() == null ||
        data.getUser().getUsername().isEmpty()) return false;
        User user = userDao.findUserByUsername(data.getUser().getUsername());
        if(user == null) return false;
        data.getUser().setUserId(user.getUserId());
        return dataDao.save(data) != null ? true : false;
    }

    @Override
    public List<Data> getAll() {
        List<Data> dataList = dataDao.findAll();
        List<Data> res = new ArrayList<>();
        for(Data d : dataList) {
            res.add(new Data(d.getDate(),d.getCountryName(),d.getTotalDeathCases(),d.getTotalCases(),d.getTotalRecovered(),new User(d.getUser().getUsername())));
        }
        return res;
    }

    @Override
    public Data getUSASummary() {
        List<Data> dataList = dataDao.findAllByCountryName("USA");
        return getSummary(dataList);
    }

    @Override
    public Data getItalySummary() {
        List<Data> dataList = dataDao.findAllByCountryName("Italy");
        return getSummary(dataList);
    }

    @Override
    public Data getIndiaSummary() {
        List<Data> dataList = dataDao.findAllByCountryName("India");
        return getSummary(dataList);
    }

    private Data getSummary(List<Data> dataList) {
        int deaths = 0;
        int recovered = 0;
        int cases = 0;
        for(Data d : dataList) {
            deaths += d.getTotalDeathCases();
            cases += d.getTotalCases();
            recovered += d.getTotalRecovered();
        }
        return new Data(deaths,cases,recovered);
    }
}
