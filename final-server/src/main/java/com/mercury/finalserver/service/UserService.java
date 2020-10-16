package com.mercury.finalserver.service;

import com.mercury.finalserver.bean.Card;
import com.mercury.finalserver.bean.User;
import com.mercury.finalserver.bean.UserWithAddedCard;
import com.mercury.finalserver.bean.UserWithPassword;
import com.mercury.finalserver.dao.CardDao;
import com.mercury.finalserver.dao.UserDao;
import com.mercury.finalserver.response.LoginSuccessResponse;
import com.mercury.finalserver.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    UserDao userDao;

    @Autowired
    CardDao cardDao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userDao.findByUsername(username) == null ? new User() : userDao.findByUsername(username);
    }

    @Autowired
    PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userDao.findAll();
    }

    public boolean checkUsernameExist(String input) {
        User existing = userDao.findByUsername(input);
        return existing == null ? true : false;
    }

    public Response register(User newUser) {
        User existing = userDao.findByUsername(newUser.getUsername());
        if (existing != null) {
            return new Response(false, 400, "User exists. Choose a different username");
        } else {
            newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
            if (newUser.getUserInformation() != null) {
                newUser.getUserInformation().setUser(newUser);
            }
            try{
                userDao.save(newUser);
                return new Response(true, 200, "Register success!");
            } catch (Exception e) {
                e.printStackTrace();
            }
            return new Response(false, 403, "Register failed, try again");
        }
    }

    public Response updatePassword(UserWithPassword userWithPassword) {

        User existing = userDao.findByUsername(userWithPassword.getUsername());
        String oldPassword = userWithPassword.getOldPassword();

        if (!passwordEncoder.matches(oldPassword, existing.getPassword())) {
            return new Response(false, 403, "wrong old password");
        } else {
            existing.setPassword(passwordEncoder.encode(userWithPassword.getNewPassword()));
            try {
                userDao.save(existing);
                return new Response(true, 200, "change password successfully");
            } catch (Exception e) {
                e.printStackTrace();
            }
            return new Response(false, 400, "change password failed, try again");
        }
    }

    public Response updateInformation(User user) {
        User existing = userDao.findByUsername(user.getUsername());
        user.getUserInformation().setUser(existing);
        existing.setUserInformation(user.getUserInformation());
        try {
            userDao.save(existing);
            return new Response(true, 200, "update success");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new Response(false, 403, "update failed, try again");
    }

    @Transactional
    public Response addCard(UserWithAddedCard userWithAddedCard) {
        Card existing = cardDao.findByCardnumber(userWithAddedCard.getCardnumber());
        if (existing == null || !passwordEncoder.matches(userWithAddedCard.getCardid(), existing.getCardid())) {
            return new Response(false, 400,"wrong card information");
        } else if (existing.getUser() != null) {
            return new Response(false, 401,"this card has been added to an existing account");
        } else {
            User user = userDao.findByUsername(userWithAddedCard.getUsername());
            existing.setUser(user);
            try {
                cardDao.save(existing);
                user.getCards().add(existing);
                return new LoginSuccessResponse(true, 200, "add successfully", user);
            } catch (Exception e) {
                e.printStackTrace();
            }
            return new Response(false, 403, "add unsuccessfully");
        }
    }


    public boolean addPoints(int add, String username) {
        try {
            User existing = userDao.findByUsername(username);
            existing.setPoints(existing.getPoints() + add);
            userDao.save(existing);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }



    public User getNewest(User user) {
        return userDao.findByUsername(user.getUsername());
    }



}
