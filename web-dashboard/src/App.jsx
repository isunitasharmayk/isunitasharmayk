# dashboard_api.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import uploader

app = Flask(__name__)
CORS(app)

@app.route("/upload", methods=["POST"])
def upload():
    username = request.form.get("username")
    password = request.form.get("password")
    caption = request.form.get("caption")
    media = request.files.get("media")

    media.save("upload.jpg")

    uploader.upload_to_instagram(username, password, "upload.jpg", caption)

    return jsonify({"status": "received"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
