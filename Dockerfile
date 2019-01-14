FROM node
EXPOSE 8848
WORKDIR /app
COPY demo .
RUN npm install
CMD ["npm","run start"]

