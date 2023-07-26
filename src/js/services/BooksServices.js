define(['utils/Service'], function (ServiceUtils) {
  /**
   * @module BooksServices
   * @description Books service abstraction
   * @license
   * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
   * Licensed under The Universal Permissive License (UPL), Version 1.0
   * as shown at https://oss.oracle.com/licenses/upl/
   */
  function BooksServices() {}

  /**
   * @function fetchBooks
   * @description Gets all the books from the backend.
   * @returns {Promise} Promise with all the books data.
   * @async
   */
  BooksServices.prototype.fetchBooks = async function () {
    return new Promise(function (resolve, reject) {
      setTimeout(async () => {
        return resolve(await ServiceUtils.fetchData('books'));
      }, 1000);
    });
  };

  return new BooksServices();
});
