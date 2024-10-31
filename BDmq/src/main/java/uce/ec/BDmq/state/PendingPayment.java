package uce.ec.BDmq.state;

public class PendingPayment {
    private final String transactionId;
    private final double totalAmount;
    private double amountPaid;

    public PendingPayment(String transactionId, double totalAmount) {
        this.transactionId = transactionId;
        this.totalAmount = totalAmount;
        this.amountPaid = 0.0;
    }

    public void addAmount(double amountReceived) {
        this.amountPaid += amountReceived;
    }

    public boolean isComplete() {
        return amountPaid >= totalAmount;
    }

    public double getPendingAmount() {
        return totalAmount - amountPaid;
    }
}
