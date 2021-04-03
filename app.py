from flask import Flask, render_template, request, jsonify
from ocr import ocr

app = Flask(__name__,
            template_folder='templates',
            static_folder='static',
            static_url_path='/static')

ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg', 'gif'}


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
        img_text = ocr(file.filename)

        return jsonify(success=True,
                       error_msg="",
                       img_text=img_text)
    else:
        return jsonify(success=False,
                       error_msg="File was not an image file/wrong filetype.",
                       img_text="")


def file_good(file):
    if file.filename == '':
        return False
    elif file.filename.split('.')[1] not in ALLOWED_EXTENSIONS:
        return False
    else:
        return True


if __name__ == '__main__':
    app.run()
