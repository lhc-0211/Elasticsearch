import { Client } from "elasticsearch-browser";
const client = new Client({
  host: "http://192.168.100.64:9200",
  maxRetries: 5,
  requestTimeout: 60000,
});

client
  .ping()
  .then(() => console.log("You are connected to Elasticsearch!"))
  .catch((error) => console.error("Elasticsearch is not connected."));

export default client;
