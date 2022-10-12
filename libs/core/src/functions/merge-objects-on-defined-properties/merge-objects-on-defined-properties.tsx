/**
 * Copyright 2022 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
