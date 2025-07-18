import redis from "redis";

const client = redis.createClient();

client.on("error", (err) => console.log("Erro no cliente redis: ", err));

async function worker() {
  try {
    await client.connect();
    console.log("Worker conectado ao redis com sucesso!");

    setInterval(async () => {
      const price = (Math.random() * (70000 - 60000) + 60000).toFixed(2);

      console.log("Preço: ", price);

      const data = {
        price: parseFloat(price),
        timestamp: new Date().toISOString(),
      };

      await client.set("moeda:BTC", JSON.stringify(data));
      console.log(
        `Dados atualizado em ${data.timestamp} para o preço: $${data.price}`
      );
    }, 5000);
  } catch (error) {
    console.error("Erro no worker: ", error);
  }
}

worker();
