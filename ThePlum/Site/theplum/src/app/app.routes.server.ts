import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'room/:name',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      // Angular needs this list to know which HTML files to build at compile time
      return [{ name: 'The Affectionate One' }, { name: 'The Affectionate One 2' }, { name: 'Bush Mango' }, { name: 'The Plum' }];
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
