/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { FuzmonoTestModule } from '../../../test.module';
import { GameResultComponent } from '../../../../../../main/webapp/app/entities/game-result/game-result.component';
import { GameResultService } from '../../../../../../main/webapp/app/entities/game-result/game-result.service';
import { GameResult } from '../../../../../../main/webapp/app/entities/game-result/game-result.model';

describe('Component Tests', () => {

    describe('GameResult Management Component', () => {
        let comp: GameResultComponent;
        let fixture: ComponentFixture<GameResultComponent>;
        let service: GameResultService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FuzmonoTestModule],
                declarations: [GameResultComponent],
                providers: [
                    GameResultService
                ]
            })
            .overrideTemplate(GameResultComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GameResultComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GameResultService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new GameResult(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.gameResults[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
