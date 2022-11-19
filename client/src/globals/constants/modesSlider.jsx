export const freqModeSliders = [
  {
    id: 0,
    label: "110 Hz",
    min: 0,
    max: 2,
    step: 0.2,
    value: 1,
    ranges: [[0, 110, 0]],
  },
  {
    id: 1,
    label: "250 Hz",
    min: 0,
    max: 2,
    step: 0.2,
    value: 1,
    ranges: [[110, 250, 0]],
  },
  {
    id: 2,
    label: "370 Hz",
    min: 0,
    max: 2,
    step: 0.2,
    value: 1,
    ranges: [[250, 370, 0]],
  },
  {
    id: 3,
    label: "650 Hz",
    min: 0,
    max: 2,
    step: 0.2,
    value: 1,
    ranges: [[370, 650, 0]],
  },
  {
    id: 4,
    label: "1.2 kHz",
    min: 0,
    max: 2,
    step: 0.2,
    value: 1,
    ranges: [[650, 1200, 0]],
  },
  {
    id: 5,
    label: "2.13 kHz",
    min: 0,
    max: 2,
    step: 0.2,
    value: 1,
    ranges: [[1200, 2130, 0]],
  },
  {
    id: 6,
    label: "4.55 kHz",
    min: 0,
    max: 2,
    step: 0.2,
    value: 1,
    ranges: [[2130, 4550, 0]],
  },
  {
    id: 7,
    label: "6.85 kHz",
    min: 0,
    max: 2,
    step: 0.2,
    value: 1,
    ranges: [[4550, 6850, 0]],
  },
  {
    id: 8,
    label: "10 kHz",
    min: 0,
    max: 2,
    step: 0.2,
    value: 1,
    ranges: [[6850, 10000, 0]],
  },
  {
    id: 9,
    label: "16 kHz",
    min: 0,
    max: 2,
    step: 0.2,
    value: 1,
    ranges: [[10000, 16000, 0]],
  },
];

export const vowelsModeSliders = [
  {
    id: 0,
    label: "A",
    min: 0,
    max: 1,
    step: 1,
    value: 1,
    ranges: [[0, 2400, 0]],
  },

  {
    id: 1,
    label: "I",
    min: 0,
    max: 1,
    step: 1,
    value: 1,
    ranges: [[0, 5000, 0]],
  },
  {
    id: 2,
    label: "O",
    min: 0,
    max: 1,
    step: 1,
    value: 1,
    ranges: [[0, 1850, 0]],
  },
  {
    id: 3,
    label: "U",
    min: 0,
    max: 1,
    step: 1,
    value: 1,
    ranges: [[0, 2000, 0]],
  },
];

export const musicModeSliders = [
  {
    id: 0,
    label: "Drums",
    min: 0,
    max: 2,
    step: 0.2,
    value: 1,
    ranges: [
      [10, 500, 1],
      [500, 200, 1],
    ],
  },
  {
    id: 1,
    label: "Trumpet",
    min: 0,
    max: 2,
    step: 0.2,
    value: 1,
    ranges: [
      [0.5, 100, 0],
      [730, 750, 0],
      [1465, 1550, 0],
      [2200, 2225, 0],
      [2920, 3000, 0],
      [3695, 3705, 0],
      [4410, 4470, 0],
      [7390, 7410, 0],
      [6500, 1],
    ],
  },
  {
    id: 2,
    label: "Xylophone",
    min: 0,
    max: 2,
    step: 0.2,
    value: 1,
    ranges: [
      [0.5, 40, 0],
      [700, 1100, 0],
      [850, 950, 0],
      [3300, 3350, 0],
      [4000, 6000, 0],
      [6000, 0],
      [3710, 4000, 1],
    ],
  },
];

export const animals = [
  {
    id: 0,
    label: "Bird",
    min: 0,
    max: 1,
    step: 1,
    value: 1,
    ranges: [[3000, 7000, 1]],
  },
  {
    id: 0,
    label: "Dog",
    min: 0,
    max: 1,
    step: 1,
    value: 1,
    ranges: [[100, 3000, 0]],
  },
];
