import socketIO from "socket.io-client";
import { eventType } from "../config";

export class SocketService {
  readonly socket = socketIO("http://localhost:9090", {
    transports: ["websocket"]
  });

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    this.socket.on(eventType.INITIALIZATION, () => {
      console.log("初始化完成...");
    });
  }
}
