FROM node

WORKDIR /app

COPY . .

EXPOSE 8080

RUN npm install

ENTRYPOINT [ "/bin/bash", "./entrypoint.sh" ]