import os
import torch
import timm

_MODELS_DIR = os.path.dirname(__file__)

def load_breed_model(num_classes, device):

    model = timm.create_model(
        "convnext_small.fb_in22k_ft_in1k",
        pretrained=False,
        num_classes=num_classes
    )

    checkpoint = torch.load(
        os.path.join(_MODELS_DIR, "best_cattle_breed_model_v3.pth"),
        map_location=device,
        weights_only=False
    )

    model.load_state_dict(checkpoint["model_state_dict"])
    model.to(device)
    model.eval()

    return model, checkpoint["classes"]