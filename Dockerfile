FROM node

WORKDIR /app

COPY . .

EXPOSE 80

RUN npm install

ENTRYPOINT [ "/bin/bash", "./entrypoint.sh" ]