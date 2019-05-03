import socketIO from "socket.io-client";
import { eventType } from "../config";
import { message } from "antd";

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

    this.socket.on(eventType.ERROR_MESSAGE, (info: string) =>
      message.error(info)
    );
  }
}
