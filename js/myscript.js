//Запись в localStorage
function saveCar(car) {
    var info = JSON.stringify(car);
    var newId = +getLastId() + 1;
    localStorage.setItem(newId, info);
    localStorage.setItem("LastCarId", newId);
}

//Чтение из localStorage
function loadCar(id) {
    var car = JSON.parse(localStorage.getItem(id));
    return car;
}

function getLastId() {
    if (localStorage.getItem("LastCarId") === null) localStorage.setItem("LastCarId", 0);
    return localStorage.getItem("LastCarId");
}

//Создание объекта автомобиля
function getCar() {

    var car = {};
    car.id = +getLastId() + 1;
    car.company = document.getElementById("company").value;
    car.title = document.getElementById("title").value;
    car.year = document.getElementById("year").value;
    car.country = document.getElementById("country").value;
    var type = document.getElementById("type");
    car.type = type.options[type.selectedIndex].text;
    var bodyStyle = document.getElementById("body-style");
    car.bodyStyle = bodyStyle.options[bodyStyle.selectedIndex].text;
    car.engine = document.getElementById("engine").value;
    car.transmission = document.getElementById("transmission").value;
    car.wheelbase = document.getElementById("wheelbase").value;
    car.length = document.getElementById("length").value;
    car.width = document.getElementById("width").value;
    car.height = document.getElementById("height").value;
    car.description = document.getElementById("description").value;

    var file = document.getElementById("picture").files[0].name;

    car.picture = "img/cars/" + file;
    saveCar(car);
    
    alert("Автомобиль добавлен!");
}

//Удаление автомобиля из localStorage
function deleteCar() {
    var e = document.getElementById("car-list");
    var id = e.options[e.selectedIndex].value;
    localStorage.removeItem(id);
    alert("Автомобиль удален!");
}

//Создание блоков с краткой информацией о автомобиле
function getHtmlCarBlocks(count) {

    var html = [];
    html.push('<div class=\"row text-center\"> ');

    for (var i = 0; i < count; i++) {

        var car = null;
        
        while (car === null) {
            onDisplay++;
            car = loadCar(onDisplay);
        }

        html.push('<div id=\"');
        html.push(car.id);
        html.push('\" class=\"col-md-4 col-sm-4 car-block\">\n<img src=\"');
        html.push(car.picture);
        html.push('\" class=\"img-responsive img-car center-block \" alt=\"\">\n <div>\n<h4 class=\"brief-title\">');
        html.push(car.company);
        html.push(' ');
        html.push(car.title);
        html.push('<\/h4> \n <div class=\"brief-text\">');
        html.push(car.country);
        html.push(', ');
        html.push(car.year);
        html.push('<\/div>\n<div class=\"brief-text\">');
        html.push('Класс: ');
        html.push(car.type);
        html.push('<\/div>\n  <a href=\"infoAboutCar.html?id=');
        html.push(car.id);
        html.push('\" class=\"btn btn-success center-block button-details\">Подробнее<\/a> \n <\/div>\n<\/div>');

    }
    html.push('<\/div>');
    return html.join("");
}

function getNextRow() {

    if (thisWork == 1) {
        thisWork = 0;
        if (leftRows > 0) {

            var count = 0;
            if (leftRows >= 3) count = 3;
            else count = leftRows;

            var data = getHtmlCarBlocks(count);

            $("#LoadDiv").html($("#LoadDiv").html() + " " + data);

            leftRows -= count;

            thisPageNum = thisPageNum + 1;
            thisWork = 1;

        }

    }
}

//Вывод сообщения об отсутствии автомобилей в localStorage
function printNoElements() {
    var data = '<h3 class="warning-label text-center"> <span class=\"label label-success\">Записей нет!<\/span> <\/h3>';
    $("#LoadDiv").html($("#LoadDiv").html() + " " + data);
}

var thisPageNum = 1;
var thisWork = 1;
var leftRows = localStorage.length - 1;
var onDisplay = 0;

$(document).ready(function () {

    var scrH = $(window).height();
    var scrHP = $("#container").height();

    if (localStorage.length === 0) {
        printNoElements();
    } else {
        for (var i = 0; i < 2; i++) {
            getNextRow();
        }
    }

    // Проверка состояния прокрутки
    $(window).scroll(function () {
        var scro = $(this).scrollTop();
        var scrHP = $("#container").height();
        var scrH2 = 0;
        scrH2 = scrH + scro;
        var leftH = scrHP - scrH2;

        if (leftH < 300) {
            getNextRow();
        }
    });
});