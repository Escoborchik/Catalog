$(document).ready(() => {
    $('#teamMessage').hide();

    $("#teamInput").autocomplete({
        source: function (request, response) {
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
        response: function (e, ui) {
            let IsRegisteredString = false;
            for (let i = 0; i < ui.content.length; i++) {
                if ($("#teamInput").val() == ui.content[i]["value"]) {
                    IsRegisteredString = true;
                }
            }
            if (IsRegisteredString) {
                $('#teamMessage').slideUp(300);
            }
            else {
                $('#teamMessage').slideDown(300);
            }
        },
        select: function (e, ui) {
            $('#teamMessage').slideUp(300);
        }
    });

    $("#mainForm").submit((e) => {
        e.preventDefault();

        if ($("#mainForm")[0].checkValidity() === false) {
            e.stopPropagation();
        }
        else {
            $.ajax({
                url: "/FootballPlayers/RegisterNewPlayer",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({

                    firstName: $("#firstNameInput").val(),
                    lastName: $("#lastNameInput").val(),
                    sex: Boolean($("#sexInput").val()),
                    birthDate: $("#birthDateInput").val(),
                    country: $("#countryInput").val(),
                    team: $("#teamInput").val()

                }),

                success: function (data) {
                    $("#resultMessage").show();
                    if (data[0] == "OK") {
                        $("#resultMessage").removeClass();
                        $("#resultMessage").addClass("text-success");
                        $("#resultMessage").text("Игрок добавлен.");

                        let d = $("#birthDateInput").val().split("-");
                        let parsed = d[2] + "." + d[1] + "." + d[0];

                        connection.invoke("RegisterNewPlayer",
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
                        $("#resultMessage").text("Произошла ошибка при добавлении: " + data);
                    }
                }
            });
        }
        $("#mainForm").addClass('was-validated');

    });
})