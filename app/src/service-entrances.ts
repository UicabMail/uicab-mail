import { SocketService, UserService, LocalDBService } from "./services";

export const socketService = new SocketService();

export const localDBService = new LocalDBService();

export const userService = new UserService(socketService, localDBService);

export interface ServicesProps {
  userService?: UserService;
}
