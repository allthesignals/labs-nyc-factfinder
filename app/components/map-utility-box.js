import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

const { service } = Ember.inject;
const { alias } = Ember.computed;

export default Ember.Component.extend({
  selection: service(),
  selectionHelper: service(),

  classNames: ['map-utility-box'],

  selectionCount: alias('selection.selectedCount'),
  mode: 'direct-select',

  summaryLevel: alias('selection.summaryLevel'),

  povertyHelperOptions: {
    start: [25, 50],
  },

  @computed('selection.selectedCount')
  profileButtonClasses(count) {
    return count > 0 ? 'button large expanded view-profile-button' : 'button large expanded disabled view-profile-button';
  },

  actions: {
    clearSelection() {
      this.get('selection').clearSelection();
    },
    handleDrawButtonClick() {
      this.sendAction('handleDrawButtonClick');
    },
    transitionTo() {
    },

    toggleSelectionHelper() {
      this.get('selectionHelper').toggleSelectionHelper();
    },

    handlePovertySliderChange(sliderValue) {
      this.set('selectionHelper.povertyPercent', sliderValue);
    },

    addHighlightedToSelection() {
      this.get('selectionHelper').addHighlightedToSelection();
    },
  },
});
