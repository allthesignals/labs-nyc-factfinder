import Ember from 'ember';
import { computed } from 'ember-decorators/object';
import carto from 'ember-jane-maps/utils/carto';

import summaryLevels from '../queries/summary-levels'

const { service } = Ember.inject;



export default Ember.Service.extend({
  selection: service(),
  show: false,
  data: {
    poverty: null,
  },

  povertyPercent: [25, 30],

  toggleSelectionHelper() {
    console.log('toggle selection helper')
    const show = this.get('show');

    console.log(!show, !this.get('data.poverty'))
    // don't set show to true until we have all the data we need to render the layer
    if (!show && !this.get('data.poverty')) {
      console.log('getting data')
      // get the data for the poverty indicator
      const SQL = 'SELECT geoid, c, e, m, p, z FROM economic WHERE variable ILIKE \'fambwpv\' AND geotype = \'CT2010\'';
      carto.SQL(SQL)
        .then((data) => {
          console.log(data);
          this.set('data.poverty', data);
          this.set('show', true);
        });
    }

    if (show) this.set('show', false);
  },

  addHighlightedToSelection() {
    const data = this.get('data');
    const range = this.get('povertyPercent');

    const [min, max] = range;
    const geoids = data.poverty.filter(d => d.p > min && d.p < max).map(d => d.geoid);

    const geoidQuotedStrings = geoids.map(d => `'${d}'`)

    const SQL = `
      SELECT * FROM (${summaryLevels.tracts(false)}) a WHERE geoid IN (${geoidQuotedStrings});
    `;

    console.log(SQL)
    carto.SQL(SQL, 'geojson', 'post')
      .then(({ features }) => {
        this.get('selection').handleSelectedFeatures(features);
      });
  },

  @computed('data', 'povertyPercent')
  filter(data, range) {
    console.log('calculating filter', data);

    const [min, max] = range;
    // get geoids where greater than 10% of the population lives in poverty
    const filter = data.poverty.filter(d => d.p > min && d.p < max).map(d => d.geoid);

    console.log(filter)

    filter.unshift('geoid');
    filter.unshift('in');

    return filter;
  },

  @computed('filter')
  layer(filter) {
    return {
      id: 'helper-line',
      type: 'line',
      source: 'census-geoms',
      'source-layer': 'census-geoms-tracts',
      paint: {
        'line-color': 'rgba(79, 220, 79, 1)',
        'line-width': {
          stops: [
            [
              10,
              1,
            ],
            [
              15,
              8,
            ],
          ],
        },
        'line-blur': {
          stops: [
            [
              10,
              1,
            ],
            [
              15,
              8,
            ],
          ],
        },
        'line-offset': 3,
        'line-opacity': 1,
      },
      filter,
    };
  },
});
