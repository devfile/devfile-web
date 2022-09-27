/*
 * This function merges two objects on defined properties.
 * The first object must extends the second object.
 * If the property is defined in the second object, it will be used.
 * If the property is undefined in the second object, the value from the first object will be used.
 * */
export function mergeObjectsOnDefinedProperties<
  Obj1 extends NonNullable<Obj2>,
  Obj2 extends Record<string, unknown> | undefined,
>(obj1: Obj1, obj2: Obj2): Obj1 {
  if (!obj2) {
    return obj1;
  }

  const newObj = Object.keys(obj1).reduce((prev, key) => {
    if (obj2[key] !== undefined) {
      return { ...prev, [key]: obj2[key] };
    }
    return { ...prev, [key]: obj1[key] };
  }, {} as Obj1);

  return newObj;
}

export default mergeObjectsOnDefinedProperties;
