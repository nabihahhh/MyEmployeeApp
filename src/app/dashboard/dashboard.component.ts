import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxPaginationModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {

  employeesData: any[]= [];
  filteredEmployeeData: any[] = [];
  originalData: any[] = [];
  isFiltered: boolean = false;
  p: number = 1;
  searchValue: string = "";
  speciesData: string[] = ["Human", "Martian", "Robot", "Mutant", "Decapodian", "Omicronian", "Amphibiosans"];
  genderData: string[] = ["Male", "Female"];
  currentFilter: string = "";
  previousFilter: string = "";
  filterGender = '';
  filterSpecies = '';
  filterName = '';
  // searchTerm = "";
  // users$!: Observable<any[]>;
  // filteredUsers$!: Observable<any[]>;

  ngOnInit() {
    const baseURL = "https://api.sampleapis.com/futurama/characters";
    fetch(baseURL)
    .then(resp => resp.json())
    .then(data => 
      this.employeesData = data
    ).then(data =>
      this.employeesData.forEach(e=> {
        this.filteredEmployeeData.push({id: e.id, name: e.name.first + " " + e.name.middle + " " + e.name.last, species: e.species, gender: e.gender, image: e.images.main, occupation: e.occupation});
      })
    ).then (data => 
      this.originalData = this.filteredEmployeeData
    );

  }

  assignSearchValue (filter: any){
    this.searchValue = (filter.target as HTMLTextAreaElement).value.toLowerCase();
  }

  filterSearch(data: any[]){
    this.isFiltered = true;
    this.filteredEmployeeData = this.searchValue != 'backspace'? data.filter(item => item.name.toLowerCase().includes(this.searchValue))
    : this.originalData;
  }

  addFilter(searchValue: any, speciesValue: any, genderValue: any) {

    // var searchVal  = searchValue != "" ? (searchValue.target as HTMLTextAreaElement).value : "";
    var speciesVal = speciesValue != "" ? (speciesValue.target as HTMLTextAreaElement).value : "";
    var genderVal = genderValue != "" ? (genderValue.target as HTMLTextAreaElement).value : "";

    // this.filterName = searchVal != "" ? searchVal : this.filterName;
    this.filterGender = genderVal != "" ? genderVal : this.filterGender;
    this.filterSpecies = speciesVal != "" ? speciesVal : this.filterSpecies;

    // var test = this.originalData.filter(item => item.gender.includes(this.filterGender) && item.species.includes(this.filterSpecies));

    this.filteredEmployeeData = this.filterGender || this.filterSpecies  || this.filterName ? this.originalData.filter(item => item.gender.includes(this.filterGender) 
    && item.species.includes(this.filterSpecies)
    && item.name.toLowerCase().includes(this.searchValue))
    : this.originalData;
    this.isFiltered = true;

  }

  clearFilter() {
    this.isFiltered = false;
    this.currentFilter = "";
    this.previousFilter = "";
    this.filteredEmployeeData = this.originalData;
  }

}
