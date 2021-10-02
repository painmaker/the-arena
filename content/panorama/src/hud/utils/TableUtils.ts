export const TableUtils = {

  isEqual: (tableA: any[], tableB: any[], equalityFunction?: Function) =>
    tableA.length === tableB.length &&
    tableA.every((v, i) => {
      if (equalityFunction) {
        return equalityFunction(v, tableB[i]);
      }
      return v === tableB[i]
    }),

}
