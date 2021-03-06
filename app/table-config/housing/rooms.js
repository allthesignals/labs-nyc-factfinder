import interpolate from '../../utils/interpolate';

export default [
  {
    title: 'Total housing units',
    highlight: true,
    data: 'hu4',
  },
  {
    title: '1 room',
    data: 'rms1',
  },
  {
    title: '2 rooms',
    data: 'rms2',
  },
  {
    title: '3 rooms',
    data: 'rms3',
  },
  {
    title: '4 rooms',
    data: 'rms4',
  },
  {
    title: '5 rooms',
    data: 'rms5',
  },
  {
    title: '6 rooms',
    data: 'rms6',
  },
  {
    title: '7 rooms',
    data: 'rms7',
  },
  {
    title: '8 rooms',
    data: 'rms8',
  },
  {
    title: '9 rooms or more',
    data: 'rms9pl',
  },
  {
    title: 'Median rooms',
    data: 'mdrms',
    special: true,
    aggregator: interpolate,
    options: {
      bins: [
        ['rms1', [1, 1]],
        ['rms2', [2, 2]],
        ['rms3', [3, 3]],
        ['rms4', [4, 4]],
        ['rms5', [5, 5]],
        ['rms6', [6, 6]],
        ['rms7', [7, 7]],
        ['rms8', [8, 8]],
        ['rms9pl', [9, 9]],
      ],
    },
  },
];

