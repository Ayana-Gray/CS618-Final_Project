FROM node:20 AS build
ARG VITE_BACKEND_URL=https://miniature-space-guide-r46w9xj6wqvjhwjp4-3001.app.github.dev/api/v1
ARG VITE_GRAPHQL_URL=https://miniature-space-guide-r46w9xj6wqvjhwjp4-3001.app.github.dev/graphql
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
# Start the SSR server
CMD ["npm", "start"]