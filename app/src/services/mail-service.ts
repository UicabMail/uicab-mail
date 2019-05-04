import { SocketService } from "./socket-service";
import { computed } from "mobx";
import { eventType, EventType } from "../config";
import { Mail } from "../models";

export type MailEventType = keyof Pick<EventType, "SEND" | "RECEIVED">;

export class MailService {
  @computed
  private get socket(): SocketIOClient.Socket {
    return this.socketService.socket;
  }

  constructor(private socketService: SocketService) {
    this.initEvent();
  }

  private initEvent(): void {
    let socket = this.socket;

    socket.on(eventType.RECEIVED, this.onReceiveMail);
  }

  private onReceiveMail = (): void => {};

  send = (mail: Mail): void => {
    this.socket.emit(eventType.SEND, mail);
  };

  receive = (folder: string): void => {
    this.socket.emit(eventType.RECEIVED, folder);
  };

  on(type: MailEventType, event: (...arg: any) => void): void {
    this.socket.on(eventType[type], event);
  }

  off(type: MailEventType, event: () => void): void {
    this.socket.off(eventType[type], event);
  }
}
