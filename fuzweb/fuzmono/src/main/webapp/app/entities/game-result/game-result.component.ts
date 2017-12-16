import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { GameResult } from './game-result.model';
import { GameResultService } from './game-result.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-game-result',
    templateUrl: './game-result.component.html'
})
export class GameResultComponent implements OnInit, OnDestroy {
gameResults: GameResult[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private gameResultService: GameResultService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.gameResultService.query().subscribe(
            (res: ResponseWrapper) => {
                this.gameResults = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInGameResults();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: GameResult) {
        return item.id;
    }
    registerChangeInGameResults() {
        this.eventSubscriber = this.eventManager.subscribe('gameResultListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
