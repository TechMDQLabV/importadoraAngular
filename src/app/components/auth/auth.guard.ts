import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { LoginService } from 'app/services/auth/login.service'


@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
  
    constructor(private userService: LoginService, private router: Router) { }
  
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
      let url: string = state.url
      return this.checkLogin(url)
    }
  
    checkLogin(url: string): boolean {
      if (this.userService.getToken()) { return true }
      this.userService.redirectUrl = url
      this.router.navigate(["/login"])
      return false
    }
  }