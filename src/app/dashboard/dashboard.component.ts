import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxPaginationModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {

  employeesData: any;
  filteredEmployeeData: any[] = [];
  isFiltered: boolean = false;
  p: number = 1;

  ngOnInit() {
    const baseURL = "https://api.sampleapis.com/futurama/characters";
    fetch(baseURL)
    .then(resp => resp.json())
    .then(data => 
      this.employeesData = data
    ).then(data =>
      this.filteredEmployeeData = this.employeesData
    );

  }

  
  filterSearch(data: any[], filterProperty: string, filter: any){
    this.filteredEmployeeData = [];
    this.isFiltered = true;
    const filterValue = filter.toString().toLowerCase();
    this.filteredEmployeeData = filterValue != 'backspace' ? data.filter(item => item.name.first.includes(filterValue)) || 
    data.filter(item => item.name.middle.includes(filterValue)) || data.filter(item => item.name.last.includes(filterValue))
    : data;
  }

}
