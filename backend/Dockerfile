FROM python:alpine3.10 AS final

COPY ConnectDB.py /backend/ConnectDB.py
COPY PortListener.py /backend/PortListener.py

WORKDIR /backend

RUN pip install couchdb
RUN pip install flask && pip install flask_cors

RUN pip install gunicorn

CMD gunicorn PortListener:app -b :12345

