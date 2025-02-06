import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

class SignalRService {
  private static instance: SignalRService;
  public connection: HubConnection | null = null;

  private constructor() {}

  public static getInstance(): SignalRService {
    if (!SignalRService.instance) {
      SignalRService.instance = new SignalRService();
    }

    return SignalRService.instance;
  }

  public async startConnection(url: string, token: string): Promise<void> {
    if (this.connection) {
      await this.stopConnection();
    }

    this.connection = new HubConnectionBuilder()
      .withUrl(url, {
        accessTokenFactory: () => token,
      })
      .configureLogging(LogLevel.None)
      .build();

    await this.connection.start();
  }

  public async stopConnection(): Promise<void> {
    if (this.connection) {
      await this.connection.stop();
      this.connection = null;
    }
  }
}

export default SignalRService.getInstance();
