describe('Login Tests', () => {
    const login = 'USER_LOGIN';
    const password = 'USER_PASSWORD';


    it('Верный пароль и верный логин', () => {
        cy.visit('https://pokemonbattle.ru/login'); // Посещаем страницу авторизации
        cy.get(':nth-child(1) > .auth__input').type(login.toLowerCase()); // Вводим валидный логин
        cy.get('#password').type(password); // Вводим валидный пароль
        cy.get('.auth__button').click(); // Нажимаем кнопку "Войти"
        cy.get('.header__btns > :nth-child(4)').click(); // Нажимаем кнопку "Магазин"
        cy.get('.available > button').first().click(); // Выбираем аватар и нажимаем кнопку "Купить"
        cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type('4111111111111111'); // Вводим №карты
        cy.get(':nth-child(1) > .pay_base-input-v2').type('10/25'); // Вводим срок действия карты
        cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type('125'); // Вводим CVV код
        cy.get('.pay__input-box-last-of > .pay_base-input-v2').type('german dolnikov'); // Вводим ФИО
        cy.get('.pay-btn').click(); // Нажимаем кнопку "Отправить"
        cy.get('#cardnumber').type('56456'); // Вводим код из смс
        cy.get('.payment__submit-button').click(); // // Нажимаем кнопку "Отправить"
        cy.get('.payment__font-for-success').contains('Покупка прошла успешно'); // Проверяем наличие нужного текста, который отображается после успешной покупки
    });
});