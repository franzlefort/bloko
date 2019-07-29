import { createDecorator } from 'vue-class-component';

export const Meta = createDecorator ((options, key) => {
  if (!options.methods) return;
  // @ts-nocheck
  options['metaInfo'] = options.methods[key];
});
