import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {

  employeesData: any;
  filteredEmployeeData: any[] = [];

  ngOnInit() {
    const baseURL = "https://api.sampleapis.com/futurama/characters";
    fetch(baseURL)
    .then(resp => resp.json())
    .then(data => 
      this.employeesData = data

    );
    this.filteredEmployeeData = this.employeesData;
    console.log(this.employeesData)

  }

  
  // searchQuery = signal<string>('');
  // items = computed(() => {
  //   const sq = this.searchQuery();
  //   return this.employeesData.filter((x: string | string[]) => x.includes(sq));
  // });

  // onSearchUpdated(sq: string) {
  //   this.searchQuery.set(sq);
  // }

}
