
# gitea

## usage

```shell
# 1.bootstrap files
git clone "https://github.com/i8degrees-dockerfiles/gitea.git"
cd gitea.git

# 2. prepare env
cp -av .env.secrets.dist .env.secrets
# vim .env.secrets

# 3. test run
docker compose up -d
docker compose ps
# 4. first-boot setup of gitea
xdg-open "http://localhost:3000"
# 5. register CNAME or A records with DNS provisioner -- PowerDNS with native database replication is the back-end that I personally use for this
# 6. profit! $$$
```

### docker

```shell
docker compose up -d
docker compose ps
docker compose logs
docker exec -it gitea-1 sh
```

## reference documents 
