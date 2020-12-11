package com.covid19.demo.service;

import com.covid19.demo.model.User;

public interface UserService {
    String addNewUser(User user);
    User login(User user);
}
