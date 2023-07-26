define([
  'ojs/ojarraydataprovider',
  'services/BooksServices',
  'knockout',
  'ojs/ojmodule-element-utils',
  'ojs/ojavatar',
  'ojs/ojprogress-circle',
  'custom-book/loader',
], function (ArrayDataProvider, BooksServices, ko, ModuleElementUtils) {
  /**
   * @module BooksViewModel
   * @description This module has some books data
   * @license
   * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
   * Licensed under The Universal Permissive License (UPL), Version 1.0
   * as shown at https://oss.oracle.com/licenses/upl/
   * @author LPWJ
   */
  function BooksViewModel() {
    this._initIds();
    this._initObservables();
    this._initVariables();
    this._initBooksData();

    this.bookClick = (e) => {
    };

    this.bookAddedToList = (e) => {
      this.bookId(e.detail.value);
      if (document.getElementById(this.bookId()).getHeartColor() === BooksViewModel.COLORS.red) {
        document.getElementById(this.bookId()).changeHeartColor(null);
        return;
      }
      document.getElementById(this.favoritesDialogId).open();
    };
  }

  BooksViewModel.COLORS = {
    red: 'red',
  };

  /**
   * @function _initIds
   * @description Inits all the ids.
   */
  BooksViewModel.prototype._initIds = function () {
    this.favoritesDialogId = 'favorites-dialog-id';
  };

  /**
   * @function _initObservables
   * @description Inits all the observables
   */
  BooksViewModel.prototype._initObservables = function () {
    this.bookId = ko.observable(null);
    this.isLoading = ko.observable(true);
    this.booksData = ko.observableArray([]);

    this.listData = ko.observableArray([
      {
        value: 1,
        label: 'Favorites',
      },
    ]);
  };

  /**
   * @function _initVariables
   * @description Inits all the variables.
   */
  BooksViewModel.prototype._initVariables = function () {
    this.booksDataProvider = new ArrayDataProvider(this.booksData);

    this.favoritesDialog = ModuleElementUtils.createConfig({
      name: 'dialogs/favorites',
      params: {
        favoritesDialogId: this.favoritesDialogId,
        listData: this.listData,
        changeColorCallback: this._changeColor.bind(this, this.bookId),
      },
    });
  };

  /**
   * @function _initBooksData
   * @description Inits all the book data.
   */
  BooksViewModel.prototype._initBooksData = async function () {
    let dataFromService;
    try {
      dataFromService = await BooksServices.fetchBooks();
    } catch (error) {
      console.log(error);
    }
    if (dataFromService) {
      const bookSrs = dataFromService.map((book) => {
        book.id = `book-custom-${book.id}`;
        book.heartColor = ko.observable(null);
        return book;
      });
      this.booksData(bookSrs);
      this.isLoading(false);
    }
  };

  /**
   * @function _changeColor
   * @description Changes the color based on the book ID.
   * @param {ko.observable} bookId
   */
  BooksViewModel.prototype._changeColor = function (bookId) {
    document.getElementById(bookId()).changeHeartColor(BooksViewModel.COLORS.red);
  };

  /*
   * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
   * return a constructor for the ViewModel so that the ViewModel is constructed
   * each time the view is displayed.
   */
  return BooksViewModel;
});
