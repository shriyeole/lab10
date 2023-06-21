import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  students: any = [];
  constructor(private dataService:DataService , private alertCtrl:AlertController ,private modalCtrl: ModalController) {
    this.dataService.getStudents().subscribe(res =>{
      console.log(res);
      this.students = res;
      
    });
     
  }

  


  async openStudentList(student:any)
  {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps:{id: student.id},
      breakpoints: [ 0 , 0.5 , 0.8],
      initialBreakpoint: 0.5
    });
    modal.present();
  }
 async addNote()
  {
    const alert = await this.alertCtrl.create({
      header:'Add Student',
      inputs:[
        {
          name : 'Name',
          placeholder: 'Enter your Name',
          type: 'text'
        },
        {
          name : 'UCID',
          placeholder: 'Enter your UCID',
          type: 'textarea'
        },
        {
          name: "Feedback",
          placeholder: "Enter the feedback",
          type: 'textarea',

        },


      ],
      buttons:[
        {
          text: 'cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler:(res) => {
            this.dataService.addStudent({name : res.Name, Ucid :res.UCID ,feedback: res.Feedback })
          }
        }

     ]

    });

    await alert.present();
  }

}
