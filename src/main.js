const messageInput = document.querySelector('#message');
const buttons = document.querySelector('#buttons');
const vazanoirButton = document.querySelector('#vazanoir');
const brawdunoirButton = document.querySelector('#brawdunoir');
const chat = document.querySelector('#chat');

const writeMessageInChat = (message) => {
  const newMessage = document.createElement('p');
  newMessage.innerHTML = message;
  chat.append(newMessage);
}

const p2p = (appData) => {
  // Create a peer
  const peer = new Peer(appData.id);

  // Wait for peer creation
  peer.on('open', id => {
    // Create a connection
    const conn = peer.connect(appData.peer);

    // Wait for connection
    peer.on('connection', conn => {
      messageInput.removeAttribute('disabled');

      // Wait for data
      conn.on('data', data => {
        writeMessageInChat(data);
      });

      conn.on('close', () => {
        messageInput.setAttribute('disabled', 'disabled');
      });
    });

    messageInput.addEventListener('keypress', sendEvent => {
      if (sendEvent.code !== 'Enter') return;
      if (messageInput.value === '') return;
      if (!conn.open) return;

      const dataToSend = `${peer.id} : ${messageInput.value}`;

      // Send data
      conn.send(dataToSend);
      writeMessageInChat(dataToSend);
      messageInput.value = '';
    });
  });
};

vazanoirButton.addEventListener('click', () => {
  buttons.remove();

  p2p({
    id: 'Vazanoir',
    peer: 'Brawdunoir',
  });
});

brawdunoirButton.addEventListener('click', () => {
  buttons.remove();

  p2p({
    id: 'Brawdunoir',
    peer: 'Vazanoir',
  });
});



