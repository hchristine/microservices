import { GetFeedbacksQueryDto, GET_FEEDBACK } from "microservices-hk-common";
import { JSONCodec, NatsConnection } from "nats";
import { Feedback } from "../models/feedback.model";

type GetFeedback = {
  userId: number;
  query: GetFeedbacksQueryDto
}

const codec = JSONCodec();

export async function listenFetchFeedbacks(stan: NatsConnection) {
  const sub = stan.subscribe(JSON.stringify(GET_FEEDBACK));

  for await (const message of sub) {
    const { data } = codec.decode(message.data) as { data: GetFeedback };
    const query = data.query.productId
      ? { productId: data.query.productId }
      : {};


    const feedback = await Feedback.findAll({
      where: query
    });

    if (!feedback) {
      throw new Error('Not found feedback')
    }

    message.respond(codec.encode(feedback));
  }
}