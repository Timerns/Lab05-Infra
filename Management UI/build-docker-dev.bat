docker stop ManagementUI
docker image prune -fa
docker build -t management-ui .
docker run --rm -d --name ManagementUI -p 80:80 management-ui