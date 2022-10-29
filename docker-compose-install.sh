#!/usr/bin/env bash

sudo docker-compose stop
sudo docker-compose rm

npm run rebuild

sudo docker-compose build
sudo docker-compose up -d

