/**
 * @module DashboardViewModel
 * @description This module handles the dashboard data.
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 */
define([
  'ojs/ojtranslation',
  '../accUtils',
  'knockout',
  'services/DashboardServices',
  'ojs/ojarraydataprovider',
  'ojs/ojmodule-element-utils',
  'ojs/ojchart',
  'ojs/ojconveyorbelt',
], function (Translations, accUtils, ko, DashboardServices, ArrayDataProvider, ModuleElementUtils) {
  const _t = Translations.getTranslatedString;
  function DashboardViewModel(params) {
    console.log(DashboardServices);
    const { router } = params;
    this.router = router;

    console.log(params);

    this._initAllLabels();
    this._initObservables();
    this._initVariables();

    // Below are a set of the ViewModel methods invoked by the oj-module component.
    // Please reference the oj-module jsDoc for additional information.

    /**
     * Optional ViewModel method invoked after the View is inserted into the
     * document DOM.  The application can put logic that requires the DOM being
     * attached here.
     * This method might be called multiple times - after the View is created
     * and inserted into the DOM and after the View is reconnected
     * after being disconnected.
     */
    this.connected = () => {
      accUtils.announce('Dashboard page loaded.', 'assertive');
      document.title = 'Dashboard';
      // Implement further logic if needed
    };

    /**
     * Optional ViewModel method invoked after the View is disconnected from the DOM.
     */
    this.disconnected = () => {
      // Implement if needed
    };

    /**
     * Optional ViewModel method invoked after transition to the new View is complete.
     * That includes any possible animation between the old and the new View.
     */
    this.transitionCompleted = () => {
      // Implement if needed
    };
  }

  /**
   * @function _initAllIds
   * @description Initializes all ids.
   *
   */
  DashboardViewModel.prototype._initAllIds = function () {
    // this.inputFirstNameId = CoreUtils.generateUniqueId();
  };

  /**
   * @function _initAllLabels
   * @description Initializes all labels (Translations).
   *
   */
  DashboardViewModel.prototype._initAllLabels = function () {
    this.usersDemoDataLabel = _t('headers.usersDemoData');
  };

  /**
   * @function _initAllObservables
   * @description Initializes all the observable values.
   *
   */
  DashboardViewModel.prototype._initObservables = function () {
    this.usersPieSelectionValue = ko.observableArray([]);
    this.usersCountriesData = ko.observableArray([]);
    this.usersCountByAgeData = ko.observableArray([]);
    this.usersCountByAgeValue = ko.observableArray([]);

    this.usersPieSelectionValue.subscribe(
      function ([value]) {
        console.log(value);
        this.router.go({ path: 'about', params: { id: value } });
      }.bind(this)
    );
  };

  DashboardViewModel.prototype._initVariables = function () {
    const modulesConfigArray = [
      {
        module: ModuleElementUtils.createConfig({
          name: 'charts/pie',
          params: {
            usersPieSelectionValue: this.usersPieSelectionValue,
            usersCountriesData: this.usersCountriesData,
          },
        }),
      },
      {
        module: ModuleElementUtils.createConfig({
          name: 'charts/pie',
          params: {
            usersPieSelectionValue: this.usersCountByAgeValue,
            usersCountriesData: this.usersCountByAgeData,
          },
        }),
      },
    ];

    this.modulesDataProvider = new ArrayDataProvider(modulesConfigArray);

    this._loadPieChartsData();
  };

  /**
   * @function _loadPieChartsData
   * @description Loads the pie charts data.
   * @protected
   * @async
   */
  DashboardViewModel.prototype._loadPieChartsData = async function () {
    let dataFromService;
    try {
      dataFromService = await DashboardServices.fetchUsersCountries();
    } catch (error) {
      console.log(error);
    }
    if (dataFromService) {
      this.usersCountriesData(dataFromService);
    }

    let usersCountByAgeDataDataFromService;
    try {
      usersCountByAgeDataDataFromService = await DashboardServices.fetchUsersCountByAge();
    } catch (error) {
      console.log(error);
    }
    if (usersCountByAgeDataDataFromService) {
      this.usersCountByAgeData(usersCountByAgeDataDataFromService);
    }
  };

  /*
   * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
   * return a constructor for the ViewModel so that the ViewModel is constructed
   * each time the view is displayed.
   */
  return DashboardViewModel;
});
