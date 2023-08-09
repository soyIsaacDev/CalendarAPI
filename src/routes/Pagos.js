const server = require("express").Router();
const express = require("express");

// This is your test secret API key.
const stripe = require('stripe')('sk_test_51NBlLQB0MJzZ3Q54m4oC6PzeI6ZJkZbE5VVvgRBRRkV83REPqf4PFGgj5Hck3JIIzlzy6Zf5ZrFrddZWo4ND8h7700CzPWJBFf');


const YOUR_DOMAIN = 'http://localhost:3000';
const PagoAceptado= "/QuickyEnServico";

server.get('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1NBnFrB0MJzZ3Q54YXk99KeM',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN+PagoAceptado}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });
  
    res.redirect(303, session.url);
  });

module.exports =  server;

  
module.exports = {
    PagosRoute: server
}