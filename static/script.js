function getReviews() {
    let xhhtp = new XMLHttpRequest();
    xhhtp.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            var reviews = JSON.parse(this.responseText);
            console.log(reviews);
            populate(reviews);
        }
    };
    xhhtp.open("GET", "http://localhost:3000/reviews");
    xhhtp.send();
}

function populate(data) {
    document.getElementById("main").innerHTML = '';
    for (var i = 0; i < data.length; i++) {
        const el = data[i];
        addNewReview(el.name, el.data, el.mesaj, i);
    }
}

function addNewReview(name,data,mesaj,i) {
    var tmp = document.getElementsByTagName("template")[0];
    var articleClone = tmp.content.cloneNode(true);

    var reviewName = articleClone.querySelector("#templateName");
    reviewName.textContent = name;

    var reviewDate = articleClone.querySelector("#templateDate");
    reviewDate.textContent = data;

    var reviewMessage = articleClone.querySelector("#templateMessage");
    reviewMessage.textContent = mesaj;

    var delB = articleClone.getElementById("deleteButton");
    delB.addEventListener("click", removeArticleWithParam(i));

    document.getElementById("main").appendChild(articleClone);
}

let removeArticleWithParam = function(index) {

    return function curried_func(e) {
        removeArticle(index);
    }
};

function removeArticle(index) {
    let toBeDeleted = document.getElementsByClassName("templateReview")[index];
    toBeDeleted.parentNode.removeChild(toBeDeleted);
}


function addReview() {
    var nameReview = document.getElementById("name").value;
    var dataReview = document.getElementById("data").value;
    var passwordReview = document.getElementById("parola").value;
    var messageReview = document.getElementById("mesaj").value;
    let xhhtp = new XMLHttpRequest();

    xhhtp.onreadystatechange = function () {
        if (this.readyState === 4)
            alert("Reqeust done" + this.status);
    };

    xhhtp.open("POST", "http://localhost:3000/reviews/add");

    xhhtp.setRequestHeader("Content-Type", "application/json");

    let json = {
        name: nameReview,
        data: dataReview,
        parola: passwordReview,
        mesaj: messageReview
    }
    var json_string = JSON.stringify(json);
    xhhtp.send(json_string);
}


function editReview() {
    var passwordReview = document.getElementById("putParola").value;
    var newMessage = document.getElementById("putMesaj").value;

    let xhhtp = new XMLHttpRequest();

    xhhtp.onreadystatechange = function () {
        if (this.readyState === 4)
            alert("Reqeust done" + this.status);
    };

    xhhtp.open("PUT", "http://localhost:3000/reviews/put" );

    xhhtp.setRequestHeader("Content-Type", "application/json");

    let json = {
        parola: passwordReview,
        mesaj: newMessage
    }

    var json_string = JSON.stringify(json);
    xhhtp.send(json_string);
}

function deleteReview() {
    var password = document.getElementById("delparola").value;

    let xhhtp = new XMLHttpRequest();

    xhhtp.onreadystatechange = function () {
        if (this.readyState === 4)
            alert("Reqeust done" + this.status);
    };

    xhhtp.open("DELETE", "http://localhost:3000/reviews/delete?parola=" + password);

    xhhtp.setRequestHeader("Content-Type", "application/json");


    xhhtp.send();
}

function deleteDiv() {
    var list = document.getElementById("templateReview");

}