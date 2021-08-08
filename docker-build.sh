#!/usr/bin/env bash

export GIT_COMMIT=$(git log -1 --format=%h)

docker build -t sundaybrian/wissenpos-portal:$GIT_COMMIT . && docker push sundaybrian/wissenpos-portal:$GIT_COMMIT
