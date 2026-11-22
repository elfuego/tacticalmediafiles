.PHONY: clean build build-docker frontend maven docker run inspect explore restore
M2=$(HOME)/.m2
VERSION:=$(shell mvn help:evaluate -Dexpression=project.version -q -DforceStdout)
args:=
TTY:=$(shell [ -t 0 ] && echo -it)
BUILDIMAGE=ghcr.io/mmbase/build:8-jdk8

IMAGE=tmf:latest

help:     ## Show this help.
	@sed -n 's/^##//p' $(MAKEFILE_LIST)
	@grep -E '^\S+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@echo Version to build currently is: $(VERSION)
	@echo Examples
	@echo "    make build args=-U        # args for maven"
	@echo "    make frontend build docker # fresh frontend, war and image"
	@echo "    make clean run            # clean, build maven, build docker, run docker"

build: target/tmf-$(VERSION).war  ## Build the war file with the local maven

# Always rebuilt (maven is incremental), so docker never packages a stale war
.PHONY: target/tmf-$(VERSION).war
target/tmf-$(VERSION).war:
	mvn package -DskipTests $(args)

# Needs access to the build image: docker login ghcr.io
build-docker:  ## Build the war file in the mmbase docker build image
	docker run $(TTY) -v $(PWD):/work -v $(M2):/root/.m2 $(BUILDIMAGE) $(args)

frontend:  ## Build the frontend and copy it to src/main/webapp/styles
	cd frontend && npm ci && npm run dist
	rsync -a --exclude .DS_Store --exclude '*.map' frontend/public/styles/ src/main/webapp/styles/

maven:  ## Give prompt to run maven (in docker)
	docker run -it -v $(PWD):/work -v $(M2):/root/.m2 --entrypoint bash $(BUILDIMAGE)

# you might need docker buildx create --use desktop-linux
docker: target/tmf-$(VERSION).war  ## Build a docker image locally
	docker build . -t $(IMAGE)

run: docker  ## Run the application locally in docker
	docker compose -f compose/docker-compose.yaml up

inspect: docker  ## Call 'docker inspect'
	docker inspect $(IMAGE)

explore: docker  ## Gives a shell on the docker image, so you can look around
	mkdir -p data share
	docker run -it -p 8080:8080 -v $(PWD)/share:/share -v $(PWD)/data:/data --entrypoint /bin/bash $(IMAGE)

clean:  ## clean target directory
	rm -rf target overlays

restore:  ## Restore a database dump locally: make restore DUMP=tmf.dump (assumes mmbase:admin2k@localhost, database tmf2)
	@test -n "$(DUMP)" || (echo "usage: make restore DUMP=<file>"; exit 1)
	cat $(DUMP) | MYSQL_PWD=admin2k mariadb -u mmbase -f tmf2
