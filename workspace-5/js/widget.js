$(document).ready(() => {
    $.getJSON('data/employees.json', (response) => {
        var statusHtml = '<ul class="bulleted">';
        $.each(response, (index, employee) => {
            statusHtml += employee.inoffice ? '<li class="in">' : '<li class="out">';
            statusHtml += employee.name + '</li>';
        });
        statusHtml += '</ul>';
        $('#employeeList').html(statusHtml);
    }); // response must be in the form of json otherwise it won't work. it will also fail silently

    $.getJSON('data/rooms.json', (response) => {
        console.log('in rooms function');
        var roomHtml = '<ul class="rooms">';
        $.each(response, (index, room) => {
            roomHtml += room.available ? '<li class="empty">' : '<li class="full">';
            roomHtml += room.room + '</li>';
        });
        roomHtml += '</ul>';
        console.log(roomHtml);
        $('#roomList').html(roomHtml);
    });
}); // waits for all the html to load before executing js