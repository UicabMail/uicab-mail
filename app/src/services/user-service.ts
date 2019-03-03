import { SocketService } from "./socket-service";
import { eventType } from "../config";
import { User } from "../models/user";
import { computed, observable, action } from "mobx";
import { LocalDBService } from "./local-db-service";
import { isAfter } from "date-fns";

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
  }

  readonly login = (user: User, remember?: boolean): void => {
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

  @action
  private setUser(user: User | undefined): void {
    this._user = user;
  }
}
