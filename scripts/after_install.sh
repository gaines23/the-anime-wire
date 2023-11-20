#!/bin/bash

# Kill the Django server (assuming it's running with 'runserver')
sudo pkill -f runserver

# Kill frontend servers if you are deploying any frontend
# For example:
# sudo pkill -f tailwind
# sudo pkill -f node

# Change to the project directory
cd /home/ubuntu/the-anime-wire/

# Remove the old virtual environment
rm -rf /home/ubuntu/the-anime-wire/venv

# Create a new virtual environment
python3 -m venv /home/ubuntu/the-anime-wire/venv

# Activate the virtual environment
source /home/ubuntu/the-anime-wire/venv/bin/activate

# Install requirements
pip install -r /home/ubuntu/the-anime-wire/requirements.txt

# Run the server using 'screen' to detach the process
screen -d -m python manage.py runserver
