// El export por defecto de @sanity/image-url está obsoleto y avisaba en cada
// build. El paquete expone `createImageUrlBuilder` como export nombrado, que
// hace exactamente lo mismo.
import { createImageUrlBuilder } from '@sanity/image-url';
import { client } from './client';

const builder = createImageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}
