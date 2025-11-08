from flask import Flask, Response
from flask_cors import CORS
import cv2
import numpy as np
from gesture_recognizer import predict_gesture

app = Flask(__name__)
CORS(app)

cap = cv2.VideoCapture(0)
canvas = None
color = (0, 0, 255)  # Default color: Red
prev_x, prev_y = None, None
is_drawing = True
history = []  # For undo functionality

@app.route('/')
def index():
    return "Air Canvas Server Running 🎨"

@app.route('/video')
def video():
    def generate():
        global canvas, color, prev_x, prev_y, is_drawing, history

        color_cycle = [(0, 0, 255), (0, 255, 0), (255, 0, 0), (0, 0, 0)]  # red, green, blue, black
        color_index = 0

        while True:
            success, frame = cap.read()
            if not success:
                break

            frame = cv2.flip(frame, 1)  # Mirror the webcam for natural movement
            height, width, _ = frame.shape
            if canvas is None:
                canvas = np.ones_like(frame) * 255  # White canvas

            gesture, index_tip = predict_gesture(frame)

            if gesture == 'palm':
                is_drawing = False
            else:
                is_drawing = True

            if index_tip is not None:
                # Flip index finger x coordinate to match mirrored frame
                x = int((1 - index_tip[0]) * width)
                y = int(index_tip[1] * height)

                if gesture == 'point' and is_drawing:
                    if prev_x is not None and prev_y is not None:
                        history.append(canvas.copy())
                        cv2.line(canvas, (prev_x, prev_y), (x, y), color, 5)
                    prev_x, prev_y = x, y
                else:
                    prev_x, prev_y = None, None

            if gesture == 'fist':
                canvas = np.ones_like(frame) * 255
                history.clear()
                prev_x, prev_y = None, None

            elif gesture in ['peace', 'thumbsup']:
                color_index = (color_index + 1) % len(color_cycle)
                color = color_cycle[color_index]

            elif gesture == 'ok' and history:
                canvas = history.pop()

            # Draw active color as circle on screen
            cv2.circle(frame, (30, 30), 15, color, -1)
            cv2.rectangle(frame, (20, 20), (40, 40), (255, 255, 255), 2)

            # Combine frame and white canvas for background
            white_frame = np.ones_like(frame) * 255
            output_left = cv2.addWeighted(frame, 1.0, np.zeros_like(frame), 0, 0)  # keep original cam
            output_right = cv2.addWeighted(white_frame, 0.6, canvas, 0.4, 0)
            output = np.hstack((output_left, output_right))

            ret, buffer = cv2.imencode('.jpg', output)
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')

    return Response(generate(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True)
