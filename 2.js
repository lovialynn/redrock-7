let int = document.getElementsByClassName('inp')[0],
    but = document.getElementsByClassName('but')[0],
    table = document.getElementsByClassName("table")[0]

function ajax(options) {
    var xhr = null;
    var params = options.data;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (options.type == "GET") {
        xhr.open(options.type, options.url + options.data, options.async);
        xhr.send()
    } else if (options.type == "POST") {
        xhr.open(options.type, options.url,options.type);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(options.data);
    }
    let head = "<tr>+<th width='5%'>ID</th>+<th width='30%'>node_id</th>+<th width='20%'>name</th></tr>";
    let sum = ""

    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const json = JSON.parse(xhr.responseText)

                for (let i = 0; i < json.items.length; i++) {
                    sum = sum + "<tr>" + "<td width='5%'>" + json.items[i].id + "</td>" + "<td width='30%'>" + json.items[i].node_id + "</td>" + "<td width='20%'>" + json.items[i].name + "</td>" + "</tr>";
                }
                table.innerHTML = head + sum
               
            }
            

        }
    }
   
}
but.addEventListener('click', () => ajax({
    url: 'https://api.github.com/search/repositories?q=',
    type: "GET",
    async: true,
    data: int.value,
    success: function (data) {
        console.log(data);
    }

}))