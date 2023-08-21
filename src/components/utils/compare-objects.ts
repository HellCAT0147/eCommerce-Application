export default function compareObjects(obj1: unknown, obj2: unknown): boolean {
  if (typeof obj1 !== 'object') return false;
  if (typeof obj2 !== 'object') return false;

  const castedObj1 = obj1 as { [key: string]: unknown };
  const castedObj2 = obj2 as { [key: string]: unknown };
  const obj1Keys = Object.keys(castedObj1);
  const obj2Keys = Object.keys(castedObj2);
  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }

  return obj1Keys.every((key) => {
    return castedObj1[key] === castedObj2[key];
  });
}
