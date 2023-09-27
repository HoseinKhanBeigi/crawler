export function getContext(host, defaultContext, contextMap) {
  let context = null;
  if (host && host.length > 0 && !host.includes('localhost')) {
    context = host?.split('.')[0];
  } else if (host && host.length > 0 && host.includes('localhost')) {
    context = defaultContext;
  }
  return contextMap.find(item =>
    [item?.abbr?.toLowerCase(), item?.name?.toLowerCase()].includes(
      context?.toLowerCase(),
    ),
  );
}
