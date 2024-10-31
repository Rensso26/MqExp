package uce.ec.BDmq.services;

import org.springframework.stereotype.Service;
import uce.ec.BDmq.state.PendingPayment;

import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentService {
    private final Map<String, PendingPayment> pendingPayments = new HashMap<>();

    public void startPayment(String transactionId, double amount) {
        pendingPayments.put(transactionId, new PendingPayment(transactionId, amount));
    }

    public void updatePayment(String transactionId, double amountReceived) {
        PendingPayment payment = pendingPayments.get(transactionId);
        if (payment != null) {
            payment.addAmount(amountReceived);
        }
    }

    public boolean isPaymentComplete(String transactionId) {
        PendingPayment payment = pendingPayments.get(transactionId);
        return payment != null && payment.isComplete();
    }

    public void completePayment(String transactionId) {
        pendingPayments.remove(transactionId); // Remove the payment once it's complete
    }

    public double getPendingAmount(String transactionId) {
        PendingPayment payment = pendingPayments.get(transactionId);
        return payment != null ? payment.getPendingAmount() : 0.0;
    }
}
