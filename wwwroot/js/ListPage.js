const minPlayers = 10;
let page = 1;

$(document).ready(() => {
    $("#Next").on("click", () => ButtonNext());
    $("#Back").on("click", () => ButtonBack());

    $("#teamInput").autocomplete({
        appendTo: "#modalBody",
        source: (request, response) => {           
            $.ajax({
                url: "/FootballPlayers/GetTeamName",
                type: "POST",
                dataType: "json",
                data: { Prefix: request.term }, 
                success: function (data) {
                    response(data);
                }

            })            
        },
        response: (e, ui) => {
            if (ui.content.length > 0) {
                $('#teamMessage').slideUp(300);
            }
            else {
                $('#teamMessage').slideDown(300);
            }
        },
        select: (e, ui) => {
            $('#teamMessage').slideUp(300);
        }
    });

    $("#submitEntry").on("click", () => {
        $("#mainForm").submit();
    });

    $("#mainForm").submit((e) => {
        e.preventDefault();
        if ($("#mainForm")[0].checkValidity() === false) {
            e.stopPropagation();
        } else {
            $.ajax({
                url: "/FootballPlayers/UpdatePlayer",
                type: "POST",
                dataType: "json",
                data: {
                    id: $("#changeId").val(),
                    firstName: $("#firstNameInput").val(),
                    lastName: $("#lastNameInput").val(),
                    sex: $("#sexInput").val(),
                    birthDate: $("#birthDateInput").val(),
                    country: $("#countryInput").val(),
                    team: $("#teamInput").val()

                },
                success: (data) => {
                    $("#resultMessage").show();
                    if (data[0] == "OK") {
                        $("#resultMessage").removeClass();
                        $("#resultMessage").addClass("text-success");
                        $("#resultMessage").text("Данные изменены.");
                        let d = $("#birthDateInput").val().split("-");
                        let parsed = d[2] + "." + d[1] + "." + d[0];
                        $("#editModal").modal("hide");
                        connection.invoke("UpdatePlayer",
                            data[1],
                            $("#firstNameInput").val(),
                            $("#lastNameInput").val(),
                            $("#sexInput").val(),
                            parsed,
                            $("#countryInput").val(),
                            $("#teamInput").val());
                    }
                    else {
                        $("#resultMessage").removeClass();
                        $("#resultMessage").addClass("text-danger");
                        $("#resultMessage").text("Произошла ошибка: " + data);
                    }
                }
            });
        }
        $("#mainForm").addClass('was-validated');
    });


    $("table").on("click", "#edit", function () {
        let data = $(this).data();
        $("#changeId").val(data["plid"]);
        let tableRow = $(this).parent().parent();
        let cells = tableRow.find("td");
        $("#firstNameInput").val(cells[0].textContent.split(" ")[0]);
        $("#lastNameInput").val(cells[0].textContent.split(" ")[1]);
        $("#lastNameInput").val(cells[0].textContent.split(" ")[1]);
        $("#sexInput").val(cells[1].textContent);

        let slicedDate = cells[2].textContent.split(".");
        let parsedDate = slicedDate[2] + "-" + (slicedDate[1]) + "-" + (slicedDate[0]);

        $("#birthDateInput").val(parsedDate);
        $("#sexInput").val((cells[1].textContent == "Мужчина") ? 0 : 1);

        $("#countryInput").val(cells[4].textContent);
        $("#teamInput").val(cells[3].textContent);
    });





});
function LoadPlayers(page, minPlayers) {
    $("#back").prop('disabled', true);
    $("#next").prop('disabled', true);
    $("#playersData").empty();    
    $.ajax({
        url: "/FootballPlayers/RequestPlayersPage",
        type: "POST",
        async: true,
        dataType: "json",
        data: {
            page: page,
            min: minPlayers
        },
        success: (data) => {
            $("#loading").hide();
            $("#Back").prop('disabled', false);
            $("#Next").prop('disabled', false);
            ParseData(data);
        }
    });
}

function ParseData(data) {
    let available = data["Available"];
    let result = data["Result"];
    for (let i = 0; i < result.length; i++) {

        let elementStr = "<tr data-plid=" + result[i]["id"] + ">\n\
            <td>"+ result[i]["firstName"] + " " + result[i]["lastName"] + " </td >\n\
            <td>"+ (result[i]["isMale"] ? "Мужчина" : "Женщина") + "</td>\n\
            <td>"+ new Date(result[i]["birthDate"]).toLocaleDateString() + "</td>\n\
            <td>"+ result[i]["team"]["name"] + "</td>\n\
            <td>"+ result[i]["country"]["name"] + "</td>\n\
            <td><button id='edit' class='btn btn-info' data-toggle='modal' data-target='#editModal' data-plid="+ result[i]["id"] + ">Изменить</button></td>\n\
        </tr >";
        let tableData = $("#playersData");
        $(elementStr).appendTo(tableData);
    }
    if (page == 1) {
        $("#Back").prop('disabled', true);
    }
    if ((page) * minPlayers >= available) {
        $("#Next").prop('disabled', true);
    }

}
function ButtonNext() {

    page++;
    LoadPlayers(page, minPlayers);
}

function ButtonBack() {
    page--;
    LoadPlayers(page, minPlayers);
}