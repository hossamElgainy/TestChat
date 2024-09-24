import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  public messages: any[] = [];
  public newMessage: string = '';
   receiverId: string|null = ''; // Example receiver ID
   token: string|null = ''; // Replace with real token

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.token = prompt("Enter your JWT token"); // Either tokenUser1 or tokenUser2
    this.receiverId = prompt("Enter the receiver's ID"); // Set the receiver's ID
if(this.token){
    this.chatService.startConnection(this.token);
    this.chatService.receiveMessage((data) => {
      this.messages.push(data);
    });
  }
  }

  sendMessage() {
    if (this.newMessage &&this.receiverId&&this.token) {
      this.chatService.sendMessage(this.receiverId, this.newMessage,this.token);
      this.newMessage = '';
    }
  }

  ngOnDestroy(): void {
    this.chatService.stopConnection();
  }
}
