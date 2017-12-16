import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GameResult } from './game-result.model';
import { GameResultPopupService } from './game-result-popup.service';
import { GameResultService } from './game-result.service';

@Component({
    selector: 'jhi-game-result-dialog',
    templateUrl: './game-result-dialog.component.html'
})
export class GameResultDialogComponent implements OnInit {

    gameResult: GameResult;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private gameResultService: GameResultService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.gameResult.id !== undefined) {
            this.subscribeToSaveResponse(
                this.gameResultService.update(this.gameResult));
        } else {
            this.subscribeToSaveResponse(
                this.gameResultService.create(this.gameResult));
        }
    }

    private subscribeToSaveResponse(result: Observable<GameResult>) {
        result.subscribe((res: GameResult) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: GameResult) {
        this.eventManager.broadcast({ name: 'gameResultListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-game-result-popup',
    template: ''
})
export class GameResultPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private gameResultPopupService: GameResultPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.gameResultPopupService
                    .open(GameResultDialogComponent as Component, params['id']);
            } else {
                this.gameResultPopupService
                    .open(GameResultDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
