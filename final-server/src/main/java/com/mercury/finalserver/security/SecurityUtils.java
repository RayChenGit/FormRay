package com.mercury.finalserver.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mercury.finalserver.bean.User;
import com.mercury.finalserver.response.LoginSuccessResponse;
import com.mercury.finalserver.response.Response;
import org.springframework.security.core.GrantedAuthority;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collection;

public class SecurityUtils {

    private static final ObjectMapper mapper = new ObjectMapper();

    public static void sendResponse(HttpServletResponse httpServletResponse, int status, String message, Exception exception)
            throws IOException {
        Response response = new Response(exception == null ? true : false, status, message);
        flushResponse(httpServletResponse, response);
    }

    public static void sendAuthenticationSuccessResponse(HttpServletResponse httpServletResponse, int status, String message, Exception exception, User user)
            throws IOException {
        Response response = new LoginSuccessResponse(exception == null ? true : false, status, message, user);
        flushResponse(httpServletResponse, response);
    }

    public static void flushResponse(HttpServletResponse httpServletResponse, Response response) throws IOException {
        httpServletResponse.setContentType("application/json;charset=UTF-8");
        httpServletResponse.setStatus(response.getCode());
        PrintWriter writer = httpServletResponse.getWriter();
        writer.write(mapper.writeValueAsString(response));
        writer.flush();
        writer.close();
    }

}
