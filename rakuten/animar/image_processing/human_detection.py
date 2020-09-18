# -*- coding: utf-8 -*-
"""
author : Takahiro Suzuki
date   : 2020/09/18
description :
this script detect human in image or not.
you should note that we detect human by naive method.
"""

import numpy as np
import cv2

COMMON_PATH = "drive/My Drive/Colab Notebooks/楽天サマーインターン/"

# %matplotlib inline

img_dir_path = os.path.join(COMMON_PATH, "dataset/")
cascade_dir_path = os.path.join(COMMON_PATH, "haarcascades")

path_list = glob(os.path.join(img_dir_path, "*.jpg"))
img_list = [cv2.imread(path) for path in path_list]

cascade_file_list = glob(os.path.join(cascade_dir_path, "*.xml"))


img = cv2.cvtColor(img_list[4].copy(), cv2.COLOR_RGB2BGR)
plt.figure(figsize=(8, 8))
plt.imshow(img)

cascade_file_list

face_cascade_path = cascade_file_list[3]
eye_cascade_path = cascade_file_list[-6]
face_cascade = cv2.CascadeClassifier(face_cascade_path)
eye_cascade = cv2.CascadeClassifier(eye_cascade_path)

src = img
src_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

faces = face_cascade.detectMultiScale(src_gray)

for x, y, w, h in faces:
    cv2.rectangle(src, (x, y), (x + w, y + h), (255, 0, 0), 2)
    face = src[y: y + h, x: x + w]
    face_gray = src_gray[y: y + h, x: x + w]
    eyes = eye_cascade.detectMultiScale(face_gray)
    for (ex, ey, ew, eh) in eyes:
        cv2.rectangle(face, (ex, ey), (ex + ew, ey + eh), (0, 255, 0), 2)

plt.imshow(src)

faces

for img in img_list:
    plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2GRAY), cmap="gray")
    plt.show()
    sleep(1.0)
    plt.close()

??plt.show

a = plt.show()

print(a)

