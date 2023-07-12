document.getElementById("question-form").addEventListener("submit", function (event) {
    event.preventDefault();

    var questionCount = parseInt(document.getElementById("question-count").value);
    var answerCount = parseInt(document.getElementById("answer-count").value);

    generateMap(questionCount, answerCount);

    document.getElementById("print-button").disabled = false;
    document.getElementById("download-button").disabled = false;
});

document.getElementById("print-button").addEventListener("click", function () {
    var mapContainer = document.getElementById("map-container");

    html2pdf().from(mapContainer).save();
});

function generateMap(questionCount, answerCount) {
    var mapContainer = document.getElementById("map-container");
    mapContainer.innerHTML = "";

    var columnSize = 10; // Número de linhas em cada coluna

    for (var i = 1; i <= questionCount; i++) {
        if ((i - 1) % columnSize === 0) {
            var columnDiv = document.createElement("div");
            columnDiv.classList.add("col-3");
            mapContainer.appendChild(columnDiv);
        }

        var questionDiv = document.createElement("div");

        for (var j = 1; j <= answerCount; j++) {
            var radioInput = document.createElement("input");
            radioInput.type = "radio";
            radioInput.name = "question-" + i;
            radioInput.value = "answer-" + j;
            radioInput.addEventListener("click", function () {
                var selectedRadios = document.querySelectorAll('input[name="' + this.name + '"]:checked');
                for (var k = 0; k < selectedRadios.length; k++) {
                    selectedRadios[k].parentElement.classList.add("selected");
                }
            });

            var circleLabel = document.createElement("label");
            circleLabel.classList.add("circle");
            circleLabel.appendChild(radioInput);

            questionDiv.appendChild(circleLabel);
        }

        var currentColumn = Math.ceil(i / columnSize) - 1;
        var columns = document.getElementsByClassName("col-3");
        columns[currentColumn].appendChild(questionDiv);
    }
}

document.getElementById("download-button").addEventListener("click", function () {
    var questionForm = document.getElementById("map-container");

    html2canvas(questionForm).then(function (canvas) {
        var link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "question_form.png";
        link.click();
    });
});