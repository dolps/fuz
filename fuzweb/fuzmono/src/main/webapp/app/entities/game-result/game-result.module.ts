import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuzmonoSharedModule } from '../../shared';
import {
    GameResultService,
    GameResultPopupService,
    GameResultComponent,
    GameResultDetailComponent,
    GameResultDialogComponent,
    GameResultPopupComponent,
    GameResultDeletePopupComponent,
    GameResultDeleteDialogComponent,
    gameResultRoute,
    gameResultPopupRoute,
} from './';

const ENTITY_STATES = [
    ...gameResultRoute,
    ...gameResultPopupRoute,
];

@NgModule({
    imports: [
        FuzmonoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        GameResultComponent,
        GameResultDetailComponent,
        GameResultDialogComponent,
        GameResultDeleteDialogComponent,
        GameResultPopupComponent,
        GameResultDeletePopupComponent,
    ],
    entryComponents: [
        GameResultComponent,
        GameResultDialogComponent,
        GameResultPopupComponent,
        GameResultDeleteDialogComponent,
        GameResultDeletePopupComponent,
    ],
    providers: [
        GameResultService,
        GameResultPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FuzmonoGameResultModule {}
