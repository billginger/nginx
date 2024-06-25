# nginx

This is an https host based on Nginx docker.

## Prerequisites

### Install Docker

https://docs.docker.com/engine/install/ubuntu/

## Getting Started

### Clone this project to your server

```
git clone https://github.com/billginger/nginx.git
```

### Configure HTTPS

Put the domain name certificate files in the `cert` directory

### Launching of the project

* Run Nginx by Docker

```
docker run --name nginx -d --network host -v /YOUR_PATH/nginx:/etc/nginx nginx
```

* Reload Nginx configuration files

```
docker exec nginx bash -c "nginx -t"
docker exec nginx bash -c "nginx -s reload"
```

* Exit Nginx

```
docker rm -f nginx
```
