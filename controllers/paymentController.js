const Booking = require('../models/Booking');

exports.payment = async (req, res) => {
    try {
        const { bookingId, method, details } = req.body;

        if (!bookingId || !method) {
            return res.status(400).json({ error: "Booking Id and Payment Method are required" });
        }

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        if (booking.status !== "PENDING") {
            return res.status(400).json({ error: "Unable to pay" });
        }

        switch (method) {
            case "UPI":
                if (!details || !details.upiId) {
                    return res.status(400).json({ error: "UPI details are required" });
                }
                break;

            case "CARD":
                if (
                    !details ||
                    !details.cardNumber ||
                    !details.cardExpiry ||
                    !details.cardCVV
                ) {
                    return res.status(400).json({ error: "Card details are required" });
                }
                break;

            case "NETBANKING":
                if (!details || !details.bankName) {
                    return res.status(400).json({ error: "Bank name is required" });
                }
                break;

            case "PAYPAL":
                if (!details || !details.paypalEmail) {
                    return res.status(400).json({ error: "Paypal email is required" });
                }
                break;

            case "GIFT_CARD":
                if (!details || !details.giftCardNumber) {
                    return res.status(400).json({ error: "Gift card number is required" });
                }
                break;

            case "PAY_LATER":
                break;

            default:
                return res.status(400).json({ error: "Invalid payment method" });
        }

        booking.status = 'CONFIRMED';
        booking.payment = {
            method,
            transactionId: 'DUMMY' + Date.now(),
            paidAt: new Date()
        };

        await booking.save();

        res.status(200).json({
            message: 'Payment successful',
            booking
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}