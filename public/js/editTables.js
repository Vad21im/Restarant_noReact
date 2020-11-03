const keyPush = async function (event){
    if(event.target.name === 'busy'){
        event.preventDefault();
        const data = {status: 'busy', numTable: event.target.id};
        const response = await fetch('/tables', {

            method: 'PATCH', // *GET, POST, POST, DELETE, PUT.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        location.href="/tables"
    } else if(event.target.name === 'free'){
        event.preventDefault();
        const data = {status: 'free', numTable: event.target.id};
        const response = await fetch('/tables', {

            method: 'PATCH', // *GET, POST, POST, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        
        location.href="/tables"
    }
}

document.addEventListener('click', keyPush);
