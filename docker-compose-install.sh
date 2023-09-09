#!/usr/bin/env bash

sudo docker-compose stop
sudo docker-compose rm

sudo docker-compose build
sudo docker-compose up -d
