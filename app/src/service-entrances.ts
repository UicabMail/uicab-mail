import {
  SocketService,
  UserService,
  LocalDBService,
  DepartmentService
} from "./services";

export const socketService = new SocketService();

export const localDBService = new LocalDBService();

export const userService = new UserService(socketService, localDBService);

export const departmentService = new DepartmentService(socketService);

export interface ServicesProps {
  userService?: UserService;
  departmentService?: DepartmentService;
}
