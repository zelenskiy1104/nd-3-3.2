loadPhonebook();

// вытаскиваем данные из справочника и перерисовываем табличку
function loadPhonebook() {
    $.ajax({
        url: 'http://localhost:3000/list',

        // TODO: обработать ошибку

        success: function(data) {
            $('#container tbody').empty();

            data.forEach((item) => {
                let html = '<tr><td>'+item.lastname+'</td><td>'+item.firstname+'</td><td>'+item.phone+'</td><td>&nbsp;</td></tr>';
                $('#container tbody').append(html);
            });
        }
    });
}


$('#saveAddForm').click(() => {
    var add_lastname = $('#add_lastname').val();
    var add_firstname = $('#add_firstname').val();
    var add_phone = $('#add_phone').val();
    var data = [add_lastname, add_firstname, add_phone]

    $.ajax({
        url: 'http://localhost:3000/create',
        type: "POST",
        data: {firstname: add_firstname, lastname: add_lastname, phone: add_phone},
        success: function(data) {
            console.log('success');
        },
        // TODO: обработать ошибку
    });
});
