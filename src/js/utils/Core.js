define([], function () {
  /**
   * @module CoreUtils
   * @description Singleton to store global methods.
   */
  class CoreUtils {
    /**
     * @method
     * @description A singleton to hold the variable we want to increment across all the viewModels.
     * generates an unique id by calling the generateUniqueId method.
     * @returns The existing instance, if not created it creates it, otherwise it will always return the existing one.
     */
    constructor() {
      if (!CoreUtils.instance) {
        this.counter = 0;
        CoreUtils.instance = this;
      }
      return CoreUtils.instance;
    }

    /**
     * @method generateUniqueId
     * @description Generates an unique ID.
     * @returns An unique ID based on a internal counter.
     */
    generateUniqueId() {
      return `uid-${this.counter++}`;
    }

    /**
     * @method checkValidationGroup
     * @description Checks a given validation group identified by its DOM id.
     * @param {String} id THe validation group id.
     * @returns {Boolean} If the validation group is valid.
     */
    checkValidationGroup(id) {
      const tracker = document.getElementById(id);
      if (tracker.valid === 'valid') {
        return true;
      } else {
        // show messages on all the components that are invalidHiddden, i.e., the
        // required fields that the user has yet to fill out.
        tracker.showMessages();
        tracker.focusOn('@firstInvalidShown');
        return false;
      }
    }

    /**
     * @method toastMessagePosition
     * @description Returns the global message configuration.
     * @returns {Object} The message configuration.
     */
    toastMessagePosition() {
      return {
        my: { vertical: 'top', horizontal: 'end' },
        at: { vertical: 'top', horizontal: 'end' },
        of: 'window',
      };
    }

    /**
     * @method getAutoTimeout
     * @description Returns the global auto timeout configuration.
     * @returns {Number} The auto timeout value.
     */
    getAutoTimeout() {
      return 8000;
    }
  }

  // creating instance
  const instance = new CoreUtils();
  return instance;
});
