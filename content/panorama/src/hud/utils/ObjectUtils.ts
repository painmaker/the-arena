export const objectsEqual = (o1: any, o2: any) =>
  Object.keys(o1).length === Object.keys(o2).length &&
  Object.keys(o1).every(p => o1[p] === o2[p]);

