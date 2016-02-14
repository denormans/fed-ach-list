IMAGE_NAME=fed-ach-list

TEMP_DIR=${PWD}/tmp
OUT_DIR=${PWD}/out

default: build

build: build-image

push: push-image

build-image:
	docker build -t ${IMAGE_NAME} .

build-aws: outdir
	cd aws && zip ${OUT_DIR}/fedach-aws.zip -r * .[^.]* && cd ..

run: tmpdir build-image
	docker run -it --rm --name fed-ach-list -p 3000:3000 -v ${TEMP_DIR}:/usr/src/app/data -e ACH_FILE_PATH=data/fed-ach-list.json ${IMAGE_NAME}

run-downloader: tmpdir build-image
	docker run -it --rm -v ${TEMP_DIR}:/usr/src/app/data -e ACH_FILE_PATH=data/fed-ach-list.json ${IMAGE_NAME} bin/download-ach

run-bash: build-image
	docker run -it --rm ${IMAGE_NAME} /bin/bash

tmpdir:
	@[ -d ${TEMP_DIR} ] || mkdir -p ${TEMP_DIR}

outdir:
	@[ -d ${OUT_DIR} ] || mkdir -p ${OUT_DIR}
