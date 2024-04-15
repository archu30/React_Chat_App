import React, { useState } from 'react';
import { Picker } from 'emoji-mart'; // Import the Picker component from emoji-mart
import './ChatApp.css';

const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

const ChatApp = () => {
    const [message, setMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State to control emoji picker visibility
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

    const handleEmojiSelect = (emoji) => {
        setMessage(message + emoji.native); // Append selected emoji to the message
        setShowEmojiPicker(false); // Hide the emoji picker
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
                            <span role="img" aria-label="heart">❤️</span> ({chat.likes})
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
                <button className="emoji-button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    😀
                </button>
                <button className="send-button" onClick={handleSendMessage}>Send</button>
            </div>
            {showEmojiPicker && (
                <Picker
                    onSelect={handleEmojiSelect} // Handle emoji selection
                    emojiSize={24} // Set the size of the emojis
                    sheetSize={32} // Set the number of emojis per row
                />
            )}
        </div>
    );
};

export default ChatApp;
