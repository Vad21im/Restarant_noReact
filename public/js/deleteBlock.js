const deleteBlock =  async function (event){
    if(event.target.name === 'deleteKey'){
    event.preventDefault();
        const data = {idUnBlock: event.target.id}
        const response = await fetch("/tables", {

            method: 'DELETE', // *GET, POST, POST, PUT, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });

        location.href="/tables"
}
}


document.addEventListener('click', deleteBlock);
