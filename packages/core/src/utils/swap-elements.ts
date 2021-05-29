const isValidIndex = (index: number, listLength: number) => index >= 0 && index < listLength;

export function swap(arr: Array<any>, index1: number, index2: number): Array<any> {
  const listLength = arr.length;
  const arrayClone = [...arr];

  if (isValidIndex(index1, listLength) && isValidIndex(index2, listLength)) {
    [arrayClone[index2], arrayClone[index1]] = [arrayClone[index1], arrayClone[index2]];
  }

  return arrayClone;
}
