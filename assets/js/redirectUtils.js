export const composeServerRedirectUrl = (fullpath, from, to) => {
  return fullpath.replace(from, to);
};

export const composeClientRedirectObj = (route, redirectTo) => {
  return {
    name: route.name,
    params: {
      slug: redirectTo
    },
    query: Object.assign({}, route.query),
    hash: route.hash
  };
};
