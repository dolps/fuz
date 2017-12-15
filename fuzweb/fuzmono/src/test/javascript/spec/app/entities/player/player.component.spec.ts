/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { FuzmonoTestModule } from '../../../test.module';
import { PlayerComponent } from '../../../../../../main/webapp/app/entities/player/player.component';
import { PlayerService } from '../../../../../../main/webapp/app/entities/player/player.service';
import { Player } from '../../../../../../main/webapp/app/entities/player/player.model';

describe('Component Tests', () => {

    describe('Player Management Component', () => {
        let comp: PlayerComponent;
        let fixture: ComponentFixture<PlayerComponent>;
        let service: PlayerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FuzmonoTestModule],
                declarations: [PlayerComponent],
                providers: [
                    PlayerService
                ]
            })
            .overrideTemplate(PlayerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PlayerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlayerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Player(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.players[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
