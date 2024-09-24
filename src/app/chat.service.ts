import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection!: signalR.HubConnection;

  constructor() {}

  startConnection(token: string) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7075/chatHub', {
        accessTokenFactory: () => token
      })
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.error('Error while starting connection: ', err));
  }

  stopConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }

  sendMessage(receiverId: string, message: string,token:string) {
    this.hubConnection.invoke('SendMessage', receiverId, message,token)
      .catch(err => console.error('Error while sending message: ', err));
  }

  receiveMessage(callback: (message: any) => void) {
    this.hubConnection.on('ReceiveMessage', (data) => {
      callback(data);
    });
  }
}