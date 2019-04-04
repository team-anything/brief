FROM python:3.6

RUN apt-get update && \
	apt-get install -y python3 python3-pip

WORKDIR /app
COPY App /app

RUN pip3 --no-cache-dir install -r requirements.txt

EXPOSE 8000

ENTRYPOINT ["python3"]
CMD ["app.py"]