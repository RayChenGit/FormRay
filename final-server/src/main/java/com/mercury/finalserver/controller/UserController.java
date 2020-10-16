package com.mercury.finalserver.controller;

import com.mercury.finalserver.bean.User;
import com.mercury.finalserver.bean.UserWithAddedCard;
import com.mercury.finalserver.bean.UserWithPassword;
import com.mercury.finalserver.response.Response;
import com.mercury.finalserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/users")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping(value = "/allUsers")
    @PreAuthorize("hasAnyAuthority('admin')")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public Response postUser(@RequestBody User newUser) {
        return userService.register(newUser);
    }

    @GetMapping(value = "/checkname/{input}")
    public boolean postUser(@PathVariable String input) {
        return userService.checkUsernameExist(input);
    }

    @PutMapping(value = "/password")
    @PreAuthorize("isAuthenticated()")
    public Response updatePassword(@RequestBody UserWithPassword userWithPassword) {
        return userService.updatePassword(userWithPassword);
    }

    @PutMapping(value = "/information")
    @PreAuthorize("isAuthenticated()")
    public Response updateInformation(@RequestBody User user) {
        return userService.updateInformation(user);
    }

    @PutMapping(value = "/addCard")
    public Response addCard(@RequestBody UserWithAddedCard userWithAddedCard) {
        return userService.addCard(userWithAddedCard);
    }

    @PutMapping(value = "/newest")
    @PreAuthorize("isAuthenticated()")
    public User getNewest(@RequestBody User user) {
        return userService.getNewest(user);
    }

}
