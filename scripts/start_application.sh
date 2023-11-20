#!/bin/bash

export PATH=/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games

source /home/ubuntu/the-anime-wire/venv/bin/activate

cd /home/ubuntu/the-anime-wire/frontend/
npm i
npm run build

cd /home/ubuntu/the-anime-wire/

#/usr/bin/python3 manage.py runserver
