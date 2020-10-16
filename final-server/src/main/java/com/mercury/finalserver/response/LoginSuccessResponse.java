package com.mercury.finalserver.response;

import com.mercury.finalserver.bean.User;

public class LoginSuccessResponse extends Response {

    private User user;

    public LoginSuccessResponse(boolean success, int code, String message, User user) {
        super(success, code, message);
        this.user = user;
    }

    public User getUser() { return user; }

    public void setUser(User user) {
        this.user = user;
    }

}
