#Build Stage
FROM node:latest AS build

WORKDIR /src

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

#Production Stage
FROM build AS production

COPY --from=build /src/.next ./.next

COPY --from=build /src/node_modules ./node_modules

COPY --from=build /src/public ./public


COPY --from=build /src/package.json ./package.json

CMD npm start