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

  if (auth.obtenerRol() === 'Instructor') {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
export const isAlumnoGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const auth = inject(SecurityService);
  const router = inject(Router);

  if (auth.obtenerRol() === 'Alumno') {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
