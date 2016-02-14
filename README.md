Fed ACH List
============

This service creates an API on top of the Federal Reserve list of ACH routing numbers.

Build and Run
-------------

### Pre-requisites
- Node.js and NPM

### Make options

    # start the site locally at http://localhost:3000
    npm start

    # build the docker image locally
    make build
    
    # run the server 
    make run
    
    # run the downloader
    make run-downloader
    
    # build the AWS zip file for upload to Elastic Beanstalk
    make build-aws
    
### Push changes

DockerHub automatically builds changes from the repo, so commit and push master, and push the correct version tag to get a new build.

    # tag new build
    git tag 1.1
    
    # push tags
    git push --tags

Configuration Options
---------------------

Configuration can be updated by setting environment variables

### NODE_ENV
The environment setting that changes behavior of logging and error messages.

- development: This is a development or testing environment (default)
- production: This is a production environment

### API_USERNAME
Username for the API

### API_KEY
Key for the API

### API_AUTH_ALGORITHM
Algorithm for the API authentication.

- basic: This is a shared key using HTTP Basic Auth (default)
- digest: This is a digest using HTTP Digest Auth. Note: Digest realm is "api". Also, be sure to set a non-empty nonce value.

### TEST_ACH_FILE
A test ACH file to use when updating the ACH list. If not set, the downloader will pull from the Federal Reserve.

### ACH_FILE_PATH
The file path for the ACH list JSON. Defaults to ./fed-ach-list.json when not using S3

### ACH_S3_BUCKET
S3 bucket to load ACH list JSON from.

### ACH_S3_PATH
S3 path to load ACH list JSON from. Defaults to NODE_ENV/fed-ach-list.json

Using the API
-------------

    # Health checks
    http://localhost:3000/status/health
    
    # Retrieve data for a routing number
    http://localhost:3000/api/ach/111000111

    # Updating the ACH
    http://localhost:3000/process/achupdate

NOTE: When using API username and key, pass them as HTTP Basic auth.

License & Terms
---------------

This software is licensed under the APACHE 2 open source license. See LICENSE.txt for details.

In addition, in order to download the ACH list from the Federal Reserve, you must accept the agreement and
terms and conditions from the Federal Reserve at https://www.frbservices.org/EPaymentsDirectory/agreement.html.
Deploying and using this software indicates that you agree to these terms.
