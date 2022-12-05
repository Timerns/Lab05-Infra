docker stop DynamicHTTP
docker image prune -fa
docker build -t dynamic-http .
docker run --rm -d --name DynamicHTTP -p 80:80 dynamic-http