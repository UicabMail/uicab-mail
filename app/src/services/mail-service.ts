import { SocketService } from "./socket-service";
import { computed, observable, action } from "mobx";
import { eventType, EventType } from "../config";
import { Mail } from "../models";

export type MailEventType = keyof Pick<EventType, "SEND" | "RECEIVED">;

export class MailService {
  @observable
  detail: Mail | undefined;

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

  send = (mail: Mail, otherReceive = []): void => {
    this.socket.emit(eventType.SEND, mail, [mail.to, ...otherReceive]);
  };

  receive = (folder: string, page: number): void => {
    this.socket.emit(eventType.RECEIVED, folder, page);
  };

  on(type: MailEventType, event: (...arg: any) => void): void {
    this.socket.on(eventType[type], event);
  }

  off(type: MailEventType, event: () => void): void {
    this.socket.off(eventType[type], event);
  }

  @action
  setDetail(mail: Mail): void {
    this.detail = mail;
  }
}
