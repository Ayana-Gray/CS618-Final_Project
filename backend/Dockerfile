FROM node:20
WORKDIR /app
COPY package.json package-lock.json ./
RUN HUSKY=0 npm install
COPY . .
CMD ["npm", "start"]