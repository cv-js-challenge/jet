/**
 * @module FavoritesDialogViewModel
 * @description This modules handles the favorites dialog logic.
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 */

define([
  'ojs/ojtranslation',
  'knockout',
  'ojs/ojarraydataprovider',
  'ojs/ojavatar',
  'ojs/ojgauge',
  'ojs/ojdialog',
  'ojs/ojselectsingle',
], function (Translations, ko, ArrayDataProvider) {
  const _t = Translations.getTranslatedString;
  function FavoritesDialogViewModel(context) {
    this._initIds(context);

    this._initLabels();

    this._initObservables(context);

    this._initVariables(context);

    this.handleSaveToList = this._handleSaveToList.bind(this);

    this.handleCloseDialog = this._handleCloseDialog.bind(this);

    this.beforeFavoritesDialogClose = this._beforeFavoritesDialogClose.bind(this);
  }

  /**
   * @function _initIds
   * @description Inits all the Ids.
   * @protected
   */
  FavoritesDialogViewModel.prototype._initIds = function (context) {
    this.favoritesDialogId = context.favoritesDialogId;
  };

  /**
   * @function _initLabels
   * @description Inits all the labels.
   * @protected
   */
  FavoritesDialogViewModel.prototype._initLabels = function () {
    this.favoritesDialogTitle = _t('headers.favoritesDialogTitle');
    this.saveLabel = _t('buttons.save');
    this.closeLabel = _t('buttons.close');
    this.inputListLabel = _t('inputs.lists');
  };

  /**
   * @function _initObservables
   * @description Inits all the observables.
   * @param {Object} context
   * @protected
   */
  FavoritesDialogViewModel.prototype._initObservables = function (context) {
    this.inputListValue = ko.observable(null);
    this.listData = context.listData;
  };

  /**
   * @function _initVariables
   * @description Inits all the variables.

   * @protected
   */
  FavoritesDialogViewModel.prototype._initVariables = function (context) {
    this.inputListDataProvider = new ArrayDataProvider(this.listData, {
      keyAttributes: 'value',
    });

    this.changeColorCallback = context.changeColorCallback;
  };

  /**
   * @function _handleSaveToList
   * @description Handles the save to list action.
   * @protected
   */
  FavoritesDialogViewModel.prototype._handleSaveToList = function () {
    //TODO: add the book to the list
    console.log(this.inputListValue());
    this.changeColorCallback();
    document.getElementById(this.favoritesDialogId).close();
  };

  /**
   * @function _handleCloseDialog
   * @description Handles the close dialog button click.
   * @protected
   */
  FavoritesDialogViewModel.prototype._handleCloseDialog = function () {
    document.getElementById(this.favoritesDialogId).close();
  };

  /**
   * @function _beforeFavoritesDialogClose
   * @description handles the event before closing the dialog.
   * @protected
   */
  FavoritesDialogViewModel.prototype._beforeFavoritesDialogClose = function () {
    this.inputListValue(null);
  };

  return FavoritesDialogViewModel;
});
