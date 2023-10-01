import {
    GetAllMessagesError,
    MessageError,
    MessageModelError,
    NewMessageError,
} from "../errors/errors.js";
import { messageModel } from "../models/Message.js";

export default class ChatService {
    constructor() {
        this.messageModel = new messageModel();
    }
    // Retrieves all Messages
    async getAllMessages() {
        try {
            const messages = await this.messageModel.find();

            return messages;
        } catch (error) {
            if (error instanceof MessageModelError) {
                throw error;
            }
            throw new GetAllMessagesError("Failed to get all messages", error);
        }
    }
    // Create a new Message with connection status
    async message(messageData, connectStatus) {
        try {
            const newMessage = new messageModel({
                message: `${messageData} ${connectStatus}`,
                user: `📡 SERVER`,
            });
            await this.messageModel.create(newMessage);
            const messages = await this.messageModel.find();
            return messages;
        } catch (error) {
            if (error instanceof MessageModelError) {
                throw error;
            }
            throw new MessageError("Failed to create message", error);
        }
    }
    // Create a new User Message
    async newMessage(userData, messageData) {
        try {
            const newMessage = new messageModel({
                message: messageData,
                user: userData,
            });

            await this.messageModel.create(newMessage);

            const messages = await this.messageModel.find();

            return messages;
        } catch (error) {
            if (error instanceof MessageModelError) {
                throw error;
            }
            throw new NewMessageError("Failed to send message", error);
        }
    }
}
