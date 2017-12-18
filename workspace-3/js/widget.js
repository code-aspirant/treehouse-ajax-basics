var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if(xhr.readyState === 4 && xhr.status === 200) {
    var employees = JSON.parse(xhr.responseText);
    var statusHTML = '<ul class="bulleted">';
    for (var i=0; i<employees.length; i += 1) {
      if (employees[i].inoffice === true) {
        statusHTML += '<li class="in">';
      } else {
        statusHTML += '<li class="out">';
      }
      statusHTML += employees[i].name;
      statusHTML += '</li>';
    }
    statusHTML += '</ul>';
    document.getElementById('employeeList').innerHTML = statusHTML;
  }
};
xhr.open('GET', 'data/employees.json', true);
xhr.send();

var xhrRooms = new XMLHttpRequest();
xhrRooms.onreadystatechange = () => {
  if (xhrRooms.readyState === 4 && xhrRooms.status === 200) {
    var rooms = JSON.parse(xhrRooms.responseText);
    var roomHtml = '<ul class="rooms">';

    rooms.forEach(room => {
      if (room.available) {
        roomHtml += '<li class="empty">';
      } else {
        roomHtml += '<li class="full">';
      }
      roomHtml += room.room;
      roomHtml += '</li>';
    });
    roomHtml += '</ul>';
    document.getElementById('roomList').innerHTML = roomHtml;
  }
};
xhrRooms.open('GET', 'data/rooms.json', true);
xhrRooms.send();