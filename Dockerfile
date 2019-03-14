FROM basaltinc/docker-node-php-base:latest
# @todo replace with `boltdesignsystem/bolt-docker:latest` once that is configured correctly
RUN sudo apt-get install php7.2-gd

WORKDIR /app
COPY . .
EXPOSE 3123
RUN composer global require hirak/prestissimo
RUN yarn run setup
RUN yarn run build

CMD yarn serve
