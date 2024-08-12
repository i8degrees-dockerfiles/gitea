
# gitea

Access Portals
|Internal URL|External URL|Notes|
|------------|------------|-----|
|http://docker.fs1.home:3000|https://git.fs1.home|Gitea|
|http://docker.fs1.home:3001|https://gist.fs1.home|OpenGist|
|http://docker.fs1.home:3002|https://buildbox.fs1.home|Jenkins build node|

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
xdg-open "http://localhost:3000"  # gitea
# 5. register CNAME or A records with DNS provisioner -- PowerDNS with native database replication is the back-end that I personally use for this
xdg-open "http://localhost:3001"  # gists
# 6. profit! $$$
```

### docker

```shell
docker compose up -d
docker compose ps
docker compose logs
docker exec -it gitea-1 sh
```

### import repositories from github

First, you must generate a **READ-ONLY** [Github Token][1] that has permissions to read from your repositories, at minimum. If you wish to include the Wikis, Issues, Projects and such
with the migration, you must ensure that this token also
has *read* permissions for these items, too.

Additionally, you must create a [Gitea Token][2] that
also has the appropiate permissions for accessing your
repositories. This token must include **WRITE** 
permissions as it will be uploading the migrated 
repositories to your Gitea host.

You may need to create a token for each organization 
that you are importing for fine-grained access.


```shell
GITHUB_REPO="i8degrees-dockerfiles/traefik"
GITEA_URL="http://docker.fs1.home:3000"
GITEA_TOKEN=
GITHUB_TOKEN=
docker run ggmigrator/cli migrate --owner 1 \
  --gh-repo "$GITHUB_REPO" \
  --gh-token "$GITHUB_TOKEN" \
  --url "$GITEA_URL" --token "$GITEA_TOKEN"
```

```shell
GITHUB_USER="i8degrees"  # bootygeeks, haxxin, syn-net, etc
GITEA_URL="http://docker.fs1.home:3000"
GITEA_TOKEN=
GITHUB_TOKEN=
docker run ggmigrator/cli migrate-all --owner 1 \
  --gh-user "$GITHUB_USER" --gh-token "$GITHUB_TOKEN" \
  --url "$GITEA_URL" --token "$GITEA_TOKEN"
```

## TODO

- [ ] sort out which configuration files gitea is using and then merge
  * `./mounts/config/gitea/gitea.ini`
  * `./mounts/config/gitea/conf/app.ini`

- [ ] provision external authentication with Gitea via [OAuth Providers](https://github.com/thomiceli/opengist/blob/master/docs/administration/oauth-providers.md)

- [ ] finish our *Github* to **Gitea** repository imports
  * `/scripts/`
- [ ] finish our *Github Gist* to **OpenGist** repository imports
  * `/scripts/`

# scratchpad

## gitea
## db
## opengist

`apk add curl git git-lfs bash vim ncdu`

## reference documents

[1]: https://github.com/settings/tokens
[2]: http://docker.fs1.home:3000/user/settings/applications
[3]: https://gitea.com/gitea/migrator

