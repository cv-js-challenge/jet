define({
  // supported locales.
  'pt-PT': 1,
  // root bundle
  root: {
    buttons: {
      addToCart: 'Add To Cart',
      addToList: 'Add To List',
      close: 'Close',
      create: 'Create',
      reset: 'Reset',
      save: 'Save',
    },
    headers: {
      favoritesDialogTitle: 'Add To List',
      usersDemoData: 'Users',
    },
    inputs: {
      age: 'Age',
      birthday: 'Birthday',
      country: 'Country',
      firstName: 'First Name',
      fullName: 'Full Name',
      lastName: 'Last Name',
      lists: 'Lists',
      state: 'State',
      weight: 'Weight',
    },
    messagesCustom: {
      birthday: 'You should have at least 18 years old!',
      weight: 'You should have an higher value!',
    },
    validators: {
      firstNameLengthHint: 'Custom hint: value must have at least {0} characters but not more than {1}',
      tooLong: 'Number of characters is too high. Enter at most {0} characters',
      tooManyChars: 'Too many characters',
      tooShort: 'Number of characters is too low. Enter at least {0} characters',
    },
  },
});
