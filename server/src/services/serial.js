const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

let port = null;
let arduinoStatus = 'DOWN';  // 기본 상태는 DOWN으로 설정

// 포트 탐색 후 자동 연결
const connectArduino = () => {
  return SerialPort.list()
    .then((ports) => {
      console.log('Available Ports:', ports);

      // path에 'usbserial'이 포함된 포트를 찾음
      const arduinoPort = ports.find((port) => port.path.includes('usbserial'));

      if (!arduinoPort) {
        throw new Error('No Arduino device found.');
      }

      // 경로(path)가 제대로 정의되어 있는지 확인
      if (!arduinoPort.path) {
        throw new Error('Arduino port path is undefined.');
      }

      console.log(`Found Arduino on port: ${arduinoPort.path}`);

      // SerialPort 객체를 생성할 때, path 값이 제대로 전달되었는지 확인
      port = new SerialPort({ path: arduinoPort.path, baudRate: 9600, autoOpen: false });

      return new Promise((resolve, reject) => {
        port.open((err) => {
          if (err) {
            reject(`Error opening port: ${err.message}`);
          } else {
            console.log('Port opened successfully.');
            resolve();
          }
        });
      });
    })
    .catch((err) => {
      console.error('Error listing or opening serial port:', err.message);
      throw err;
    });
};

// 아두이노 연결 상태 확인
const isArduinoConnected = () => {
  return port !== null; // 포트 객체가 초기화된 상태인지 확인
};

// 데이터 수신 처리
const startReceivingData = () => {
  if (!port) return;

  const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));
  parser.on('data', (data) => {
    console.log('Received from Arduino:', data);

    if (data.trim() === 'UP') {
      arduinoStatus = 'UP';
    } else if (data.trim() === 'DOWN') {
      arduinoStatus = 'DOWN';
    }
  });

  port.on('error', (err) => {
    console.error('Error:', err.message);
  });
};

// 아두이노로 데이터 송신
const sendDataToArduino = (data) => {
  if (!port) {
    console.error('Arduino port is not initialized.');
    return;
  }

  port.write(data, (err) => {
    if (err) {
      console.error('Error on write:', err.message);
    } else {
      console.log('Data sent to Arduino:', data);
    }
  });
};

// 아두이노 상태 요청 함수
const requestArduinoStatus = () => {
  return new Promise((resolve, reject) => {
    if (!port) {
      reject('Arduino port not open');
    }

    // 상태 요청 명령어 전송 (예: "STATUS")
    sendDataToArduino('STATUS');

    const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));
    parser.once('data', (data) => {
      if (data.trim() === 'UP') {
        arduinoStatus = 'UP';
      } else if (data.trim() === 'DOWN') {
        arduinoStatus = 'DOWN';
      }
      resolve(arduinoStatus);
    });

    // 타임아웃 설정, 2초 (응답이 없을 경우)
    setTimeout(() => {
      reject('Timeout waiting for Arduino status.');
    }, 2000);
  });
};

// 현재 아두이노 상태 반환 (실시간 상태 확인)
const getArduinoStatus = () => {
  return requestArduinoStatus();
};

module.exports = { 
  isArduinoConnected,
  connectArduino, 
  sendDataToArduino, 
  startReceivingData, 
  getArduinoStatus 
};
