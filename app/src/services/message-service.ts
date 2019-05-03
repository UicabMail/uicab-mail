import { SocketService } from "./socket-service";
import { computed } from "mobx";
import { eventType, EventType } from "../config";
import { LocalDBService } from "./local-db-service";
import { Message, User } from "../models";

export type MessageEventType = keyof Pick<EventType, "MESSAGING">;

const MESSAGE_SET_NAME = "message";
const LATELY_USER_SET_NAME = "lately-user";

export class MessageService {
  @computed
  private get socket(): SocketIOClient.Socket {
    return this.socketService.socket;
  }

  constructor(
    private socketService: SocketService,
    private localDBService: LocalDBService
  ) {
    this.initEvent();
  }

  private initEvent(): void {
    let socket = this.socket;

    socket.on(eventType.MESSAGING, this.onReceiveMessage);
  }

  private onReceiveMessage = (id: number, content: string): void => {
    this.setChatMessage({
      current: false,
      user: id,
      content
    });
  };

  sendMessage = (user: User, session: string, content: string): void => {
    this.setChatMessage({
      current: true,
      user: user.id,
      content
    });
    this.socket.emit(eventType.MESSAGING, session, content);

    this.setLately(user);
  };

  getChatMessage = (id: number): Message[] => {
    let key = `${MESSAGE_SET_NAME}-${id}`;

    return this.localDBService.get<Message[]>(key) || [];
  };

  setChatMessage = (message: Message): void => {
    let key = `${MESSAGE_SET_NAME}-${message.user}`;

    let messages = this.getChatMessage(message.user);

    messages.push(message);

    this.localDBService.set(key, messages);
  };

  getLately = (): User[] => {
    return this.localDBService.get<User[]>(LATELY_USER_SET_NAME) || [];
  };

  setLately = (user: User): void => {
    let users = this.getLately();

    users.splice(users.findIndex(({ id }) => user.id === id), 1);
    users.unshift(user);

    this.localDBService.set(LATELY_USER_SET_NAME, users);
  };

  on(type: MessageEventType, event: () => void): void {
    this.socket.on(eventType[type], event);
  }

  off(type: MessageEventType, event: () => void): void {
    this.socket.off(eventType[type], event);
  }
}
