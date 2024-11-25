FROM node:16

WORKDIR /usr/src/app

# 의존성 설치
COPY package*.json ./
RUN npm install
RUN npm install -g localtunnel

COPY . .

# 애플리케이션 실행
EXPOSE 8080

CMD ["sh", "-c", "npm start & lt --port 8080 --subdomain adventure-design-server"]