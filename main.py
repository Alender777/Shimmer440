import base64
import os
import wave
from flask_cors import CORS, cross_origin

from flask import Flask, request, abort, jsonify, render_template, render_template_string, Blueprint, url_for, flash, \
    redirect

from soundProcess import process_sound

app = Flask(__name__, static_url_path='')
CORS(app)



@app.route("/", methods=["GET"])
def home():
    return render_template('index.html')


@app.route("/index", methods=["GET"])
def index():
    return render_template('index.html')


@app.route("/voice", methods=["GET"])
def voice():
    return render_template('voice.html')


@app.route("/about", methods=["GET"])
def about():
    return render_template('about.html')


@app.route("/meaning", methods=["GET"])
def meaning():
    return render_template('meaning.html')


@app.route("/merchandise", methods=["GET"])
def merchandise():
    return render_template('merchandise.html')


@app.route("/upload_voice", methods=["POST"])
def upload_voice_file():
    for f in request.files.getlist('audioFile'):
        filename = os.path.join(os.getcwd(), "uploadFile", f.filename)
        f.save(filename)
    image_path = process_sound(filename)
    return image_path


@app.route('/upload_voice1', methods=['POST'])
def upload_voice():
    try:
        audio_file = request.files['upfile']

        filename = os.path.join(os.getcwd(), "uploadFile/recorder.mp3")
        audio_file.save(filename)

        image_path = process_sound(filename)
        return image_path
    except Exception as e:
        return f'Error: {str(e)}'


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
