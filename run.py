from flask import Flask
from flask import render_template
app = Flask(__name__)

posts = []

@app.route("/")
def index():
    return render_template("index.html")

# Load secondary web pages
@app.route("/<path:path>")
def send_static(path):
    return render_template(path)