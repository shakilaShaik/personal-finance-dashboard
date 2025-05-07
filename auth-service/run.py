from flask import Flask

app = Flask(__name__)

# Debug message to show when app starts
print("Flask app is starting...")

@app.route("/", methods=["GET"])
def home():
    print("GET request received at '/' route")
    return "Hello, Flask is working!"

if __name__ == "__main__":
    print("Running server on http://127.0.0.1:5000")
    app.run(debug=True)
