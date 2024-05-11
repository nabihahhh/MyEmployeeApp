import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {

  employeesData: any;

  ngOnInit() {
    const baseURL = "https://api.sampleapis.com/futurama/characters";
    fetch(baseURL)
    .then(resp => resp.json())
    .then(data => 
      this.employeesData = data

    );

    console.log(this.employeesData)

  }
}
