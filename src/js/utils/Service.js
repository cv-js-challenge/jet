/**
 * @module ServiceUtils
 * @description This module contains all the service utility functions.
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 */

define(['text!../../json/config.json'], function (configFile) {
  const config = JSON.parse(configFile);
  class ServiceUtils {
    /**
     * @method constructor
     * @description Empty constructor.
     */
    constructor() {}

    /**
     * @method buildEndpointUrl
     * @description Builds the url based on the config.json properties and the endpointProperty.
     * @param {} endpointProperty Config.json property name for the endpoint we want to use.
     * @returns {String} Url to use in the fetch call.
     */
    buildEndpointUrl(endpointProperty) {
      const url = `${config.isSecure ? 'https' : 'http'}://${config.host}:${config.port}/${
        config.endpoints[endpointProperty]
      }`;
      return url;
    }

    /**
     * @method fetchData
     * @description Executes the API requests according to the method and endpointProperty we use.
     * @param {String} endpointProperty Config.json property name for the endpoint we want to use.
     * @param {String} method The request method type
     * @param {Any} bodyData The data to send if we are using a POST method.
     * @returns {Promise<Any>}
     * @async
     */
    async fetchData(endpointProperty, method, bodyData) {
      let fetchOptionsObject = null;
      if (method === 'POST') {
        fetchOptionsObject = {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(bodyData),
        };
      }

      const api_url = this.buildEndpointUrl(endpointProperty);
      let dataFromService;
      try {
        const response = await fetch(api_url, fetchOptionsObject);
        if (!response.ok) throw Error('Something went wrong');
        dataFromService = await response.json();
      } catch (error) {
        throw Error('Something went wrong');
      }
      return dataFromService;
    }
  }

  return new ServiceUtils();
});
