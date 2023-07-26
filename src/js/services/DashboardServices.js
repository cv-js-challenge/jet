/**
 * @module DashboardServices
 * @description Customers service abstraction
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 */

define(['utils/Service'], function (ServiceUtils) {
  function DashboardServices() {}

  /**
   * @function fetchUsersCountries
   * @description Gets all the coutries.
   * @returns {Promise} Promise with the service response.
   * @async
   */
  DashboardServices.prototype.fetchUsersCountries = async function () {
    return await ServiceUtils.fetchData('usersCountries');
  };

  /**
   * @function fetchUsersCountByAge
   * @description Gets the user count by age.
   * @returns {Promise} Promise with the service response.
   * @async
   */
  DashboardServices.prototype.fetchUsersCountByAge = async function () {
    return await ServiceUtils.fetchData('usersCountByAge');
  };

  return new DashboardServices;
});
