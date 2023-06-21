import { Injectable } from '@angular/core';
import{Firestore,collectionData,doc,docData,addDoc, deleteDoc, updateDoc} from '@angular/fire/firestore';
import{collection} from '@firebase/firestore';
////import { docData } from 'rxfire/firestore';
import { Observable } from 'rxjs';

export interface Student{
  id?: String;
  name : String;
  Ucid: string;
  feedback: string;
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }


  getStudents(): Observable<Student[]>
  {
    const studDetails = collection(this.firestore, 'students');
    return collectionData(studDetails, {idField:'Serial_Id'}) as Observable<Student[]>;
  }

  getStudentsById(id: any): Observable<Student[]>
  {
    const studDetailsbyid = doc(this.firestore, `students/${id}`);
    return docData(studDetailsbyid, {idField:'id'}) as Observable<Student[]>;
  }

  addStudent(student:Student )
  {
    const studDetails = collection(this.firestore,'students');
    return addDoc(studDetails,student);
  }

  deleteStudent(student: Student)
  {
    const studDetailsbyid = doc(this.firestore,`students/${student.id}`);
    return deleteDoc(studDetailsbyid);
  }

  updateStudent(student: Student)
  {
    const studDetailsbyid = doc(this.firestore,`students/${student.id}`);
    return updateDoc(studDetailsbyid,{name:student.name, Ucid: student.Ucid});
  }

}
