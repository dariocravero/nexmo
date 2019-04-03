FROM mhart/alpine-node:11

WORKDIR /app
COPY . .

# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python

RUN yarn install --production

EXPOSE 3000
CMD ["yarn", "start"]
