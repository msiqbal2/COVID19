package com.covid19.demo.controller;

import com.covid19.demo.model.User;
import com.covid19.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/addNewUser")
    public String addNewUser(@RequestBody  User user) {
        System.out.println(user.toString());
        return service.addNewUser(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return service.login(user);
    }
}
