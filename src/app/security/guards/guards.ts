import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { SecurityService } from "../security.service";

export const isAdminGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const auth = inject(SecurityService);
  const router = inject(Router);

  if (auth.obtenerRol() === 'Administrador') {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};

export const isInstructorGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const auth = inject(SecurityService);
  const router = inject(Router);

  if (auth.obtenerRol() === 'Instrcutor') {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
