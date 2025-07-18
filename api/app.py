from flask import Flask, jsonify
from flask_redis import FlaskRedis
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

app.config["REDIS_URL"] = "redis://localhost:6379/0"

redis_client = FlaskRedis(app)


@app.route("/api/btc", methods=["GET"])
def get_btc_data():
    try:
        btc_data = redis_client.get("moeda:BTC")
        print("DADOS REDIS: ", btc_data)

        if btc_data is None:
            return jsonify({"error": "Dados não disponiveis."}), 404

        data = json.loads(btc_data)
        print(data)

        return jsonify(data)
    except Exception as error:
        return (
            jsonify({"error": "Erro interno no servidor.", "details": str(error)}),
            500,
        )


if __name__ == "__main__":
    app.run(debug=True, port=5000)