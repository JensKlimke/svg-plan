
export type KeyValueMap = {[key: string] : (string | number | boolean)};

export function style(elements : KeyValueMap) : string {
  return Object.entries(elements).map(entry =>
    `${entry[0]}:${typeof entry[1] === 'string' ? `'${entry[1]}'` : entry[1]}`
  ).join('; ');
}

export function attributes(elements : KeyValueMap) {
  return Object.entries(elements).map(entry => `${entry[0]}="${entry[1].toString()}"`).join(' ');
}