FROM node:16.14.0-alpine

ARG NEXT_PUBLIC_FOOD_URL
ENV NEXT_PUBLIC_FOOD_URL=${NEXT_PUBLIC_FOOD_URL}

WORKDIR /usr/src/app

COPY . .

RUN yarn install

RUN yarn build

CMD ["yarn", "start"]