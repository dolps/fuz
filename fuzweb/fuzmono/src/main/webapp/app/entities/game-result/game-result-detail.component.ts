import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { GameResult } from './game-result.model';
import { GameResultService } from './game-result.service';

@Component({
    selector: 'jhi-game-result-detail',
    templateUrl: './game-result-detail.component.html'
})
export class GameResultDetailComponent implements OnInit, OnDestroy {

    gameResult: GameResult;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private gameResultService: GameResultService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGameResults();
    }

    load(id) {
        this.gameResultService.find(id).subscribe((gameResult) => {
            this.gameResult = gameResult;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGameResults() {
        this.eventSubscriber = this.eventManager.subscribe(
            'gameResultListModification',
            (response) => this.load(this.gameResult.id)
        );
    }
}
