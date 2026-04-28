import torch
import torch.nn as nn
import timm
import cv2
import numpy as np
import albumentations as A
from albumentations.pytorch import ToTensorV2

# -------------------------
# SETTINGS
# -------------------------
MODEL_PATH = "cattle_efficientnet_b3_300px_group.pt"
IMAGE_PATH = "100_b4-1_s_124_F.jpg"

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"


# -------------------------
# MODEL CLASS
# -------------------------
class WeightModel(nn.Module):
    def __init__(self, model_name, n_extra):
        super().__init__()

        self.backbone = timm.create_model(
            model_name,
            pretrained=False,
            num_classes=0,
            global_pool="avg"
        )

        fd = self.backbone.num_features

        self.head = nn.Sequential(
            nn.Linear(fd + n_extra, 512),
            nn.LayerNorm(512),
            nn.GELU(),
            nn.Dropout(0.4),

            nn.Linear(512, 256),
            nn.LayerNorm(256),
            nn.GELU(),
            nn.Dropout(0.2),

            nn.Linear(256, 64),
            nn.GELU(),
            nn.Linear(64, 1),
        )

    def forward(self, images, extra):
        x = self.backbone(images)
        x = torch.cat([x, extra], dim=1)
        return self.head(x).squeeze(1)


# -------------------------
# LOAD MODEL
# -------------------------
checkpoint = torch.load(MODEL_PATH, map_location=DEVICE, weights_only=False)

model = WeightModel(
    checkpoint["model_name"],
    checkpoint["n_extra"]
).to(DEVICE)

model.load_state_dict(checkpoint["model_state"])
model.eval()


# -------------------------
# TRANSFORM
# -------------------------
transform = A.Compose([
    A.Normalize(mean=checkpoint["mean"], std=checkpoint["std"]),
    ToTensorV2()
])


# -------------------------
# LOAD IMAGE
# -------------------------
image = cv2.imread(IMAGE_PATH)
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
image = cv2.resize(image, (checkpoint["image_size"], checkpoint["image_size"]))

image = transform(image=image)["image"]
image = image.unsqueeze(0).to(DEVICE)


# -------------------------
# EXTRA FEATURES (Neutral)
# -------------------------
extra = torch.zeros(1, checkpoint["n_extra"]).to(DEVICE)

# view flag (0 rear, 1 side)
extra[0,0] = 1.0   # change if rear

# neutral aspect ratio
extra[0,4] = 1.0


# -------------------------
# PREDICT
# -------------------------
with torch.no_grad():

    pred = model(image, extra).item()

    weight = pred * checkpoint["weight_std"] + checkpoint["weight_mean"]

print("\n🐄 Prediction")
print("------------------")
print(f"Estimated Weight : {weight:.2f} kg")