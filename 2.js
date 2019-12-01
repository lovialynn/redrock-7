let int = document.getElementsByClassName('inp')[0],
    but = document.getElementsByClassName('but')[0],
    table = document.getElementsByClassName("table")[0]

function ajax(options) {
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (options.type == "GET") {
        xhr.open(options.type, options.url + options.data, options.async);
        xhr.send()
    } else if (options.type == "POST") {
        xhr.open(options.type, options.url, options.type);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(options.data);
    }


    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = xhr.responseText;
                options.success(data);
            } else options.error()


        }


    }
}
but.addEventListener('click', () => ajax({
    url: 'https://api.github.com/search/repositories?q=',
    type: "GET",
    async: true,
    data: int.value,
    success: (data) =>  {
        data = JSON.parse(data)
        let head = "<tr>+<th width='5%'>ID</th>+<th width='30%'>node_id</th>+<th width='20%'>name</th></tr>";
        let sum = ""
        for (let i = 0; i < data.items.length; i++) {
            sum = sum + "<tr>" + "<td width='5%'>" + data.items[i].id + "</td>" + "<td width='30%'>" + data.items[i].node_id + "</td>" + "<td width='20%'>" + data.items[i].name + "</td>" + "</tr>";;
        }
        table.innerHTML = head + sum
    },
    error: () => {alert('失败')
    }
}))
