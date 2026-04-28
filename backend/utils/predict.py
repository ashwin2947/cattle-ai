import torch
import cv2
import numpy as np
import base64
from models.breed_model import load_breed_model
from models.yolo_model import detect_cattle
from utils.gradcam import GradCAM

device = "cuda" if torch.cuda.is_available() else "cpu"

NUM_CLASSES = 20

breed_model, classes = load_breed_model(NUM_CLASSES, device)
gradcam = GradCAM(breed_model, breed_model.stages[-1].blocks[-1])


def preprocess(img):
    img = cv2.resize(img, (300, 300))
    img = img / 255.0
    img = np.transpose(img, (2, 0, 1))
    img = torch.tensor(img).float().unsqueeze(0)
    return img.to(device)


def predict_all(img):
    img = detect_cattle(img)
    img_resized = cv2.resize(img, (300, 300))
    img_tensor = preprocess(img)

    # single forward pass with gradients for GradCAM
    breed_model.eval()
    outputs = breed_model(img_tensor)
    probs = torch.softmax(outputs, dim=1)

    top_k = torch.topk(probs, k=min(3, NUM_CLASSES), dim=1)
    top_confidences = top_k.values[0].tolist()
    top_indices = top_k.indices[0].tolist()

    breed = classes[top_indices[0]]
    confidence = top_confidences[0]
    top_predictions = [
        {"breed": classes[idx], "confidence": round(conf, 4)}
        for idx, conf in zip(top_indices, top_confidences)
    ]

    # GradCAM
    heatmap = gradcam.generate(img_tensor, class_idx=top_indices[0])
    overlay = cv2.addWeighted(img_resized, 0.6, heatmap, 0.4, 0)
    _, buf = cv2.imencode(".jpg", overlay)
    gradcam_b64 = base64.b64encode(buf).decode("utf-8")

    return {
        "breed": breed,
        "confidence": round(confidence, 4),
        "top_predictions": top_predictions,
        "gradcam": gradcam_b64,
    }