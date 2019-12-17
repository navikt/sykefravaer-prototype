# Baseimage
FROM navikt/node-express:12.2.0-alpine

# Setter arbeidsområdet for RUN, CMD, COPY osv.
WORKDIR /

# Kopier fra /*folder* til *folder* i container
COPY ./public public
COPY ./server server
COPY ./src src
COPY ./package.json .

# Installerer og bygger client
RUN npm install
RUN npm run build-prod

# 
WORKDIR /server
RUN npm install

EXPOSE 5000

CMD [ "node", "server.js" ]