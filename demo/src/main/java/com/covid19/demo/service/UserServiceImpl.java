package com.covid19.demo.service;

import com.covid19.demo.dao.UserDao;
import com.covid19.demo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao dao;

    @Override
    public String addNewUser(User user) {
        if(user.getUserId() != 0 && !user.getUsername().isEmpty() && !user.getPassword().isEmpty()) {
            User user1 = dao.save(user);
            if(user1 != null) {
                return "Added new user";
            } else {
                return "Failed to add new user";
            }
        } else {
            return "Required user id, name, password to register new user";
        }
    }

    @Override
    public User login(User user) {
        List<User> user1 = dao.findUserByUsernameAndPassword(user.getUsername(),user.getPassword());
        User temp = user1.get(0);
        User user2 = new User(temp.getUserId(),temp.getUsername(),temp.isAdmin());
        return user2;
    }
}
