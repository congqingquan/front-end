import React, { useRef, useMemo } from 'react';
import { useWebSocket } from 'ahooks';

const ReadyState = {
    Connecting: 0,
    Open: 1,
    Closing: 2,
    Closed: 3,
};

export default () => {
    const messageHistory = useRef([]);

    const { readyState, sendMessage, latestMessage, disconnect, connect } = useWebSocket(
        'wss://demo.piesocket.com/v3/channel_1?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self',
    );

    messageHistory.current = useMemo(() => messageHistory.current.concat(latestMessage), [latestMessage]);

    return (
        <div>
            {/* send message */}
            <button
                onClick={() => sendMessage && sendMessage(`${Date.now()}`)}
                disabled={readyState !== ReadyState.Open}
                style={{ marginRight: 8 }}>
                ✉️ send
            </button>
            {/* disconnect */}
            <button
                onClick={() => disconnect && disconnect()}
                disabled={readyState !== ReadyState.Open}
                style={{ marginRight: 8 }}>
                ❌ disconnect
            </button>
            {/* connect */}
            <button onClick={() => connect && connect()} disabled={readyState === ReadyState.Open}>
                {readyState === ReadyState.Connecting ? 'connecting' : '📞 connect'}
            </button>
            <div style={{ marginTop: 8 }}>readyState: {readyState}</div>
            <div style={{ marginTop: 8 }}>
                <p>received message: </p>
                {messageHistory.current.map((message, index) => (
                    <p key={index} style={{ wordWrap: 'break-word' }}>
                        {message?.data}
                    </p>
                ))}
            </div>
        </div>
    );
};
