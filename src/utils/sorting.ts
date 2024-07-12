export function ignoreCaseCompareFn(a: string, b: string) {
  return a.toLowerCase().localeCompare(b.toLowerCase());
}
