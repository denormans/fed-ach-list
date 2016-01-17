'use strict';

var moment = require('moment');
var Q = require('q');

const RecordTypes = [{
  code: 0,
  value: 'FRB',
  description: 'Institution is a Federal Reserve Bank'
}, {
  code: 1,
  value: 'CUST',
  description: 'Send items to customer routing number'
}, {
  code: 2,
  value: 'NEW',
  description: 'Send items to customer using new routing number field'
}];

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

const InstitutionStatuses = [null, {
  code: 1,
  value: 'REC',
  description: 'Receives Gov/Comm'
}];

const DataViews = [null, {
  code: 1,
  value: 'CURRVIEW',
  description: 'Current view'
}];

var list = [{
  routing: '111000111',
  officeType: OfficeTypes['O'],
  frb: '123456789',
  recordType: RecordTypes[0],
  date: moment('110114', 'MMDDYY'),
  newRouting: null,
  customer: 'A COOL BANK',
  address: '2000 SIMPLE ST',
  city: 'AUSTIN',
  state: 'TX',
  zip: '12345-6789',
  phoneNumber: '5551112222',
  institutionStatus: InstitutionStatuses[1],
  dataView: DataViews[1]
}, {
  routing: '222202222',
  officeType: OfficeTypes['B'],
  frb: '123456789',
  recordType: RecordTypes[1],
  date: moment('050213', 'MMDDYY'),
  newRouting: null,
  customer: 'FIRST BANK',
  address: '10101 QUALITY ST',
  city: 'LOS ANGELES',
  state: 'CA',
  zip: '54321',
  phoneNumber: '5552221111',
  institutionStatus: InstitutionStatuses[1],
  dataView: DataViews[1]
}];

var listByRouting = {};
list.forEach(function(value) {
  listByRouting[value.routing] = value;
});

var data = {
  findByRoutingNumber: function(routing) {
    return Q(listByRouting[routing]);
  }
};

module.exports = data;
