/*
Timing Functions take in percentage time and return percentage progress.
e.g. progress = LINEAR(timeElasped / totalDuration);
*/

export class TimingFunction {
    name: string;
    apply: (time: number) => number;

    constructor (name: string, apply: (time: number) => number) {
      this.name = name
      this.apply = apply
    }
};

// linear
export const LINEAR = new TimingFunction('linear', pt => pt)

// trigonometric
export const EASE_IN_SINE = new TimingFunction('ease in sine', (pt) => 1 - Math.cos((pt * Math.PI) / 2))
export const EASE_OUT_SINE = new TimingFunction('ease out sine', pt => Math.sin((pt * Math.PI) / 2))
export const EASE_IN_OUT_SINE = new TimingFunction('ease in out sine', pt => -(Math.cos(Math.PI * pt) - 1) / 2)

// quadratic
export const EASE_IN_QUAD = new TimingFunction('ease in quad', pt => pt * pt)
export const EASE_OUT_QUAD = new TimingFunction('ease out quad', pt => 1 - (1 - pt) * (1 - pt))
export const EASE_IN_OUT_QUAD = new TimingFunction('ease in out quad', pt =>
  pt < 0.5 ? 2 * pt * pt : 1 - (-2 * pt + 2) ** 2 / 2)

// cubic
export const EASE_IN_CUBIC = new TimingFunction('ease in cubic', pt => pt * pt * pt)
export const EASE_OUT_CUBIC = new TimingFunction('ease out cubic', pt => 1 - (1 - pt) ** 3)
export const EASE_IN_OUT_CUBIC = new TimingFunction('ease in out cubic', pt =>
  pt < 0.5 ? 4 * pt * pt * pt : 1 - (-2 * pt + 2) ** 3 / 2)

// exponential
export const EASE_IN_EXPO = new TimingFunction('ease in exponential', pt => (pt === 0 ? 0 : 2 ** (10 * pt - 10)))
export const EASE_OUT_EXPO = new TimingFunction('ease out exponential', pt => (pt === 1 ? 1 : 1 - 2 ** (-10 * pt)))
export const EASE_IN_OUT_EXPO = new TimingFunction('ease in out exponential', pt => {
  if (pt === 0) return 0
  if (pt === 1) return 1
  if (pt === 0.5) return 2 ** (20 * pt - 10) / 2
  return (2 - 2 ** (-20 * pt + 10)) / 2
})

// circular
export const EASE_IN_CIRC = new TimingFunction('ease in circular', pt => 1 - Math.sqrt(1 - pt * pt))
export const EASE_OUT_CIRC = new TimingFunction('ease out exponential', pt => Math.sqrt(1 - (pt - 1) * (pt - 1)))
export const EASE_IN_OUT_CIRC = new TimingFunction('ease in out exponential', pt => {
  if (pt < 0.5) return (1 - Math.sqrt(1 - 4 * pt * pt)) / 2
  return (Math.sqrt(1 - (-2 * pt + 2) ** 2) + 1) / 2
})

// back
export const EASE_IN_BACK = new TimingFunction('ease in back', pt => 2.70158 * pt * pt * pt - 1.70158 * pt * pt)
export const EASE_OUT_BACK = new TimingFunction('ease out back', pt =>
  1 + 2.70158 * (pt - 1) ** 3 + 1.70158 * (pt - 1) ** 2)
export const EASE_IN_OUT_BACK = new TimingFunction('ease in out back', pt => {
  const c1 = 1.70158
  const c2 = c1 * 1.525
  if (pt < 0.5) return ((2 * pt) ** 2 * ((c2 + 1) * 2 * pt - c2)) / 2
  return ((2 * pt - 2) ** 2 * ((c2 + 1) * (pt * 2 - 2) + c2) + 2) / 2
})

// reverse
export const reverse = (progress: number) => 1 - progress
