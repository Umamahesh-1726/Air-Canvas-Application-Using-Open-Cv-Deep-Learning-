import cv2
import os

gestures = ['fist', 'point', 'peace', 'palm', 'thumbsup','undo']  # Add or change gestures as needed
dataset_path = 'gesture_dataset'
img_size = 128

os.makedirs(dataset_path, exist_ok=True)

# Use CAP_DSHOW backend for Windows to reduce MSMF bugs
cap = cv2.VideoCapture(0)

for gesture in gestures:
    gesture_dir = os.path.join(dataset_path, gesture)
    os.makedirs(gesture_dir, exist_ok=True)
    count = 0

    print(f"\n[INFO] Collecting images for: '{gesture.upper()}'")
    print("[HINT] Press 'c' to capture, 'n' for next gesture, 'q' to quit")

    while True:
        ret, frame = cap.read()
        if not ret or frame is None:
            print("[ERROR] Failed to grab frame. Is your webcam in use?")
            continue

        frame = cv2.flip(frame, 1)
        roi = frame[100:400, 100:400]  # Region of interest for gesture

        cv2.rectangle(frame, (100, 100), (400, 400), (255, 0, 0), 2)
        cv2.putText(frame, f'{gesture}: {count}', (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

        cv2.imshow("Data Collector", frame)

        key = cv2.waitKey(1) & 0xFF
        if key == ord('c'):
            img_path = os.path.join(gesture_dir, f"{count}.jpg")
            roi_resized = cv2.resize(roi, (img_size, img_size))
            cv2.imwrite(img_path, roi_resized)
            count += 1
        elif key == ord('n'):
            print(f"[INFO] Moving to next gesture...")
            break
        elif key == ord('q'):
            print(f"[INFO] Quitting dataset collection.")
            cap.release()
            cv2.destroyAllWindows()
            exit()

cap.release()
cv2.destroyAllWindows()
