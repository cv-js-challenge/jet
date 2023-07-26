
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
  /**
   * @module CustomBookViewModel
   * @description This is the view model to handle the book composite.
   * @param {Object} context The viewModel context.
   */
  function CustomBookViewModel(context) {
    this._initIds();

    this._initLabels();

    this._initObservables();

    this._initVariables(context);

    this.element = context.element;
    this.context = context;

    this.onClick = this._onClick.bind(this);

    this.handleAddToCart = this._handleAddToCart.bind(this);

    this.handleAddToList = this._handleAddToList.bind(this);

    this.changeHeartColor = this._changeHeartColor.bind(this);
  }

  /**
   * @function _initIds
   * @description Inits all the ids.
   * @protected
   */
  CustomBookViewModel.prototype._initIds = function () {};

  /**
   * @function _initLabels
   * @description Inits all the labels.
   * @protected
   */
  CustomBookViewModel.prototype._initLabels = function () {
    this.addToCartLabel = _t('buttons.addToCart');
    this.addToListLabel = _t('buttons.addToList');
  };

  /**
   * @function _initObservables
   * @description Inits all the observables.
   * @protected
   */
  CustomBookViewModel.prototype._initObservables = function () {
    this.heartColor = ko.observable(null);
    this.inputListValue = ko.observable(null);
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
   * @param {Object} context
   * @protected
   */
  CustomBookViewModel.prototype._initVariables = function (context) {
    this.bookTitle = context.properties.bookTitle;
  };

  /**
   * @function _handleAddToCart
   * @description Handles the add to card button click.
   * @param {Object} e The click event
   */
  CustomBookViewModel.prototype._handleAddToCart = function (e) {
    alert('add to cart');
  };

  /**
   * @function _handleAddToList
   * @description  Handles the add to list button click.
   * @protected
   */
  CustomBookViewModel.prototype._handleAddToList = function () {
    const params = {
      bubbles: true,
      detail: { value: this.context.properties.bookId },
    };
    this.element.dispatchEvent(new CustomEvent('addedToList', params));
  };

  /**
   * @function _onClick
   * @description Handles the on click event.
   * @protected
   */
  CustomBookViewModel.prototype._onClick = function () {
    const params = {
      bubbles: true,
      detail: { value: this.context.properties.bookId },
    };
    this.element.dispatchEvent(new CustomEvent('bookClick', params));
  };

  /**
   * @function _changeHeartColor
   * @description Changes the color of the heart.
   * @public
   */
  CustomBookViewModel.prototype._changeHeartColor = function (value) {
    this.heartColor(value);
  };

  /**
   * @function _getHeartColor
   * @description Returns the heart's color.
   * @public
   */
  CustomBookViewModel.prototype._getHeartColor = function () {
    return this.heartColor();
  };

  return CustomBookViewModel;
});
