docker stop StaticHTTP
docker image prune -fa
docker build -t static-http .
docker run --rm -d --name StaticHTTP -p 9090:80 static-http