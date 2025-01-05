import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { HttpClient } from '@angular/common/http'; // Importer HttpClient

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
/**
 * Component to display and manage a list of students.
 *
 * @export
 * @class StudentListComponent
 * @implements {OnInit}
 */
export class StudentListComponent implements OnInit {
  students: any[] = [];
  studentDetails: any;
  addressDetails: any;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'actions'];

  constructor(
    private studentService: StudentService,
    private http: HttpClient // Injecter HttpClient ici
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
    });
  }

  deleteStudent(id: number): void {
  this.studentService.deleteStudent(id).subscribe(
    () => {
      console.log('Student deleted successfully');
      // Rafraîchir la liste des étudiants après suppression
      this.loadStudents();
    },
    (error: any) => {
      console.error('There was an error!', error);
    }
  );
  }
  viewDetails(id: number): void {
  this.http.get(`http://localhost:8081/api/students/${id}/details`).subscribe(
    (data: any) => {
      // Assurez-vous que les données sont structurées correctement
      this.studentDetails = data.studentDetails;  // Récupérer les détails de l'étudiant
      this.addressDetails = data.addressDetails;  // Récupérer les détails de l'adresse
      console.log('Student details:', this.studentDetails);
      console.log('Address details:', this.addressDetails);
    },
    (error) => {
      console.error('There was an error fetching student details!', error);
    }
  );
}

}
