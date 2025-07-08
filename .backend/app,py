from flask import Flask, jsonify
import requests
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/api/contests')
def get_contests():
    username = os.getenv("CLIST_USERNAME")
    api_key = os.getenv("CLIST_API_KEY")

    url = (
        "https://clist.by/api/v1/contest/"
        "?resource__name__in=leetcode.com,codeforces.com,atcoder.jp,codechef.com"
        "&start__gte=2025-07-08T00:00:00Z"
        "&order_by=start"
        f"&username={username}"
        f"&api_key={api_key}"
    )

    print("API URL:", url)

    try:
        response = requests.get(url)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.RequestException as e:
        print("Error details:", e)
        return jsonify({"error": "Failed to fetch contests"}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)
