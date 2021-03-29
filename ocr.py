import cv2
import pytesseract
import numpy as np
TESSERACT_PATH = 'TESSDATA_PREFIX'

def ocr(filename):
    img = cv2.imread(filename)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    ret, thresh1 = cv2.threshold(gray, 0, 255, cv2.THRESH_OTSU)
    ret, thresh2 = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV)
    kernel = np.ones((5,5),np.uint8)
    dilation = cv2.dilate(thresh1,thresh2, kernel, iterations = 1)
    contours, _ = cv2.findContours(dilation, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)

    for p in contours:
        x, y, w, h = cv2.boundingRect(p)
        rect = cv2.rectangle(img, (x, y), (x + w, y + h), 0, 2)
        crop = img[y:y + h, x:x + w]
        text = pytesseract.image_to_string(crop)
    return(text)
