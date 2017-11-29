import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Game e2e test', () => {

    let navBarPage: NavBarPage;
    let gameDialogPage: GameDialogPage;
    let gameComponentsPage: GameComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Games', () => {
        navBarPage.goToEntity('game');
        gameComponentsPage = new GameComponentsPage();
        expect(gameComponentsPage.getTitle()).toMatch(/fuzgatewayApp.game.home.title/);

    });

    it('should load create Game dialog', () => {
        gameComponentsPage.clickOnCreateButton();
        gameDialogPage = new GameDialogPage();
        expect(gameDialogPage.getModalTitle()).toMatch(/fuzgatewayApp.game.home.createOrEditLabel/);
        gameDialogPage.close();
    });

    it('should create and save Games', () => {
        gameComponentsPage.clickOnCreateButton();
        gameDialogPage.setPlayer1Input('player1');
        expect(gameDialogPage.getPlayer1Input()).toMatch('player1');
        gameDialogPage.setPlayer2Input('player2');
        expect(gameDialogPage.getPlayer2Input()).toMatch('player2');
        gameDialogPage.save();
        expect(gameDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class GameComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-game div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class GameDialogPage {
    modalTitle = element(by.css('h4#myGameLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    player1Input = element(by.css('input#field_player1'));
    player2Input = element(by.css('input#field_player2'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setPlayer1Input = function (player1) {
        this.player1Input.sendKeys(player1);
    }

    getPlayer1Input = function () {
        return this.player1Input.getAttribute('value');
    }

    setPlayer2Input = function (player2) {
        this.player2Input.sendKeys(player2);
    }

    getPlayer2Input = function () {
        return this.player2Input.getAttribute('value');
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
