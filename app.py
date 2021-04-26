from flask import Flask, render_template, request, jsonify
from ocr import ocr, pdf
from werkzeug.utils import secure_filename
import os

app = Flask(__name__,
            template_folder='templates',
            static_folder='static',
            static_url_path='/static')

ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg', 'gif', 'PDF', 'PNG', 'JPG', 'JPEG', 'GIF'}
UPLOAD_FOLDER = 'static/img/uploaded'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/')
def index():
    """
    Serve our app's homepage.
    :return: Jinja2-rendered HTML file.
    """
    return render_template('index.html')


@app.route('/process', methods=['POST'])
def process_image():
    """
    Process a file upload to our server.
    :return: JSON data resulting from our processing.
    """
    if 'file' not in request.files:
        return jsonify(success=False,
                       error_msg='No file in request.',
                       img_text="")

    file = request.files['file']
    if file_good(file):
        path = upload(file)
        if 'lang' in request.form:
            language = request.form['lang']
        else:
            language = 'eng'
        img_text = ocr(path, language)

        return jsonify(success=True,
                       error_msg="",
                       img_text=img_text)
    else:
        return jsonify(success=False,
                       error_msg="File was not an image file/wrong filetype.",
                       img_text="")

@app.route('/pdf', methods=['POST'])
def makePDF():
    if request.form['text']:
        pdf(request.form['text'])
        return jsonify(success=True, error_msg="")
    else:
        return jsonify(success=False, error_msg="")
def upload(file):
    """
    Upload file to server.
    :param file: file.
    :return: relative path in /uploaded to upload on server.
    """
    if not os.path.isdir(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])

    filename = secure_filename(file.filename)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    print(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
    print(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    return os.path.join(app.config['UPLOAD_FOLDER'], filename)


def file_good(file):
    if file.filename == '':
        return False
    elif file.filename.split('.')[len(file.filename.split('.'))-1].lower() not in ALLOWED_EXTENSIONS:
        return False
    else:
        return True


if __name__ == '__main__':
    app.run()
