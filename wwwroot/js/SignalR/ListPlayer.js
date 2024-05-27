const connection = new signalR.HubConnectionBuilder()
    .withUrl("/Hub")    
    .build();

async function start() {
    await connection.start().then(() => LoadPlayers(page, minPlayers));
};

start();

connection.on("updatePlayer", (id, firstName, secondName, sex, birthDate, teamName, country) => {    
    editRow = $("tr").find(`[data-plid=` + id + `]`).parent().parent();    
    let cells = editRow.find("td");   
    cells[0].innerText = (firstName + " " + secondName);
    cells[1].innerText = (sex);
    cells[2].innerText = (birthDate);
    cells[3].innerText = (country);
    cells[4].innerText = (teamName);   
});

