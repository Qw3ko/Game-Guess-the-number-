const numbers_1_19 = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять', 
                        'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 
                        'восемнадцать', 'девятнадцать'];

const numbers_20_90 = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят',  
                        'восемьдесят', 'девяносто'];

const numbers_100_900 = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот',  
                        'семьсот', 'восемьсот', 'девятьсот'];

let minValue = parseInt(prompt('Минимальное знание числа для игры', '0'));
let maxValue = parseInt(prompt('Максимальное знание числа для игры', '100'));

minValue = minValue || 0;
maxValue = maxValue || 100

minValue = (minValue < -999) ? -999 : minValue;

maxValue = (maxValue > 999) ? 999 : maxValue;

alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);

let answerNumber = Math.floor((minValue + maxValue) / 2);
let orderNumber = 1;
let gameRun = true;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

function numberToText() {
    const maxLen = 20;
    let absoluteNumber = Math.abs(answerNumber);
    if (absoluteNumber < 20) {
        textOfNumber = numbers_1_19[absoluteNumber];
        }
        else if (absoluteNumber < 100) {
            let remainder = absoluteNumber%10;
            absoluteNumber = parseInt(absoluteNumber/10);
            textOfNumber = numbers_20_90[absoluteNumber] + " " + numbers_1_19[remainder];
            }
            else if (absoluteNumber < 1000) {
                remainder = absoluteNumber%100;
                if(remainder < 20) {
                    absoluteNumber = parseInt(absoluteNumber/100);
                    textOfNumber = numbers_100_900[absoluteNumber] + " " + numbers_1_19[remainder];
                }
                else {
                    let remainder2 = remainder%10;
                    remainder = parseInt(remainder/10);
                    absoluteNumber = parseInt(absoluteNumber/100);
                    textOfNumber = numbers_100_900[absoluteNumber] + " " + numbers_20_90[remainder] + " " + numbers_1_19[remainder2];
                }
        }
    if (answerNumber < 0) {
        textOfNumber = 'минус ' + textOfNumber;
    }
    if (textOfNumber.length > maxLen) {
        textOfNumber = answerNumber;
    }
    
    return textOfNumber;
}

numberToText();

orderNumberField.innerText = orderNumber;
answerField.innerText = `Вы загадали число ${textOfNumber }?`;

document.getElementById('btnRetry').addEventListener('click', function () {
    window.location.reload();
})

document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun) {
        if (minValue === maxValue) {
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F610}` :
                `Я сдаюсь..\n\u{1F62A}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            numberToText();
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            let phraseRandom1 = Math.round( Math.random()*2);
            switch (phraseRandom1){
                case 0:
                    answerField.innerText = `Вы загадали число ${textOfNumber }?`; 
                    break;
                case 1:
                    answerField.innerText = `Наверное, это число ${textOfNumber }?`;
                    break;
                case 2:
                    answerField.innerText = `Да это легко! Ты загадал ${textOfNumber }?`;
                    break;
            }
        }
    }
})

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun) {
        if (minValue === maxValue) {
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber  - 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            numberToText();
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            let phraseRandom2 = Math.round( Math.random()*2);
            switch (phraseRandom2){
                case 0:
                    answerField.innerText = `Может быть ${textOfNumber }?`; 
                    break;
                case 1:
                    answerField.innerText = `Нет сомнений, это ${textOfNumber }!`;
                    break;
                case 2:
                    answerField.innerText = `Точно, ${textOfNumber }!`;
                    break;
            }
        }
    }
})

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        let phraseRandom3 = Math.round( Math.random()*3);
        switch (phraseRandom3){
            case 0:
                answerField.innerText = `` ; 
                break;
            case 1:
                answerField.innerText = `Я всегда угадываю\n\u{1F60E}`;
                break;
            case 2:
                answerField.innerText = `Это было легко\n\u{1F60C}`;
                break;
            case 3:
                answerField.innerText = `Я мощь цифр\n\u{1F633}`;
                break;
        }
        document.body.style.backgroundImage = 'url(img/win.gif)'
        gameRun = false;
    }
})