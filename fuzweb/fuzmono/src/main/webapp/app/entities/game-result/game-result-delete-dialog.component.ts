import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GameResult } from './game-result.model';
import { GameResultPopupService } from './game-result-popup.service';
import { GameResultService } from './game-result.service';

@Component({
    selector: 'jhi-game-result-delete-dialog',
    templateUrl: './game-result-delete-dialog.component.html'
})
export class GameResultDeleteDialogComponent {

    gameResult: GameResult;

    constructor(
        private gameResultService: GameResultService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gameResultService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'gameResultListModification',
                content: 'Deleted an gameResult'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-game-result-delete-popup',
    template: ''
})
export class GameResultDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private gameResultPopupService: GameResultPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.gameResultPopupService
                .open(GameResultDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
