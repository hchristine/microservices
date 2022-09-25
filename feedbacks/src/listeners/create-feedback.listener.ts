import { NatsConnection, JSONCodec } from "nats";
import { CREATE_FEEDBACK, Dto, GET_ORDER_BY_QUERY } from 'microservices-hk-common';
import { Feedback } from "../models/feedback.model";

type OrderResponseDto = {
  response: {
    exists: boolean;
  }
};

const codec = JSONCodec();

export async function listenFeedbackCreation(stan: NatsConnection) {
  const sub = stan.subscribe(JSON.stringify(CREATE_FEEDBACK));

  for await (const message of sub) {
    const { data } = codec.decode(message.data) as { data: Dto };

    const getOrderPayload = codec.encode({
      pattern: GET_ORDER_BY_QUERY,
      id: `${Date.now()}`,
      data: {
        productId: data.productId,
        userId: data.userId
      }
    });

    const orderResponse = await stan.request(JSON.stringify(GET_ORDER_BY_QUERY), getOrderPayload, { timeout: 2000 });

    const { response: { exists } } = codec.decode(orderResponse.data) as OrderResponseDto;

    if (exists) {
      await Feedback.create({
        ...data
      });
    }

    message.respond(codec.encode({ ok: exists }));
  }
}