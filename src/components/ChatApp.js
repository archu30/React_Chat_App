import React, { useState } from 'react';
import './ChatApp.css';



const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

const ChatApp = () => {
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            const randomUser = user_list[Math.floor(Math.random() * user_list.length)];
            const newMessage = {
                user: randomUser,
                text: message,
                likes: 0
            };
            // Insert the new message at the beginning of the chatMessages array
            setChatMessages([newMessage, ...chatMessages]);
            setMessage('');
        }
    };


    const handleLikeMessage = (index) => {
        const updatedMessages = [...chatMessages];
        updatedMessages[index].likes += 1;
        setChatMessages(updatedMessages);
    };

    // Function to generate placeholder avatar using user's name initials
    const generatePlaceholderAvatar = (userName) => {
        const initials = userName.split(' ').map((name) => name[0]).join('').toUpperCase();
        return `https://ui-avatars.com/api/?name=${initials}&background=random`;
    };

    return (

        <div className="chat-container">
            <div className='message-list'>
                {chatMessages.map((chat, index) => (
                    <div key={index} className="message-container">
                        <div className="message-header">
                            <img
                                src={`/userImages/${chat.user.toLowerCase()}.jpg`}
                                alt={`${chat.user}'s avatar`}
                                className="user-avatar"
                                onError={(e) => { e.target.onerror = null; e.target.src = generatePlaceholderAvatar(chat.user); }}
                            />
                            <span><strong>{chat.user}:</strong></span>
                        </div>
                        <span className='chat-text'>{chat.text}</span>
                        <button onClick={() => handleLikeMessage(index)}>
                            <span role="img" aria-label="heart">❤️</span>
                            ({chat.likes})
                        </button>
                    </div>
                ))}
            </div>
            <div className='input-message'>
                <input
                    type="text"
                    className="message-input"
                    value={message}
                    onChange={handleMessageChange}
                    placeholder="Type your message here..."
                />
                <button className="send-button" onClick={handleSendMessage}>Send</button>
            </div>
        </div>

    );

};

export default ChatApp;
