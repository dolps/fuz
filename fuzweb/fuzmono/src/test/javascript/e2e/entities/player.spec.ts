import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Player e2e test', () => {

    let navBarPage: NavBarPage;
    let playerDialogPage: PlayerDialogPage;
    let playerComponentsPage: PlayerComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Players', () => {
        navBarPage.goToEntity('player');
        playerComponentsPage = new PlayerComponentsPage();
        expect(playerComponentsPage.getTitle()).toMatch(/fuzmonoApp.player.home.title/);

    });

    it('should load create Player dialog', () => {
        playerComponentsPage.clickOnCreateButton();
        playerDialogPage = new PlayerDialogPage();
        expect(playerDialogPage.getModalTitle()).toMatch(/fuzmonoApp.player.home.createOrEditLabel/);
        playerDialogPage.close();
    });

    it('should create and save Players', () => {
        playerComponentsPage.clickOnCreateButton();
        playerDialogPage.setNickNameInput('nickName');
        expect(playerDialogPage.getNickNameInput()).toMatch('nickName');
        playerDialogPage.setFirstNameInput('firstName');
        expect(playerDialogPage.getFirstNameInput()).toMatch('firstName');
        playerDialogPage.setLastNameInput('lastName');
        expect(playerDialogPage.getLastNameInput()).toMatch('lastName');
        playerDialogPage.setGamesWonInput('5');
        expect(playerDialogPage.getGamesWonInput()).toMatch('5');
        playerDialogPage.setGamesLostInput('5');
        expect(playerDialogPage.getGamesLostInput()).toMatch('5');
        playerDialogPage.save();
        expect(playerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PlayerComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-player div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PlayerDialogPage {
    modalTitle = element(by.css('h4#myPlayerLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nickNameInput = element(by.css('input#field_nickName'));
    firstNameInput = element(by.css('input#field_firstName'));
    lastNameInput = element(by.css('input#field_lastName'));
    gamesWonInput = element(by.css('input#field_gamesWon'));
    gamesLostInput = element(by.css('input#field_gamesLost'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNickNameInput = function(nickName) {
        this.nickNameInput.sendKeys(nickName);
    }

    getNickNameInput = function() {
        return this.nickNameInput.getAttribute('value');
    }

    setFirstNameInput = function(firstName) {
        this.firstNameInput.sendKeys(firstName);
    }

    getFirstNameInput = function() {
        return this.firstNameInput.getAttribute('value');
    }

    setLastNameInput = function(lastName) {
        this.lastNameInput.sendKeys(lastName);
    }

    getLastNameInput = function() {
        return this.lastNameInput.getAttribute('value');
    }

    setGamesWonInput = function(gamesWon) {
        this.gamesWonInput.sendKeys(gamesWon);
    }

    getGamesWonInput = function() {
        return this.gamesWonInput.getAttribute('value');
    }

    setGamesLostInput = function(gamesLost) {
        this.gamesLostInput.sendKeys(gamesLost);
    }

    getGamesLostInput = function() {
        return this.gamesLostInput.getAttribute('value');
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
