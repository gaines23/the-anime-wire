bind = '0.0.0.0:8000'
workers = 2
threads = 4
worker_class = 'sync'
timeout = 30
keepalive = 2
errorlog = '/var/log/gunicorn/error.log'
