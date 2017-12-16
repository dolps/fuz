/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { FuzmonoTestModule } from '../../../test.module';
import { GameResultDetailComponent } from '../../../../../../main/webapp/app/entities/game-result/game-result-detail.component';
import { GameResultService } from '../../../../../../main/webapp/app/entities/game-result/game-result.service';
import { GameResult } from '../../../../../../main/webapp/app/entities/game-result/game-result.model';

describe('Component Tests', () => {

    describe('GameResult Management Detail Component', () => {
        let comp: GameResultDetailComponent;
        let fixture: ComponentFixture<GameResultDetailComponent>;
        let service: GameResultService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FuzmonoTestModule],
                declarations: [GameResultDetailComponent],
                providers: [
                    GameResultService
                ]
            })
            .overrideTemplate(GameResultDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GameResultDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GameResultService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new GameResult(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.gameResult).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
