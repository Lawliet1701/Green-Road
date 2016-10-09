(function ($) {

    $(function () {

        $('.rf').each(function () {

            var form = $(this),
                btn = form.find('.btn-success');

            form.find('.rfield').addClass('empty_field');
            form.find('.numfield').addClass('nan_field');
            form.find('.yearfield').addClass('nyear_field');

            // Функция проверки полей формы
            function checkInput() {
                form.find('.rfield').each(function () {
                    if ($(this).val() != '') {
                        // Если поле не пустое - удаляем класс-указание
                        $(this).removeClass('empty_field invalid-input');
                        $(this).addClass('valid-input');
                    } else {
                        // Если поле пустое - добавляем класс-указание
                        $(this).removeClass('valid-input');
                        $(this).addClass('empty_field invalid-input');
                    }
                });

                form.find('.numfield').each(function () {
                    var num = $(this).val();
                    if (isNumeric(num) & num > 0) {
                        // Если значение - положительное число - удаляем класс-указание
                        $(this).removeClass('nan_field invalid-input');
                        $(this).addClass('valid-input');
                    } else {
                        // Если значение - не положительное число - добавляем класс-указание
                        $(this).removeClass('valid-input');
                        $(this).addClass('nan_field invalid-input');
                    }
                });

                form.find('.yearfield').each(function () {
                    var year = $(this).val();
                    if (isNumeric(year) && year >= 1800 && year <= 2020) {
                        // Если значение в указанных пределах - удаляем класс-указание
                        $(this).removeClass('nyear_field invalid-input');
                        $(this).addClass('valid-input');
                    } else {
                        // Если значение вне указанных пределов - добавляем класс-указание
                        $(this).removeClass('valid-input');
                        $(this).addClass('nyear_field invalid-input');
                    }
                });
            }

            //Функция проверки на число
            function isNumeric(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            }

            // Проверка в режиме реального времени
            setInterval(function () {
                checkInput();
                // Считаем к-во неправильно заполненных полей
                var sizeEmpty = form.find('.empty_field').size();
                var sizeNan = form.find('.nan_field').size();
                var sizeNyear = form.find('.year_field').size();
                // Меняем доступность кнопки
                if ((+sizeEmpty + sizeNan + sizeNyear) > 0) {
                    if (btn.hasClass('disabled')) {
                        return false
                    } else {
                        btn.addClass('disabled')
                    }
                } else {
                    btn.removeClass('disabled')
                }
            }, 500);

        });
    });

})(jQuery);