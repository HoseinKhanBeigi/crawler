import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs/esm5';
import { v4 as uuid } from 'uuid';

let socket = null;
let stomp = {
  connected: false,
};

function getSocket(url) {
  if (!socket) {
    socket = new SockJS(url);
  }
  return socket;
}

export function useSocket(url) {
  const subscribeMap = new Map();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (stomp?.connected && stomp?.brokerURL !== url) {
      setConnected(true);
    }
  }, []);

  function subscribe(channel, listener, headers) {
    if (typeof listener !== 'function') {
      throw new Error('Need a valid function to listen over a channel');
    } else {
      const id = uuid();
      if (connected || stomp.connected) {
        stomp.subscribe(channel, listener, { ...headers, id });
      }
      subscribeMap.set(id, { channel, listener, headers: { ...headers, id } });
      return id;
    }
  }

  function unsubscribe(id, headers) {
    if (id && subscribeMap.has(id)) {
      if (connected || stomp.connected) {
        stomp.unsubscribe(id, { ...headers, id });
      }
      subscribeMap.delete(id);
    }
  }

  function send(channel, data) {
    if (connected || stomp.connected) {
      stomp.send(channel, {}, JSON.stringify(data || {}));
    } else {
      throw new Error("You can't send over a disconnect connection");
    }
  }

  function onConnect() {
    subscribeMap.forEach(item =>
      stomp.subscribe(item.channel, item.listener, item.headers),
    );
  }

  function connect(headers) {
    const privateSocket = getSocket(url);
    if (
      (!stomp?.connected || stomp?.brokerURL !== url) &&
      typeof window !== 'undefined'
    ) {
      stomp = Stomp.over(privateSocket);
      stomp.debug = () => {};
      stomp.onDisconnect(() => {
        setConnected(false);
        stomp = null;
        // TODO: try to reconnect the connection to server
      });
      const id = uuid();
      return new Promise(resolve =>
        stomp.connect({ ...headers, id }, () => {
          setConnected(true);
          onConnect();
          resolve();
        }),
      );
    }
    return Promise.resolve();
  }

  function disconnect() {
    return new Promise(resolve => {
      stomp.disconnect(resolve);
    });
  }

  return {
    stomp,
    connect,
    connected: connected || stomp.connected,
    disconnect,
    send,
    subscribe,
    unsubscribe,
  };
}
