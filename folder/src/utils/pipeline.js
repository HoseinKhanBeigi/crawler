export const pipeline = (...fns) => data => fns.reduce((p, c) => c(p), data);
export const asyncPipeline = (...fns) => data =>
  fns.reduce((p, c) => p.then(c), Promise.resolve(data));
