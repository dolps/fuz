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
        expect(gameComponentsPage.getTitle()).toMatch(/Games/);

    });

    it('should load create Game dialog', () => {
        gameComponentsPage.clickOnCreateButton();
        gameDialogPage = new GameDialogPage();
        expect(gameDialogPage.getModalTitle()).toMatch(/Create or edit a Game/);
        gameDialogPage.close();
    });

    it('should create and save Games', () => {
        gameComponentsPage.clickOnCreateButton();
        gameDialogPage.setDescriptionInput('description');
        expect(gameDialogPage.getDescriptionInput()).toMatch('description');
        gameDialogPage.setDatePlayedInput(12310020012301);
        expect(gameDialogPage.getDatePlayedInput()).toMatch('2001-12-31T02:30');
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
        return this.title.getText();
    }
}

export class GameDialogPage {
    modalTitle = element(by.css('h4#myGameLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    descriptionInput = element(by.css('textarea#field_description'));
    datePlayedInput = element(by.css('input#field_datePlayed'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setDescriptionInput = function (description) {
        this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput = function () {
        return this.descriptionInput.getAttribute('value');
    }

    setDatePlayedInput = function (datePlayed) {
        this.datePlayedInput.sendKeys(datePlayed);
    }

    getDatePlayedInput = function () {
        return this.datePlayedInput.getAttribute('value');
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
