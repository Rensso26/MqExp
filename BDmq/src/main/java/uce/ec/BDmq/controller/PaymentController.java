package uce.ec.BDmq.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uce.ec.BDmq.services.PaymentService;

@RestController
@RequestMapping("/payments")
public class PaymentController {
    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/start")
    public ResponseEntity<String> startPayment(@RequestParam String transactionId, @RequestParam double amount) {
        paymentService.startPayment(transactionId, amount);
        return ResponseEntity.ok("Pago iniciado con éxito.");
    }

    @PostMapping("/update")
    public ResponseEntity<String> updatePayment(@RequestParam String transactionId, @RequestParam double amountReceived) {
        paymentService.updatePayment(transactionId, amountReceived);
        double pendingAmount = paymentService.getPendingAmount(transactionId);
        if (paymentService.isPaymentComplete(transactionId)) {
            paymentService.completePayment(transactionId);
            return ResponseEntity.ok("Pago completado.");
        }
        return ResponseEntity.ok("Monto pendiente: " + pendingAmount);
    }

    @GetMapping("/pending-amount")
    public ResponseEntity<Double> getPendingAmount(@RequestParam String transactionId) {
        return ResponseEntity.ok(paymentService.getPendingAmount(transactionId));
    }
}
