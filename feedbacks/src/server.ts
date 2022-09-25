import { connect } from 'nats';
import config from './config';
import { connect as dbConnection } from "./db/connect";
import { listenFeedbackCreation, listenFetchFeedbacks } from './listeners';
import { log } from './utils';

export async function bootstrap() {
  try {
    const stan = await connect({
      servers: config.nats.uri,
    });

    log('NATS connection established successfully!!!!');

    await dbConnection();

    listenFeedbackCreation(stan);
    listenFetchFeedbacks(stan);

    log('Database connected');
  }
  catch (error) {
    log("Unable to connect to the database: " + error);
  }
}