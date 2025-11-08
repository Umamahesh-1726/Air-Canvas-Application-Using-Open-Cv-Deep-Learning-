import os
import numpy as np
import cv2
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
from sklearn.model_selection import train_test_split

data_dir = 'gesture_dataset'
img_size = 128
gestures = os.listdir(data_dir)

X, y = [], []

for label, gesture in enumerate(gestures):
    gesture_dir = os.path.join(data_dir, gesture)
    for img_file in os.listdir(gesture_dir):
        img_path = os.path.join(gesture_dir, img_file)
        img = cv2.imread(img_path)
        img = cv2.resize(img, (img_size, img_size))
        X.append(img)
        y.append(label)

X = np.array(X).astype('float32') / 255.0
y = to_categorical(np.array(y))

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(img_size, img_size, 3)),
    MaxPooling2D((2, 2)),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    Flatten(),
    Dense(128, activation='relu'),
    Dense(len(gestures), activation='softmax')
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
model.fit(X_train, y_train, epochs=10, validation_data=(X_test, y_test))

model.save('model/gesture_model.h5')
