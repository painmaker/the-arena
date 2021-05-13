export function createUUID() {

  let uuidValue = "";

  for (let i = 0; i < 32; i++) {
    let randomValue = Math.random() * 16 | 0;
    if (i == 8 || i == 12 || i == 16 || i == 20) {
      uuidValue += "-"
    }
    uuidValue += (i == 12 ? 4 : (i == 16 ? (randomValue & 3 | 8) : randomValue)).toString(16);
  }

  return uuidValue;

}