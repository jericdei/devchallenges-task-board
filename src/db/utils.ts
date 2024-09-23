export function createEnumObject<T extends string>(
  array: readonly T[]
): { [K in T]: K } {
  return array.reduce((acc, cur) => {
    acc[cur] = cur;
    return acc;
  }, {} as { [K in T]: K });
}
