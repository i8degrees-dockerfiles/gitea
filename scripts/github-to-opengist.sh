#!/usr/bin/env bash
#
# [SOURCED](https://github.com/thomiceli/opengist/blob/master/docs/usage/import-from-github-gist.md)
#

github_user="$1"
github_token="$2"
opengist_url="https://i8degrees:${github_token}@gist.fs1.home/init"

if [ -z "$github_user" ]; then
  echo "Missing first script argument for github user"
  echo
  exit 2
fi

if [ -z "$github_token" ]; then
  echo "Missing second script argument for github token"
  echo
  exit 2
fi

mkdir -p "/tmp/opengists" || exit 254
pushd "/tmp/opengists" || exit 253

curl -s https://api.github.com/users/"$github_user"/gists?per_page=100 | jq '.[] | .git_pull_url' -r | while read url; do
  echo git clone "$url"
  repo_dir=$(basename "$url" .git)

  # Add remote, push, and remove the directory
  if [ -d "$repo_dir" ]; then
    cd "$repo_dir"
    git remote add gist "$opengist_url"
    git push -u gist --all
    cd ..
    rm -rf "$repo_dir"
  fi

done

exit 0
