from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import cv2
import requests
from utils.predict import predict_all
import asyncio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

WEIGHT_API_URL_TASK = "http://127.0.0.1:9001/cattle/async"
WEIGHT_API_URL_WEIGHT = "http://127.0.0.1:9001/cattle/task/"


# 🐄 Breed Prediction
@app.post("/predict_breed")
async def predict_breed(file: UploadFile = File(...)):
    file_bytes = await file.read()
    img_array = np.frombuffer(file_bytes, np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
    return predict_all(img)


# ⚖️ Weight Prediction (SIDE + REAR)
@app.post("/predict_weight")
async def predict_weight(
    side: UploadFile = File(...),
    rear: UploadFile = File(...)
):
    side_bytes = await side.read()
    rear_bytes = await rear.read()

    files = {
        "side": (side.filename, side_bytes, side.content_type),
        "rear": (rear.filename, rear_bytes, rear.content_type)
    }

    # Step 1: Send task
    response = requests.post(WEIGHT_API_URL_TASK, files=files)
    data = response.json()
    task_id = data.get("task_id")
    print(f"Received task_id: {task_id}")

    if not task_id:
        return {"error": "No task_id returned"}

    # Step 2: Poll for result
    for _ in range(10):  # try 10 times
        result_response = requests.get(WEIGHT_API_URL_WEIGHT + task_id)
        result = result_response.json()
        print(result)
        if result.get("task_status") == "SUCCESS":
            task_result = result.get("task_result", {})
            print(f"Received task result: {task_result}")
            return {
                "weight": round(task_result.get("weight"), 2),
                "remarks": task_result.get("remarks", ""),
                "ratio": task_result.get("ratio"),
                "cattle_id": task_result.get("cattle_id")
            }

        await asyncio.sleep(1)  # wait before retry

    return {"error": "Task timed out"}