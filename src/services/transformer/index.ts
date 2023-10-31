import { transform, Transformer } from 'jsonapi-fractal';

export interface Constructable<T> {
  new (): T;
}

export function transformer<D, T extends Transformer<unknown, unknown>>(
  data: D,
  DataTransformer: Constructable<T>,
  options: any
) {
  return transform()
    .withInput(data)
    .withTransformer(new DataTransformer() as Transformer<unknown, unknown>)
    .withOptions(options)
    .serialize();
}
