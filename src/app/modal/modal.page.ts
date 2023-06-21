import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DataService, Student } from '../services/data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() id!: string;
  students: Student = { name: '', Ucid: '', feedback:'' };

  constructor(
    private dataService: DataService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.dataService.getStudentsById(this.id).subscribe((res: Student[]) => {
      if (Array.isArray(res) && res.length > 1) {
        this.students = res[1]; // Assign the first student object
      } else {
        // Handle the case when no student is found or the response is not an array
      }
    });
  }

  async updateStudent() {
    await this.dataService.updateStudent(this.students);
    const toast = await this.toastCtrl.create({
      message: 'Student Updated',
      duration: 1000,
    });
    toast.present();
  }

  async deleteStudent() {
    await this.dataService.deleteStudent(this.students);
    this.modalCtrl.dismiss();
  }
}
