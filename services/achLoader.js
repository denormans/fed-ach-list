'use strict';

var moment = require('moment');

var achIO = require('./io/ach.js');

const RecordTypes = {
  '0': {
    code: 0,
    value: 'FRB',
    description: 'Institution is a Federal Reserve Bank'
  },
  '1': {
    code: 1,
    value: 'CUST',
    description: 'Send items to customer routing number'
  },
  '2': {
    code: 2,
    value: 'NEW',
    description: 'Send items to customer using new routing number field'
  }
};

const OfficeTypes = {
  O: {
    code: 'O',
    value: 'MAIN',
    description: 'Main'
  },
  B: {
    code: 'B',
    value: 'BRANCH',
    description: 'Branch'
  }
};

const InstitutionStatuses = {
  '1': {
    code: 1,
    value: 'REC',
    description: 'Receives Gov/Comm'
  }
};

const DataViews = {
  '1': {
    code: 1,
    value: 'CURRVIEW',
    description: 'Current view'
  }
};

/**
 * Load the ACH list from file and turn it into a map by routing number
 *
 * @returns {Map<String, AchInfo>} map of ACH info by routing number
 */
function load() {
  return achIO.load().then(function(achList) {
    var achInfoByRouting = {};

    achList.forEach(function(achData) {
      var achInfo = {
        routing: achData.routing,
        officeType: OfficeTypes[achData.office],
        frb: achData.frb,
        recordType: RecordTypes[achData.type],
        date: moment(achData.date, 'MMDDYY'),
        newRouting: achData.newRouting != '000000000' ? achData.newRouting : null,
        customer: achData.customer,
        address: achData.address,
        city: achData.city,
        state: achData.state,
        zip: achData.zipExt != '0000' ? achData.zipfull : achData.zip,
        phoneNumber: achData.phoneFull,
        institutionStatus: InstitutionStatuses[achData.status],
        dataView: DataViews[achData.dataView]
      };

      achInfoByRouting[achInfo.routing] = achInfo;
      achInfoByRouting.size = achList.length;
    });

    return achInfoByRouting;
  });
}

module.exports = {
  load: load
};
