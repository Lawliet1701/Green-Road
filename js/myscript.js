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
    car.company = $("#company").val();
    car.title = $("#title").val();
    car.year = $("#year").val();
    car.country = $("#country").val();
    car.type = $("#type :selected").text();
    car.bodyStyle = $("#type :selected").text();
    car.engine = $("#engine").val();
    car.transmission = $("#transmission").val();
    car.wheelbase = $("#wheelbase").val();
    car.length = $("#length").val();
    car.width = $("#width").val();
    car.height = $("#height").val();
    car.description = $("#description").val();
    car.picture = "img/cars/" + $('#upload-file-info').text();;
    saveCar(car);

    showPopupMessage();

}

//Удаление автомобиля из localStorage
function deleteCar() {
    var id = $("#car-list :selected").val();
    localStorage.removeItem(id);
    showPopupMessage();
}

function showPopupMessage() {
    $("#popup_add").show();
    $(".overlay").show();
}

function hidePopupMessage() {
    $('.popup .close-button, .overlay').click(function () {
        $('.overlay, .popup').hide();
        window.location.href = window.location.href;
    });
}

//Создание блоков с краткой информацией о автомобиле
function getHtmlCarBlocks(count) {

    var data = [];
    data.push('<div class=\"row text-center\"> ');

    for (var i = 0; i < count; i++) {

        var car = null;
        
        while (car === null) {
            onDisplay++;
            car = loadCar(onDisplay);
        }

        data.push('<div id=\"');
        data.push(car.id);
        data.push('\" class=\"col-md-4 col-sm-4 car-block\">\n<img src=\"');
        data.push(car.picture);
        data.push('\" class=\"img-responsive img-car center-block \" alt=\"\">\n <div>\n<h4 class=\"brief-title\">');
        data.push(car.company);
        data.push(' ');
        data.push(car.title);
        data.push('<\/h4> \n <div class=\"brief-text\">');
        data.push(car.country);
        data.push(', ');
        data.push(car.year);
        data.push('<\/div>\n<div class=\"brief-text\">');
        data.push('Класс: ');
        data.push(car.type);
        data.push('<\/div>\n  <a href=\"infoAboutCar.html?id=');
        data.push(car.id);
        data.push('\" class=\"btn btn-success center-block button-details\">Подробнее<\/a> \n <\/div>\n<\/div>');

    }
    data.push('<\/div>');
    return data.join("");
}

function getNextRow() {

    if (thisWork == 1) {
        thisWork = 0;
        if (leftRows > 0) {

            var count = 0;
            if (leftRows >= 3) count = 3;
            else count = leftRows;

            var data = getHtmlCarBlocks(count);

            $("#LoadDiv").append(" " + data);

            leftRows -= count;

            thisPageNum = thisPageNum + 1;
            thisWork = 1;
        }
    }
}

//Вывод сообщения об отсутствии автомобилей в localStorage
function printNoElements() {
    var data = '<h3 class="warning-label text-center"> <span class=\"label label-success\">Записей нет! Добавьте новый автомобиль!<\/span> <\/h3>';
    $("#LoadDiv").append(" " + data);
}

//Получение id автомобиля из адресной строки
function getParam(paramName) {

    var params = location.search.substring(1).split("&");

    for (var i = 0; i < params.length; i++) {
        if (params[i].split("=").length > 1) result = params[i].split("=")[1];
        return result;
    }
    return "";
}

var thisPageNum = 1;
var thisWork = 1;
var leftRows = localStorage.length - 1;
var onDisplay = 0;

$(document).ready(function () {

    var currentFullPath = window.location.pathname.split('/');
    var currentPage = currentFullPath[currentFullPath.length - 1];

    if (currentPage === "index.html") {
        var scrH = $(window).height();
        var scrHP = $("#container").height();

        if (localStorage.length === 1) {
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
    } else if (currentPage === "infoAboutCar.html") {

        var id = getParam("id");
        var car = loadCar(id);

        $(".title").append(" " + car.company + " " + car.title);
        $("#info-country").append(" " + car.country);
        $("#info-year").append(" " + car.year);
        $("#info-type").append(" " + car.type);
        $("#info-body-style").append(" " + car.bodyStyle);
        $("#info-engine").append(" " + car.engine);
        $("#info-transmission").append(" " + car.transmission);
        $("#info-wheelbase").append(" " + car.wheelbase + " мм");
        $("#info-length").append(" " + car.length + " мм");
        $("#info-width").append(" " + car.width + " мм");
        $("#info-height").append(" " + car.height + " мм");
        $("#info-description").append(" " + car.description);
        $("#info-picture").append(" " + '<img src=\"' + car.picture + '\" class=\"img-responsive img-thumbnail\" alt=\"\">');
    } else if (currentPage === "deleteCarForm.html") {

        var length = localStorage.length - 1;
        var option = '<option value=""></option>';
        $("#car-list").append(option);
        $(".subm-button").addClass("subm-button-disabled");

        //Выборка всех автомобилей из localStorage 
        for (var i in localStorage) {
            if (i !== "LastCarId") {
                var car = loadCar(i);
                var option = '<option value="' + car.id + '">' + car.company + ' ' + car.title + '</option>';
                $("#car-list").append(option);
            }
        }
    } else if (currentPage === "addCarForm.html") {
        hidePopupMessage();
    }

});

// Отображение выбранного элемента списка при удалении автомобиля
function changeSelectedCarHandler(event) {

    var option = $("#car-list :selected").text();
    if (option !== "") {
        $('.subm-button').removeClass("subm-button-disabled");
        $("#selected-car").append(" " + option);
    } else {
        $('.subm-button').addClass("subm-button-disabled");
    }

    hidePopupMessage();
}