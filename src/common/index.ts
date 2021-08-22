export const clamp = (value: number, min: number, max: number): number => {
  return min < max ? (value < min ? min : value > max ? max : value) : value < max ? max : value > min ? min : value;
};
export const str_pad_left = (string: string, pad: string, length: number): string => {
  return (new Array(length + 1).join(pad) + string).slice(-length);
};
