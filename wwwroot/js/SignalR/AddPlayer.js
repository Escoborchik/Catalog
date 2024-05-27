const connection = new signalR.HubConnectionBuilder()
    .withUrl("/Hub")    
    .build();

async function start() {
    await connection.start();
};

start();

connection.on("showNewPlayer", (id, firstName, secondName, sex, birthDate, teamName, country) => {
    let tableData = $("#playersData");
    let slicedDate = birthDate.split("-");   
    let parsedDate = slicedDate[2] + "." + (slicedDate[1]) + "." + (slicedDate[0]);   
    let elementStr = "<tr data-plid=" + id + ">\n\
            <td>"+ firstName + " " + secondName + " </td >\n\
            <td>"+ sex + "</td>\n\
            <td>"+ parsedDate + "</td>\n\
            <td>"+ country + "</td>\n\
            <td>"+ teamName + "</td>\n\
            <td><button id='edit' class='btn btn-info' data-toggle='modal' data-target='#editModal' data-plid="+ id + ">Изменить</button></td>\n\
        </tr >";
    $(elementStr).prependTo(tableData);
});