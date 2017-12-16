import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { GameResultComponent } from './game-result.component';
import { GameResultDetailComponent } from './game-result-detail.component';
import { GameResultPopupComponent } from './game-result-dialog.component';
import { GameResultDeletePopupComponent } from './game-result-delete-dialog.component';

export const gameResultRoute: Routes = [
    {
        path: 'game-result',
        component: GameResultComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fuzmonoApp.gameResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'game-result/:id',
        component: GameResultDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fuzmonoApp.gameResult.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gameResultPopupRoute: Routes = [
    {
        path: 'game-result-new',
        component: GameResultPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fuzmonoApp.gameResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'game-result/:id/edit',
        component: GameResultPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fuzmonoApp.gameResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'game-result/:id/delete',
        component: GameResultDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'fuzmonoApp.gameResult.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
