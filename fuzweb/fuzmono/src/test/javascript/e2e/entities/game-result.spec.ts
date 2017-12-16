import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('GameResult e2e test', () => {

    let navBarPage: NavBarPage;
    let gameResultDialogPage: GameResultDialogPage;
    let gameResultComponentsPage: GameResultComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load GameResults', () => {
        navBarPage.goToEntity('game-result');
        gameResultComponentsPage = new GameResultComponentsPage();
        expect(gameResultComponentsPage.getTitle()).toMatch(/fuzmonoApp.gameResult.home.title/);

    });

    it('should load create GameResult dialog', () => {
        gameResultComponentsPage.clickOnCreateButton();
        gameResultDialogPage = new GameResultDialogPage();
        expect(gameResultDialogPage.getModalTitle()).toMatch(/fuzmonoApp.gameResult.home.createOrEditLabel/);
        gameResultDialogPage.close();
    });

    it('should create and save GameResults', () => {
        gameResultComponentsPage.clickOnCreateButton();
        gameResultDialogPage.save();
        expect(gameResultDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class GameResultComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-game-result div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class GameResultDialogPage {
    modalTitle = element(by.css('h4#myGameResultLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
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
