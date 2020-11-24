import { DOCUMENT } from '@angular/common'
import { Inject } from '@angular/core'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '@auth0/auth0-angular'

@Component({
  selector: 'settings-button',
  template: `
    <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
      <ngx-avatar
        *ngIf="auth.user$ | async as user"
        [gravatarId]="user.name"
        [matMenuTriggerFor]="menu"
      ></ngx-avatar>
      <mat-menu #menu="matMenu" xPosition="before">
        <button mat-menu-item *ngIf="auth.user$ | async as user">
          {{ user.name }}
        </button>
        <mat-divider></mat-divider>
        <button mat-menu-item (click)="navTo('/AppSettingsView')">
          <mat-icon>settings</mat-icon>
          <span>Settings</span>
        </button>
        <button mat-menu-item (click)="signOut()">
          <mat-icon>exit_to_app</mat-icon>
          <span>Sign Out</span>
        </button>
      </mat-menu>
    </ng-container>
    <ng-template #loggedOut>
      <button
        mat-icon-button
        aria-label="Settings"
        matTooltip="Settings"
        (click)="signIn()"
      >
        <mat-icon>build</mat-icon>
      </button>
    </ng-template>
  `,
  styles: [``],
})
export class SettingsButtonComponent {
  constructor(
    private router: Router,
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService
  ) {
    // empty constructor
  }

  navTo(loc: string): void {
    this.router.navigateByUrl(loc)
  }

  signIn(): void {
    this.auth.loginWithRedirect({
      redirectUri: this.document.location.origin + '/AppSettingsView',
    })
  }

  signOut(): void {
    this.auth.logout({ returnTo: this.document.location.origin })
  }
}
