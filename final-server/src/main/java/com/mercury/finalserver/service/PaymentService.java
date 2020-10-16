package com.mercury.finalserver.service;

import com.mercury.finalserver.bean.Payment;
import com.mercury.finalserver.bean.User;
import com.mercury.finalserver.bean.UserWithPayment;
import com.mercury.finalserver.dao.PaymentDao;
import com.mercury.finalserver.dao.UserDao;
import com.mercury.finalserver.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    PaymentDao paymentDao;

    @Autowired
    UserDao userDao;

    public Response addPayment(UserWithPayment userWithPayment) {
        try {
            User user = userDao.findById(userWithPayment.getUserid()).orElse(null);
            Payment payment = userWithPayment.getPayment();
            payment.setUser(user);
            paymentDao.save(payment);
            return new Response(true, 200, "Add payment successfully!");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new Response(false, 400, "Add failed");
    }


    public Response deletePayment(UserWithPayment userWithPayment) {

        User user = userDao.findById(userWithPayment.getUserid()).orElse(null);
        if (user != null && user.getPayments().size() == 1) {
            return new Response(false, 400, "This is the only payment you have!");
        }
        try {
            Payment existing = paymentDao.getOne(userWithPayment.getPayment().getId());
            paymentDao.delete(existing);
            return new Response(true, 200, "Delete payment successfully!");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new Response(false, 400, "delete failed");
    }

}
