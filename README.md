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

    # build the docker image
    make build
    
    # build & push the docker image
    make push
    
    # run the server 
    make run
    
    # run the downloader
    make run-downloader

Configuration Options
---------------------

Configuration can be updated by setting environment variables

### NODE_ENV
development: This is a development or testing environment (default)
production: This is a production environment

### API_USERNAME
Username for the API

### API_KEY
Key for the API

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
