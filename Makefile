IMAGE_NAME=fed-ach-list

TEMP_DIR=${PWD}/tmp

default: build

build: build-image

push: push-image

push-image: tag-image
	docker push denormans/${IMAGE_NAME}

tag-image: build-image
	docker tag -f ${IMAGE_NAME} denormans/${IMAGE_NAME}:1.0
	docker tag -f ${IMAGE_NAME} denormans/${IMAGE_NAME}:latest

build-image:
	docker build -t ${IMAGE_NAME} .

run: tmpdir
	docker run -it --rm --name fed-ach-list -p 3000:3000 -v ${TEMP_DIR}:/usr/src/app/data -e ACH_FILE_PATH=data/fed-ach-list.json ${IMAGE_NAME}

run-downloader: tmpdir
	docker run -it --rm -v ${TEMP_DIR}:/usr/src/app/data -e ACH_FILE_PATH=data/fed-ach-list.json ${IMAGE_NAME} bin/download-ach

run-bash:
	docker run -it --rm ${IMAGE_NAME} /bin/bash

tmpdir:
	@[ -d ${TEMP_DIR} ] || mkdir -p ${TEMP_DIR}
