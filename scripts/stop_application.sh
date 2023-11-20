#!/bin/bash

# Stop the Django server gracefully
sudo pkill -f "manage.py runserver"

# Stop the frontend server gracefully
sudo pkill -f "npm start"