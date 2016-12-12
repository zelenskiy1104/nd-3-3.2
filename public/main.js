loadPhonebook();

// вытаскиваем данные из справочника и перерисовываем табличку
function loadPhonebook() {
    $.ajax({
        url: 'http://localhost:3000/list',

        // TODO: обработать ошибку

        success: function(data) {
            $('#container tbody').empty();

            data.forEach((item) => {
                var editor = '<a data-id="'+item._id+'" class="btn btn-xs btn-warning btn-editor">Редактировать</a>';
                var deleter = '<a data-id="'+item._id+'" class="btn btn-xs btn-danger btn-deleter">Удалить</a>';
                var html = '<tr><td>'+item.lastname+'</td><td>'+item.firstname+'</td><td>'+item.phone+'</td><td>'+editor+'&nbsp;'+deleter+'</td></tr>';
                $('#container tbody').append(html);
            });
        }
    });
}

$('#searchButton').click(() => {
    search();
});

$(window).keydown(function (event) {
    if (event.which === 13) {
        search();
    }
});

function search() {
    var string = cleanInput($('#search_string').val()).trim();

    $.ajax({
        url: 'http://localhost:3000/search',
        type: "POST",
        data: {string: string},
        success: function(data) {
            $("#successAlert").empty().append('<p>Найдено записей: '+data.length+'</p>');
            data.forEach((item) => {
                $("#successAlert").append(`<p>${item.lastname} ${item.firstname} ${item.phone}</p>`);
            });
            $("#successAlert").show();
        },
        // TODO: обработать ошибку
    });
}

function cleanInput (input) {
    return $('<div/>').text(input).text();
}

$('#saveAddForm').click(() => {
    var add_lastname = $('#add_lastname').val();
    var add_firstname = $('#add_firstname').val();
    var add_phone = $('#add_phone').val();

    $.ajax({
        url: 'http://localhost:3000/create',
        type: "POST",
        data: {firstname: add_firstname, lastname: add_lastname, phone: add_phone},
        success: function(data) {
            $("#addEntryButton").click();
            $("#successAlert").empty().append('Запись успешно добавлена!');
            $("#successAlert").show();
            loadPhonebook();
        },
        // TODO: обработать ошибку
    });
});

$('#saveUpdateForm').click(() => {

    var update_id = $('#recordId').val();
    var update_lastname = $('#update_lastname').val();
    var update_firstname = $('#update_firstname').val();
    var update_phone = $('#update_phone').val();

    $.ajax({
        url: 'http://localhost:3000/'+update_id+'/update',
        type: "POST",
        data: {id: update_id, firstname: update_firstname, lastname: update_lastname, phone: update_phone},
        success: function(data) {
            $("#updateEntryButton").click();
            $("#successAlert").empty().append('Запись успешно отредактирована!');
            $("#successAlert").show();
            loadPhonebook();
        },
        // TODO: обработать ошибку
    });
});

$(document).on("click", '.btn-deleter', function(event) {
    var id = $(this).data('id');

    $.ajax({
        url: 'http://localhost:3000/'+id+'/delete',
        type: "DELETE",
        success: function(data) {
            $("#successAlert").empty().append('Запись успешно удалена!');
            $("#successAlert").show();
            loadPhonebook();
        },
        // TODO: обработать ошибку
    });
});

$(document).on("click", '.btn-editor', function(event) {
    var id = $(this).data('id');

    $.ajax({
        url: 'http://localhost:3000/'+id,
        type: "GET",
        success: function(data) {
            $("#updateEntryButton").click();
            $("#update_lastname").val(data.lastname);
            $("#update_firstname").val(data.firstname);
            $("#update_phone").val(data.phone);
            $("#recordId").val(data._id);
        },
        // TODO: обработать ошибку
    });
});
