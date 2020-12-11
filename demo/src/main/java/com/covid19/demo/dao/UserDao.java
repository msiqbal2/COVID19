package com.covid19.demo.dao;

import com.covid19.demo.model.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends JpaRepository<User,Integer> {
    List<User> findUserByUsernameAndPassword(String username, String password);
    User findUserByUsername(String username);
}
