import { SocketService } from "./socket-service";
import { eventType, EventType } from "../config";
import { User } from "../models/user";
import { computed, observable, action } from "mobx";
import { LocalDBService } from "./local-db-service";
import { isAfter } from "date-fns";

export type UserEventType = keyof Pick<
  EventType,
  | "ADD_USER"
  | "UPDATE_USER"
  | "REMOVE_USER"
  | "GET_USER"
  | "SEARCH_USER"
  | "CHANGE_PASS"
>;

export class UserService {
  @observable
  private _user: User | undefined;

  @computed
  get user(): User | undefined {
    return this._user ? { ...this._user } : undefined;
  }

  @computed
  get isLogin(): boolean {
    return !!this._user;
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

    let user = this.localDBService.get<User>("user");

    if (user) {
      this.login(user);
    }

    // 模拟登录
    // let u: User = {
    //   username: "boen",
    //   password: "123456",
    //   id: 1,
    //   isAdmin: true,
    //   mail: "1997@boenfu.cn",
    //   status: 0
    // };
    // this.login({ username: "boen", password: "123456" }, true);
    // this.loginEvent(u);
  }

  readonly login = (user: Partial<User>, remember?: boolean): void => {
    let socket = this.socket;

    socket.emit(eventType.LOGIN, user);

    if (remember !== undefined) {
      let now = Date.now();

      let deadline = remember
        ? now + 1000 * 60 * 60 * 24 * 7
        : now + 1000 * 60 * 60;

      this.localDBService.set("deadline", deadline);
    }
  };

  readonly loginOut = (): void => {
    this.setUser(undefined);
    this.localDBService.unset("user");
  };

  private initEvent(): void {
    let socket = this.socket;

    socket.on(eventType.LOGIN, this.loginEvent);
  }

  private loginEvent = (user: User | undefined): void => {
    let deadline = this.localDBService.get<string>("deadline") || Date.now();

    if (user) {
      if (isAfter(deadline, Date.now())) {
        this.setUser(user);

        this.localDBService.set<User>("user", user);
      } else {
        console.log("登录已失效");
        this.localDBService.unset("user");
      }
    } else {
      console.log("用户名或密码错误");
    }
  };

  create = (user: User): void => {
    user.status = 0;
    this.socket.emit(eventType.ADD_USER, user);
  };

  updateProfile = (user: Partial<User>): void => {
    this.socket.emit(eventType.UPDATE_USER, user);
  };

  delete = (user: Partial<User>): void => {
    this.socket.emit(eventType.REMOVE_USER, user);
  };

  searchUser = (key: string): void => {
    this.socket.emit(eventType.SEARCH_USER, key);
  };

  changePass = (oldPass: string, newPass: string): void => {
    this.socket.emit(
      eventType.CHANGE_PASS,
      { ...this.user, password: oldPass },
      newPass
    );
  };

  @action
  private setUser(user: User | undefined): void {
    this._user = user;
  }

  on(type: UserEventType, event: (...arg: any) => void): void {
    this.socket.on(eventType[type], event);
  }

  off(type: UserEventType, event?: (...arg: any) => void): void {
    this.socket.off(eventType[type], event);
  }
}
