/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { FuzmonoTestModule } from '../../../test.module';
import { GameResultDialogComponent } from '../../../../../../main/webapp/app/entities/game-result/game-result-dialog.component';
import { GameResultService } from '../../../../../../main/webapp/app/entities/game-result/game-result.service';
import { GameResult } from '../../../../../../main/webapp/app/entities/game-result/game-result.model';

describe('Component Tests', () => {

    describe('GameResult Management Dialog Component', () => {
        let comp: GameResultDialogComponent;
        let fixture: ComponentFixture<GameResultDialogComponent>;
        let service: GameResultService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FuzmonoTestModule],
                declarations: [GameResultDialogComponent],
                providers: [
                    GameResultService
                ]
            })
            .overrideTemplate(GameResultDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GameResultDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GameResultService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new GameResult(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.gameResult = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'gameResultListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new GameResult();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.gameResult = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'gameResultListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
