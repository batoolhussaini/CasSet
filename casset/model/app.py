## Blueprint py file to run all db py files in parallel

from flask import Flask, send_from_directory
from flask_cors import CORS
from users import users_bp
from playlist import playlist_bp
from comments import comments_bp
from songs import songs_bp
from friends import friends_bp
import os

# Define the path to the build directory
BUILD_DIR = os.path.join(os.path.dirname(__file__), 'static')

app = Flask(__name__, static_folder=BUILD_DIR)
CORS(app)

# Registering Blueprints
app.register_blueprint(users_bp, url_prefix='/users')
app.register_blueprint(playlist_bp, url_prefix='/playlist')
app.register_blueprint(comments_bp, url_prefix='/comments')
app.register_blueprint(songs_bp, url_prefix = '/songs')
app.register_blueprint(friends_bp, url_prefix = '/friends')

# Serve the front-end's main file (index.html)
@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

# Serve other static files
@app.route('/<path:path>')
def static_files(path):
    return send_from_directory(app.static_folder, path)

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)