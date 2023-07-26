/**
 * @module CustomersServices
 * @description Customers service abstraction
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 */

define(['utils/Service'], function (ServiceUtils) {
  class CustomersServices {
    /**
     * @method
     * @description class empty constructor
     */
    constructor() {}

    /**
     * @method saveCustomer
     * @description Saves a given customer into the database.
     * @param {Object} customer The customer data to save.
     * @returns {Promise} Promise with the service response.
     */
    async saveCustomer(customer) {
      return await ServiceUtils.fetchData('getCustomers', 'POST', customer);
    }
  }

  return new CustomersServices();
});
