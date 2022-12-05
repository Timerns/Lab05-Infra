docker build -t static-http .
docker stop StaticHTTP
docker run --rm -d --name StaticHTTP -p 9090:80 static-http