from flask import Flask, render_template, request
import os
import resend
from flask_cors import CORS
import logging

logging.basicConfig(level=logging.ERROR, format='%(asctime)s %(levelname)s %(message)s')

app = Flask(__name__, template_folder='.')
CORS(app, methods=["GET", "POST"])

resend.api_key = os.environ["RESEND_API_KEY"]


@app.route("/contact", methods=["POST"])
def contact():
    try:
        params: resend.Emails.SendParams = {
            "from": "onboarding@resend.dev",
            "to": ["leomirandadev@gmail.com"],
            "subject": f"New message from {request.json['firstName']} {request.json['lastName']} regarding {request.json['subject']}",
            "html": f"<h1><strong>Name:</strong></h1><br />{request.json['firstName']} {request.json['lastName']}<br /><br /><hr /><h1><strong>Email:</strong></h1><br />{request.json['email']}<br /><br /><hr /><h1><strong>Subject:</strong></h1><br />{request.json['subject']}<br /><br /><hr /><h1><strong>Message:</strong></h1><br />{request.json['message']}",
        }
        res = resend.Emails.send(params)
        print("Email sent! Response ID:",res.id)
        return res
    except Exception as e:
        logging.error("An error occurred: %s", str(e))
        return {"error": "An internal error has occurred. Please try again later."}


@app.route("/")
def start():
    return render_template("index.html")


if __name__ == "__main__":
    debug_mode = os.getenv("FLASK_DEBUG", "False").lower() in ["true", "1", "t"]
    app.run(debug=debug_mode)
