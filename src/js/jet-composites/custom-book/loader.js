define([
  'ojs/ojcomposite',
  'text!./custom-book-view.html',
  './custom-book-viewModel',
  'text!./component.json',
  'css!./custom-book-styles',
], function (Composite, view, viewModel, metadata) {
  Composite.register('custom-book', {
    view: view,
    viewModel: viewModel,
    metadata: JSON.parse(metadata),
  });
});
