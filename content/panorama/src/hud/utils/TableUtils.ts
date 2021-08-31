export const TableUtils = {

  isEqual: (a: any[], b: any[]) =>
    a.length === b.length &&
    a.every((v, i) => v === b[i])

}
