import os
from ultralytics import YOLO
import numpy as np

_MODELS_DIR = os.path.dirname(__file__)
model = YOLO(os.path.join(_MODELS_DIR, "best.pt"))

def detect_cattle(img):

    results = model(img, conf=0.3)[0]

    if results.boxes is None:
        return img

    boxes = results.boxes.xyxy.cpu().numpy()

    if len(boxes) == 0:
        return img

    # choose largest cattle
    areas = [(x2-x1)*(y2-y1) for x1,y1,x2,y2 in boxes]

    idx = np.argmax(areas)

    x1,y1,x2,y2 = map(int, boxes[idx])

    crop = img[y1:y2, x1:x2]

    return crop