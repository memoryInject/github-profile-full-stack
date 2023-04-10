export function deserializeQuery(locationSearch: string) {
  const search = locationSearch.substring(1);
  if (search) {
    return JSON.parse(
      '{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
      function(key, value) {
        return key === '' ? value : decodeURIComponent(value);
      }
    );
  }

  return {};
}
