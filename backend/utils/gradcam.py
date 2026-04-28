import torch
import numpy as np
import cv2


class GradCAM:

    def __init__(self, model, target_layer):
        self.model = model
        self.gradients = None
        self.activations = None

        target_layer.register_forward_hook(self._forward_hook)
        target_layer.register_full_backward_hook(self._backward_hook)

    def _forward_hook(self, module, input, output):
        self.activations = output.detach()

    def _backward_hook(self, module, grad_input, grad_output):
        self.gradients = grad_output[0].detach()

    def generate(self, input_tensor, class_idx=None):
        self.model.zero_grad()

        output = self.model(input_tensor)

        if class_idx is None:
            class_idx = output.argmax(dim=1).item()

        score = output[0, class_idx]
        score.backward()

        gradients = self.gradients
        activations = self.activations

        # ConvNeXt uses (B, H, W, C) — permute to (B, C, H, W)
        if gradients.dim() == 4 and gradients.shape[-1] > gradients.shape[2]:
            gradients = gradients.permute(0, 3, 1, 2)
            activations = activations.permute(0, 3, 1, 2)

        weights = gradients.mean(dim=(2, 3), keepdim=True)
        cam = (weights * activations).sum(dim=1).squeeze()
        cam = torch.relu(cam).cpu().numpy()

        cam = cv2.resize(cam, (300, 300))
        cam = (cam - cam.min()) / (cam.max() - cam.min() + 1e-8)

        heatmap = cv2.applyColorMap(np.uint8(255 * cam), cv2.COLORMAP_JET)
        return heatmap
