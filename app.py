from flask import Flask
from views import views
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.register_blueprint(views, url_prefix="/views")

if __name__ == '__main__':
    app.run(debug=True, port=5000)