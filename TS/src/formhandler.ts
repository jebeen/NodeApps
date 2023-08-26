let obj = [];

function displayOnlineUsers(userObj) {
    var data='<div class="user-section">';
    for (const key in userObj.results) {
        data+="<div class='card'>"
        for(const [j,k] of Object.entries(userObj.results[key])) {
            var value=k;
            if(typeof k === 'object') {
                value="";
                for(const [a,b] of Object.entries(k)) {
                    value+=b+" ";
                }
            }
            data += `<p class="para-info" >${j} : ${value} </p>`;
        }
        data+="</div>";
    }
    return data;
}

 export function init() {
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var obj=this.responseText;
        var obj1 = JSON.parse(obj);
        document.querySelector("#offline-user")!.innerHTML = displayOnlineUsers(obj1);
    }
};
xhttp.open("GET", "./src/users.json");
xhttp.send();
}

export function fetchdata() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var obj=this.responseText;
        var obj1 = JSON.parse(obj);
        document.querySelector("#online-user")!.innerHTML = displayOnlineUsers(obj1);
    }
};
xhttp.open("GET", "api_url");
xhttp.send();
}

export function handleForm(form: HTMLFormElement, div: HTMLDivElement) {
  form.onsubmit = () => {
  const formData: FormData = new FormData(form);

  let arr = {};
  let otherFormElements=['skills','gender'];
    for (const [p,q] of formData.entries()) {
        if(!otherFormElements.includes(p)) {
            arr[p]=q;
        } else {
            var checkboxes = document.querySelectorAll('input[name="skills"]:checked');
            var ele = document.querySelector('input[name="gender"]:checked');
            if(checkboxes && p == 'skills') {
                var values = [];
                for (var i = 0; i < checkboxes.length; i++) {
                 values.push(checkboxes[i].value);
                }
                arr[p]=values;
            }

            if(ele && p == 'gender') {
                arr[p]=ele.value;
            }
        }
    }

    obj.push(a);
    div.innerHTML += getData(obj);
    return false;
  };
}

function getData(obj) {
    let result='<div class="user-section">';
    for(var i in obj) {
        result+="<div class='card'>";
        for(var [j,k] of Object.entries(obj[i])) {
            result+= `<p class="para-info">${j} : ${k}</p>`;
        }
    }
    return result;
}
