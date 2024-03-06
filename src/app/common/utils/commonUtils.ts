import { NoteValue } from '../enums/NoteValue';

export function isValidNote(note: string): boolean {
  return Object.values(NoteValue).includes(note);
}

export function getEnumKeyFromValue(
  enumRef: Object,
  value: string | number
): string {
  return Object.keys(enumRef)[Object.values(enumRef).indexOf(value)];
}

export function checkIntArrayEqual(arr1: number[], arr2: number[]): boolean {
  if (arr1.length != arr2.length) return false;
  return (
    arr1.sort((a, b) => a - b).toString() ==
    arr2.sort((a, b) => a - b).toString()
  );
}
