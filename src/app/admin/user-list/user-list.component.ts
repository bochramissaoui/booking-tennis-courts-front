import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/User.service';
import { ConfirmationModel } from 'src/app/models/ConfirmationModel';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users!: any[];
  confirmationModel: ConfirmationModel | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }

  disableUser(userId: number): void {
    this.confirmationModel = {
      title: 'Confirmer le compte',
      message: 'Êtes-vous sûr de vouloir activer ce compte ?',
      confirmText: 'Confirmer',
      cancelText: 'Annuler',
      confirmAction: () => this.confirmDisableUser(userId),
      cancelAction: () => this.closeConfirmationDialog(),
    };
  }

  confirmDisableUser(userId: number): void {
    this.userService.enableUser(userId).subscribe(
      (response) => {
        window.location.reload();
      },
      (error) => {
        console.error('Error disabling user:', error);
      }
    );
  }

  closeConfirmationDialog(): void {
    this.confirmationModel = null;
  }
}
