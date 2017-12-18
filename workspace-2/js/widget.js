var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var employees = JSON.parse(xhr.responseText);
        var statusHtml = '<ul class="bulleted">';
        for (var i in employees) {
            if (employees[i].inoffice === true) {
                statusHtml += '<li class="in">';
            } else {
                statusHtml += '<li class="out">';
            }
            statusHtml += employees[i].name;
            statusHtml += '</li>'
        }
        statusHtml += '</ul>';
        document.getElementById('employeeList').innerHTML = statusHtml;
    }
};
xhr.open('GET', 'data/employees.json'); // Usually would hit a REST endpoint to get this data
xhr.send();