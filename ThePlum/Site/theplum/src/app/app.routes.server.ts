import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'room/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      // Angular needs this list to know which HTML files to build at compile time
      return [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
