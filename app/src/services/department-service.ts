import { SocketService } from "./socket-service";
import { computed, observable, action } from "mobx";
import { eventType, EventType } from "../config";
import { Department } from "../models";

export type DepartmentEventType = keyof Pick<
  EventType,
  "ADD_DEPT" | "UPDATE_DEPT" | "REMOVE_DEPT" | "GET_DEPT"
>;

export class DepartmentService {
  @observable
  private _departments: Department[] = [];

  @computed
  private get socket(): SocketIOClient.Socket {
    return this.socketService.socket;
  }

  @computed
  get departments(): Department[] {
    return this._departments;
  }

  constructor(private socketService: SocketService) {
    this.initEvent();
  }

  private initEvent(): void {
    let socket = this.socket;

    socket.on(eventType.GET_DEPT, this.onGetDepartment);
  }

  @action
  private onGetDepartment = (departments: Department[]): void => {
    this._departments = departments;
  };

  getDepartments(): void {
    this.socket.emit(eventType.GET_DEPT);
  }

  create = (department: Department): void => {
    this.socket.emit(eventType.ADD_DEPT, department);
  };

  update = (department: Department): void => {
    this.socket.emit(eventType.UPDATE_DEPT, department);
  };

  delete = (department: Department): void => {
    this.socket.emit(eventType.REMOVE_DEPT, department);
  };

  on(type: DepartmentEventType, event: () => void): void {
    this.socket.on(eventType[type], event);
  }

  off(type: DepartmentEventType, event: () => void): void {
    this.socket.off(eventType[type], event);
  }
}
