// testing w/ with mocha and chai (chai is assertion lib)
export const getPropertyWithDefault = (propertyName, defaultValue, obj) =>
  obj[propertyName] ?? defaultValue
