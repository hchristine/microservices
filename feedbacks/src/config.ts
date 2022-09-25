export default {
  database: {
    uri: process.env.DB_URI,
  },
  nats: {
    uri: process.env.TRANSPORT_ENDPOINT,
  }
};
