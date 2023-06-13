import { CanMatchFn, Route, UrlSegment } from "@angular/router";

export const authGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  // implementar validacao se usuario esta logado ou nao com o authService.
  return true
}
