import { SocketService } from "./socket-service";
import { computed, observable, action } from "mobx";
import { eventType, EventType } from "../config";
import { Mail } from "../models";
import { LocalDBService } from "./local-db-service";

const DRAFT_MAIL_KEY = "draft-mails";

export type MailEventType = keyof Pick<EventType, "SEND" | "RECEIVED">;

export class MailService {
  @observable
  keyword = "";

  @observable
  detail: Mail | undefined;

  @observable
  editing: Mail | undefined;

  @observable
  inbox: Mail[] = [];

  @computed
  get search(): Mail[] {
    return this.inbox.filter(
      ({ from, fromName, subject, content }) =>
        subject.includes(this.keyword) ||
        content.includes(this.keyword) ||
        from.includes(this.keyword) ||
        (fromName && fromName.includes(this.keyword))
    );
  }

  @computed
  get work(): Mail[] {
    return this.inbox.filter(mail => mail.from.includes("uicab.xyz"));
  }

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

    socket.on(eventType.RECEIVED, this.onReceiveMail);
  }

  private onReceiveMail = (): void => {};

  send = (mail: Mail, isHTML = false, otherReceive = []): void => {
    this.socket.emit(eventType.SEND, mail, [mail.to, ...otherReceive], isHTML);
  };

  receive = (folder: string, page: number): void => {
    this.socket.emit(eventType.RECEIVED, folder, page);
  };

  on(type: MailEventType, event: (...arg: any) => void): void {
    this.socket.on(eventType[type], event);
  }

  off(type: MailEventType, event: (...arg: any) => void): void {
    this.socket.off(eventType[type], event);
  }

  saveDraft = (mail: Mail): void => {
    let mails = this.getDraft();

    mails.push(mail);
    this.setDraft(mails);
  };

  setDraft = (mails: Mail[]): void => {
    this.localDBService.set(DRAFT_MAIL_KEY, mails);
  };

  getDraft = (): Mail[] => {
    return this.localDBService.get<Mail[]>(DRAFT_MAIL_KEY) || [];
  };

  @action
  setKeyword(keyword: string): void {
    this.keyword = keyword;
  }

  @action
  setDetail(mail: Mail | undefined): void {
    this.detail = mail;
  }

  @action
  setEditing(mail: Mail | undefined): void {
    this.editing = mail;
  }

  @action
  setInbox(mails: Mail[]): void {
    this.inbox = mails;
  }
}
