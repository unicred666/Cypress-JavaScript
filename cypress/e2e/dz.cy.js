describe('Login Tests', () => {
    const login = 'german@dolnikov.ru';
    const password = 'iLoveqastudio1';

    it('Верный пароль и верный логин', () => {
        cy.visit('https://login.qa.studio'); // Посещаем страницу авторизации
        cy.get('#mail').type(login.toLowerCase()); // Вводим валидный логин
        cy.get('#pass').type(password); // Вводим валидный пароль
        cy.get('#loginButton').click(); // Нажимаем кнопку "Войти"
        cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Проверяем наличие нужного текста, который отображается после успешной авторизации
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Проверить нужный текст и наличие кнопки крестик
    });

    it(' Восстановления пароля', () => {
        cy.visit('https://login.qa.studio'); // Посещаем страницу авторизации
        cy.get('#forgotEmailButton').click(); // Нажимаем кнопку "Забили пароль"
        cy.get('#mailForgot').type('german@dolniko.ru'); // Вводим валидный логин
        cy.get('#restoreEmailButton').click(); // Нажимаем кнопку "Отправить код"
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); // Успешно отправили пароль на e-mail
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Проверить нужный текст и наличие кнопки крестик
    });

    it('Негативный кейс авторизации:', () => {
        cy.visit('https://login.qa.studio'); // Посещаем страницу авторизации
        cy.get('#mail').type(login.toLowerCase()); // Вводим валидный логин
        cy.get('#pass').type('iLoveqastudio2'); // Вводим не валидный пароль
        cy.get('#loginButton').click(); // Нажимаем кнопку "Войти"
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверить нужный текст "Такого логина или пароля нет"
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');  // Проверить нужный текст и наличие кнопки крестик
    });

    it('Негативный кейс авторизации2:', () => {
        cy.visit('https://login.qa.studio'); // Посещаем страницу авторизации
        cy.get('#mail').type('nogerman@dolnikov.ru'); // Вводим не валидный логин
        cy.get('#pass').type(password); // Вводим валидный пароль
        cy.get('#loginButton').click(); // Нажимаем кнопку "Войти"
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверить нужный текст "Такого логина или пароля нет"
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');  // Проверить нужный текст и наличие кнопки крестик
    });

    it('Негативный кейс валидации без @', () => {
        cy.visit('https://login.qa.studio'); // Посещаем страницу авторизации
        cy.get('#mail').type('germandolnikov.ru'); // Вводим не валидный логин
        cy.get('#pass').type(password); // Вводим валидный пароль 
        cy.get('#loginButton').click(); // Нажимаем кнопку "Войти"
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); // "Нужно исправить проблему валидации"
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Проверить нужный текст и наличие кнопки крестик
    });

    it('Приведение к строчным буквам в логине', () => {
        cy.visit('https://login.qa.studio'); // Посещаем страницу авторизации
        cy.get('#mail').type('GerMan@Dolnikov.ru'); // Вводим не валидный логин
        cy.get('#pass').type(password); // Вводим валидный пароль 
        cy.get('#loginButton').click(); // Нажимаем кнопку "Войти"
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверить нужный текст "Такого логина или пароля нет"
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    });
    
    it('Негативный кейс авторизации логина с пробелом', () => {
        cy.visit('https://login.qa.studio'); // Посещаем страницу авторизации
        cy.get('#mail').type('   german@dolnikov.ru    '); // Вводим логин с пробелом
        cy.get('#pass').type(password); // Вводим валидный пароль 
        cy.get('#loginButton').click();  // Нажимаем кнопку "Войти"
        cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Проверяем наличие нужного текста, который отображается после успешной авторизации
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Проверить нужный текст и наличие кнопки крестик
    });

    it('Негативный кейс авторизации пароля < 8 символов', () => {
        cy.visit('https://login.qa.studio'); // Посещаем страницу авторизации
        cy.get('#mail').type(login.toLowerCase()); // Вводим валидный логин
        cy.get('#pass').type('12345'); // Вводим не валидный пароль 
        cy.get('#loginButton').click();  // Нажимаем кнопку "Войти"
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверить нужный текст "Такого логина или пароля нет"
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Проверить нужный текст и наличие кнопки крестик
    });

    it('Негативный кейс авторизации логина без .ru', () => {
        cy.visit('https://login.qa.studio'); // Посещаем страницу авторизации
        cy.get('#mail').type('german@dolnikov'); // Вводим не валидный логин
        cy.get('#pass').type(password); // Вводим валидный пароль 
        cy.get('#loginButton').click(); // Нажимаем кнопку "Войти"
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); // "Нужно исправить проблему валидации"
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Проверить нужный текст и наличие кнопки крестик
    });
});