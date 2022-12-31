docker stop ManagementUI
docker image prune -fa
docker build -t management-ui .
docker run --rm --name ManagementUI -p 3000:3000 management-ui