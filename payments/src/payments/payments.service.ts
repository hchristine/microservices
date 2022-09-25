import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.getOrThrow('STRIPE_API_KEY');

    this.stripe = new Stripe(apiKey, {
      apiVersion: '2022-08-01',
    });
  }

  createCustomer(email: string) {
    return this.stripe.customers.create({
      email,
    });
  }

  async charge(amount: number, userEmail: string) {
    const searchResult = await this.stripe.customers.search({
      query: `email:"${userEmail}"`,
    });

    const customer = searchResult.data[0];

    return this.stripe.charges.create({
      amount: amount * 100,
      currency: 'usd',
      customer: customer.id,
    });
  }
}
