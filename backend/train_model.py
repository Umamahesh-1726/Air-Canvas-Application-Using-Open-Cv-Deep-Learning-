# model_trainer.py
import os
import numpy as np
import cv2
from sklearn.model_selection import train_test_split
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
from tensorflow.keras.optimizers import Adam

dataset_path = 'gesture_dataset'
gestures = os.listdir(dataset_path)
img_size = 128

X, y = [], []
label_map = {gesture: i for i, gesture in enumerate(gestures)}

for gesture in gestures:
    folder = os.path.join(dataset_path, gesture)
    for img in os.listdir(folder):
        path = os.path.join(folder, img)
        img_arr = cv2.imread(path, cv2.IMREAD_GRAYSCALE)
        if img_arr is None:
            continue
        img_arr = cv2.resize(img_arr, (img_size, img_size))
        X.append(img_arr)
        y.append(label_map[gesture])

X = np.array(X).reshape(-1, img_size, img_size, 1) / 255.0
y = to_categorical(np.array(y), num_classes=len(gestures))

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = Sequential([
    Conv2D(32, (3,3), activation='relu', input_shape=(img_size, img_size, 1)),
    MaxPooling2D(2,2),
    Conv2D(64, (3,3), activation='relu'),
    MaxPooling2D(2,2),
    Flatten(),
    Dense(128, activation='relu'),
    Dense(len(gestures), activation='softmax')
])

model.compile(optimizer=Adam(), loss='categorical_crossentropy', metrics=['accuracy'])
model.fit(X_train, y_train, epochs=10, validation_data=(X_test, y_test))

model.save("gesture_model.h5")
print("[✅] Model trained and saved as gesture_model.h5")
