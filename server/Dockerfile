FROM node:20
WORKDIR app
COPY ./ /app

RUN npm install
RUN npm run build

ENV NODE_ENV=production
ENV DEBUG=relang:*

EXPOSE 8080

CMD ["node", "dist/index.js"]