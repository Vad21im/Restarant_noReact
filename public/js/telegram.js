const ws = new WebSocket(window.location.href.replace(/^http/, 'ws'))
let objDiv = document.querySelector("[data-chat-scroll]"); objDiv.scrollTop = objDiv.scrollHeight;

document.addEventListener('submit', async (event) => {
    if (event.target.id = 'tlgForm') {
        event.preventDefault();
        let chat = document.querySelector('[data-chat]');
        let message = document.querySelector('[data-message]');
        /* https://api.telegram.org/bot1382681542:AAHJ-BIH-tau5N2ErWuVnxnf0jH5EViJCSY/sendMessage?chat_id=231225258&text=
        ${message.value} */
        const response = await fetch('/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message.value
                })
            })

        let result = await response.json();

         chat.insertAdjacentHTML('beforeend', ` ${result.text}<br>`);
        objDiv.scrollTop = objDiv.scrollHeight;



        const resTele = await fetch(`https://api.telegram.org/bot1382681542:AAHJ-BIH-tau5N2ErWuVnxnf0jH5EViJCSY/sendMessage?chat_id=231225258&text=${message.value}`, {
            method: 'GET'
        })
        message.value = '';
    }
});
// ws.onopen = () => {
//     ws.send('position')
// }

ws.onmessage = (event) => {
    message = JSON.parse(event.data)
    console.log(message)
}




