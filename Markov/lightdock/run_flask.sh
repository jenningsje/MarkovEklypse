source /opt/app/lightdock/venv/bin/activate

cd ../MarkovProprietary/pipelinestages/app/mount

gunicorn -w 4 -b 0.0.0.0:8000 receive_signal:app --timeout 7000