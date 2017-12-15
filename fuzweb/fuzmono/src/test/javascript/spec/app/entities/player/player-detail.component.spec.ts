/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { FuzmonoTestModule } from '../../../test.module';
import { PlayerDetailComponent } from '../../../../../../main/webapp/app/entities/player/player-detail.component';
import { PlayerService } from '../../../../../../main/webapp/app/entities/player/player.service';
import { Player } from '../../../../../../main/webapp/app/entities/player/player.model';

describe('Component Tests', () => {

    describe('Player Management Detail Component', () => {
        let comp: PlayerDetailComponent;
        let fixture: ComponentFixture<PlayerDetailComponent>;
        let service: PlayerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FuzmonoTestModule],
                declarations: [PlayerDetailComponent],
                providers: [
                    PlayerService
                ]
            })
            .overrideTemplate(PlayerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PlayerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlayerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Player(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.player).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
