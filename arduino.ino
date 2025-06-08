#include <Servo.h>

int water_pin = A0; // 수분 수위 센서 A0에 연결
int LED1 = 2;       // LED를 디지털핀 2에 연결
int speaker_pin = 8; // 스피커 핀을 디지털핀 8에 연결
Servo servo1, servo2;

String webCommand = "0";
String waterCommand = "waterLow";
String currentState = "DOWN"; // 현재 상태를 저장할 변수
bool manualOverride = false;  // 명령 상태를 유지하기 위한 플래그

void setup() {
    Serial.begin(9600);                    // Serial monitor 시작
    Serial.println("Arduino is ready.");   // 초기 메시지 출력

    pinMode(water_pin, INPUT);             // 수위 센서 핀 설정
    pinMode(LED1, OUTPUT);                 // LED 핀 설정
    pinMode(speaker_pin, OUTPUT);          // 스피커 핀 설정

    servo1.attach(3);                      // 서보 모터 1 핀 설정 - 오른쪽 기둥
    servo2.attach(4);                      // 서보 모터 2 핀 설정 - 왼쪽 기둥

    // 초기화
    digitalWrite(LED1, LOW);
    digitalWrite(speaker_pin, LOW);
    servo1.write(90);
    servo2.write(90);
}

void loop() {
    int waterLevel = analogRead(water_pin); // 수위 센서 값 읽기
    delay(100);                             // 간격 조정

    // 시리얼 입력 확인
    if (Serial.available() > 0) {
        String command = Serial.readStringUntil('\n'); // 명령 읽기
        command.trim();                                // 앞뒤 공백 제거

        if (command == "STATUS") {
            // 상태 요청 명령 처리
            Serial.println(currentState); // 현재 상태 반환
        } else if (command == "UP") {
            // UP 명령 처리
            webCommand = "UP";
            manualOverride = true; // 명령 상태 유지
        } else if (command == "DOWN") {
            // DOWN 명령 처리
            webCommand = "DOWN";
            manualOverride = true; // 명령 상태 유지
        } else {
            // 잘못된 명령 처리
            Serial.println("ERROR: Unknown command.");
        }
    }

    // 명령 상태 유지 로직
    if (manualOverride) {
        if (webCommand == "UP") {
            currentState = "UP";
            digitalWrite(LED1, HIGH); // LED ON
            servo1.write(0);          // 서보 모터 1은 0도로 이동
            servo2.write(180);        // 서보 모터 2는 180도로 이동
        } else if (webCommand == "DOWN") {
            currentState = "DOWN";
            digitalWrite(LED1, LOW);  // LED OFF
            servo1.write(90);         // 서보 모터 1 복귀
            servo2.write(90);         // 서보 모터 2 복귀
        }
    } else {
        // 센서에 따라 상태 변경
        if (waterCommand == "waterLow" && waterLevel > 800) {
            Serial.println("WaterHigh");
            waterCommand = "waterHigh";
            currentState = "UP";
            digitalWrite(LED1, HIGH); // LED ON
            servo1.write(0);          // 서보 모터 1은 0도로 이동
            servo2.write(180);        // 서보 모터 2는 180도로 이동
        } else if (waterCommand == "waterHigh" && waterLevel <= 100) {
            Serial.println("WaterLow");
            waterCommand = "waterLow";
            currentState = "DOWN";
            digitalWrite(LED1, LOW);  // LED OFF
            servo1.write(90);         // 서보 모터 1 복귀
            servo2.write(90);         // 서보 모터 2 복귀
        }
    }
}
