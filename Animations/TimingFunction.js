/*
Timing Functions take in percentage time and return percentage progress.
e.g. progress = LINEAR(timeElasped / totalDuration);
*/

// linear
export const LINEAR = (pt) => pt;

// trigonometric
export const EASE_IN_SINE = (pt) => 1 - Math.cos((pt * Math.PI) / 2);
export const EASE_OUT_SINE = (pt) => Math.sin((pt * Math.PI) / 2);
export const EASE_IN_OUT_SINE = (pt) => -(Math.cos(Math.PI * pt) - 1) / 2;

// quadratic
export const EASE_IN_QUAD = (pt) => pt * pt;
export const EASE_OUT_QUAD = (pt) => 1 - (1 - pt) * (1 - pt);
export const EASE_IN_OUT_QUAD = (pt) =>
    pt < 0.5 ? 2 * pt * pt : 1 - (-2 * pt + 2) ** 2 / 2;

// cubic
export const EASE_IN_CUBIC = (pt) => pt * pt * pt;
export const EASE_OUT_CUBIC = (pt) => 1 - (1 - pt) ** 3;
export const EASE_IN_OUT_CUBIC = (pt) =>
    pt < 0.5 ? 4 * pt * pt * pt : 1 - (-2 * pt + 2) ** 3 / 2;

// exponential
export const EASE_IN_EXPO = (pt) => (pt === 0 ? 0 : 2 ** (10 * pt - 10));
export const EASE_OUT_EXPO = (pt) => (pt === 1 ? 1 : 1 - 2 ** (-10 * pt));
export const EASE_IN_OUT_EXPO = (pt) => {
    if (pt === 0) return 0;
    if (pt === 1) return 1;
    if (pt === 0.5) return 2 ** (20 * pt - 10) / 2;
    return (2 - 2 ** (-20 * pt + 10)) / 2;
};

// circular
export const EASE_IN_CIRC = (pt) => 1 - Math.sqrt(1 - pt * pt);
export const EASE_OUT_CIRC = (pt) => Math.sqrt(1 - (pt - 1) * (pt - 1));
export const EASE_IN_OUT_CIRC = (pt) => {
    if (pt < 0.5) return (1 - Math.sqrt(1 - 4 * pt * pt)) / 2;
    return (Math.sqrt(1 - (-2 * pt + 2) ** 2) + 1) / 2;
};

// back
export const EASE_IN_BACK = (pt) => 2.70158 * pt * pt * pt - 1.70158 * pt * pt;
export const EASE_OUT_BACK = (pt) =>
    1 + 2.70158 * (pt - 1) ** 3 + 1.70158 * (pt - 1) ** 2;
export const EASE_IN_OUT_BACK = (pt) => {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    if (pt < 0.5) return ((2 * pt) ** 2 * ((c2 + 1) * 2 * pt - c2)) / 2;
    return ((2 * pt - 2) ** 2 * ((c2 + 1) * (pt * 2 - 2) + c2) + 2) / 2;
};

// reverse
export const reverse = (progress) => 1 - progress;
