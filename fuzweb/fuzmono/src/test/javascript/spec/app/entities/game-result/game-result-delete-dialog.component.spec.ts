/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { FuzmonoTestModule } from '../../../test.module';
import { GameResultDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/game-result/game-result-delete-dialog.component';
import { GameResultService } from '../../../../../../main/webapp/app/entities/game-result/game-result.service';

describe('Component Tests', () => {

    describe('GameResult Management Delete Component', () => {
        let comp: GameResultDeleteDialogComponent;
        let fixture: ComponentFixture<GameResultDeleteDialogComponent>;
        let service: GameResultService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FuzmonoTestModule],
                declarations: [GameResultDeleteDialogComponent],
                providers: [
                    GameResultService
                ]
            })
            .overrideTemplate(GameResultDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GameResultDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GameResultService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
