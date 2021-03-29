from flask import Flask, render_template
from ocr import ocr

app = Flask(__name__,
            template_folder='templates',
            static_folder='static',
            static_url_path='/static')


@app.route('/')
def index():
    """
    Serve our app's homepage.
    :return: Jinja2-rendered HTML file.
    """
    return render_template('index.html')


@app.route('/process')
def process_image():
    """
    Process a file upload to our server.
    :return: JSON data resulting from our processing.
    """
    pass


if __name__ == '__main__':
    app.run(DEBUG=True)
