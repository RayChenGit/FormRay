package com.mercury.finalserver.service;

import com.mercury.finalserver.dao.UserDao;
import com.mercury.finalserver.response.LoginSuccessResponse;
import com.mercury.finalserver.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    UserDao userDao;

    public Response checkLogin(Authentication authentication) {
        if (authentication != null) {
            return new LoginSuccessResponse(true, 200, "Login Successfully!", userDao.findByUsername(authentication.getName()));
        } else {
            return new Response(false);
        }
    }
}
