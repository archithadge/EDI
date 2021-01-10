# Vision Based Automation labs
# Gabor Tranform

import math
import cv2 as cv
import numpy as np
import matplotlib.pyplot as plt

# Reading the image and converting to float
image = cv.imread('download.jpeg',0).astype(np.float32)/255

#Gabor filter construction
kernel = cv.getGaborKernel((15,15), 5, 1, 10, 1, 0, cv.CV_32F)
kernel /= math.sqrt((kernel * kernel).sum())

#Filter the image
filtered = cv.filter2D(image, -1, kernel)

#visualize the result
plt.figure(figsize=(8,3))
plt.subplot(131)
plt.axis('off')
plt.title('image')
plt.imshow(image, cmap='gray')
plt.subplot(132)
plt.title('kernel')
plt.imshow(kernel, cmap='gray')