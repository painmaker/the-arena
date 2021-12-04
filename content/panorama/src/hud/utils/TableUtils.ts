export class TableUtils {

  static areTablesEqual(tableA: any[], tableB: any[], equalityFunction?: Function) {
    return tableA.length === tableB.length &&
      tableA.every((v, i) => {
        if (equalityFunction) {
          return equalityFunction(v, tableB[i]);
        }
        return v === tableB[i]
      });
  }

}
