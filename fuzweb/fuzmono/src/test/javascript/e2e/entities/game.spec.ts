import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Game e2e test', () => {

    let navBarPage: NavBarPage;
    let gameDialogPage: GameDialogPage;
    let gameComponentsPage: GameComponentsPage;

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
        expect(gameComponentsPage.getTitle()).toMatch(/fuzmonoApp.game.home.title/);

    });

    it('should load create Game dialog', () => {
        gameComponentsPage.clickOnCreateButton();
        gameDialogPage = new GameDialogPage();
        expect(gameDialogPage.getModalTitle()).toMatch(/fuzmonoApp.game.home.createOrEditLabel/);
        gameDialogPage.close();
    });

    it('should create and save Games', () => {
        gameComponentsPage.clickOnCreateButton();
        gameDialogPage.gameResultSelectLastOption();
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
    gameResultSelect = element(by.css('select#field_gameResult'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    gameResultSelectLastOption = function() {
        this.gameResultSelect.all(by.tagName('option')).last().click();
    }

    gameResultSelectOption = function(option) {
        this.gameResultSelect.sendKeys(option);
    }

    getGameResultSelect = function() {
        return this.gameResultSelect;
    }

    getGameResultSelectedOption = function() {
        return this.gameResultSelect.element(by.css('option:checked')).getText();
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
