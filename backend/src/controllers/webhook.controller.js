const { constructEvent } = require('../services/stripe.service');
const { prisma } = require('../config/database');
const logger = require('../utils/logger');

const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    logger.error('Webhook Error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        
        // Find the purchase by paymentIntentId
        const purchase = await prisma.purchase.findFirst({
          where: { paymentIntentId: paymentIntent.id }
        });

        if (purchase) {
          await prisma.purchase.update({
            where: { id: purchase.id },
            data: { status: 'COMPLETED' }
          });
          logger.info(`Purchase ${purchase.id} marked as completed.`);
          // Send email here via email service if desired
        }
        break;
      
      default:
        logger.warn(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    logger.error('Error processing webhook:', error);
    res.status(500).send('Webhook handler failed');
  }
};

module.exports = {
  handleStripeWebhook
};
