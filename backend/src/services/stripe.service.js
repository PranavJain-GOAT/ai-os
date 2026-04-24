const Stripe = require('stripe');
const logger = require('../utils/logger');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const createPaymentIntent = async (amount, currency = 'usd', metadata = {}) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convert to cents
      currency,
      metadata,
    });
    return paymentIntent;
  } catch (error) {
    logger.error('Stripe createPaymentIntent error:', error);
    throw error;
  }
};

const createConnectAccount = async (userId, email) => {
  try {
    const account = await stripe.accounts.create({
      type: 'express',
      email: email,
      metadata: { userId },
    });
    return account;
  } catch (error) {
    logger.error('Stripe createConnectAccount error:', error);
    throw error;
  }
};

const createAccountLink = async (accountId, refreshUrl, returnUrl) => {
  try {
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: refreshUrl,
      return_url: returnUrl,
      type: 'account_onboarding',
    });
    return accountLink;
  } catch (error) {
    logger.error('Stripe createAccountLink error:', error);
    throw error;
  }
};

const createLoginLink = async (accountId) => {
  try {
    const loginLink = await stripe.accounts.createLoginLink(accountId);
    return loginLink;
  } catch (error) {
    logger.error('Stripe createLoginLink error:', error);
    throw error;
  }
};

const constructEvent = (payload, sigHeader, secret) => {
  return stripe.webhooks.constructEvent(payload, sigHeader, secret);
};

module.exports = {
  stripe,
  createPaymentIntent,
  createConnectAccount,
  createAccountLink,
  createLoginLink,
  constructEvent
};
