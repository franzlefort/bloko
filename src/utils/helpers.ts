type JSON = {
  [key: string]: any
};

const longDate = {
  hour: '2-digit',
  minute: '2-digit',
  day: '2-digit',
  month: 'long'
};
// "2017-09-20T20:32:25.884Z" --> 20 сентября, 23:32;

const longestDate = {
  hour: '2-digit',
  minute: '2-digit',
  day: '2-digit',
  month: 'long',
  year: 'numeric'
};
// "2017-09-20T20:32:25.884Z" --> 20 сентября, 23:32;

const shortDate = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
};
// Thu Feb 08 2018 22: 56: 48 GMT + 0300(RTZ 2(зима)) --> "08.02.18"

const time = {
  hour: '2-digit',
  minute: '2-digit'
};
// "2017-09-03T18:23:29.078Z" --> 21:23

/**
 * Получить копию объект
 */
function getCopy (object: any): any {
  if (object) return JSON.parse(JSON.stringify(object));
  return {};
}

/**
 * Get flatten errors object
 */
function getFlatErrors (source: any[] = []): JSON {
  const flatErrors = (errors: { [key: string]: any }[] = []) => errors.map(err => err.message).filter(err => err);
  const result: JSON = {};
  source.forEach( src => result[src.field] = flatErrors(src.errors) );
  return result;
}

export {
  longDate,
  time,
  shortDate,
  longestDate,
  getCopy,
  getFlatErrors,
};
