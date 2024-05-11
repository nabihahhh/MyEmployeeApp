import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-info',
  standalone: true,
  imports: [CommonModule, DashboardComponent],
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeInfoComponent {

  @Input() collapsed = false;
  @Input() screenWidth = 0;
  employeesData: any[] = [];
  filteredEmployeeData: any[] = [];
  name: string = "";
  gender: string = "";
  species: string = "";
  homePlanet: string = "";
  occupation: string = "";
  age: number = 0;
  id: any;
  quotesList: string[] = [];
  image: string = "";
  randomQuotes: string[] = [];  

  constructor(private route: ActivatedRoute, private r: Router, private cd:ChangeDetectorRef) {
    r.events.subscribe((val) => {
      // see also 
      this.getInfo();
  });
  }

  getBodyClass(): string {
    let styleClass = '';

    
    // fetch(baseURL)
    // .then(resp => resp.json())
    // .then(data => 
    //   this.employeesData = data
    // );

    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }

  // getData() {
  //   const baseURL = "https://api.sampleapis.com/futurama/characters";
  //   try {
  //   fetch(baseURL)
  //   .then(resp => resp.json())
  //   .then(data => 
  //     this.employeesData = data
  //   );
      
  //     } catch (e) {
  //     console.log("Err",e)
  //     }

  //     console.log(this.employeesData)
      
  // }

  ngOnInit() {
    const baseURL = "https://api.sampleapis.com/futurama/characters";
    try {
      fetch(baseURL)
      .then(resp => resp.json())
      .then(data => 
        this.employeesData = data
      ).then(data =>
        this.getInfo()
      );
      // //await
      // const data = fetch(baseURL);
      // // next line will only execute when above fetch is complete
      // const json = data;
      
      // // json.forEach(element => {
        
      // // });
      // // this.employeesData = json;
      
      } catch (e) {
      console.log("Err",e)
      }
      this.employeesData
  }

  ngOnChanges() {
    this.getInfo();
  }

  getInfo() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.employeesData.forEach(x => {
      if (x.id == Number(this.id)) {
        this.name = x.name.first + " " + x.name.middle + " " + x.name.last
        this.gender = x.gender;
        this.species = x.species;
        this.homePlanet = x.homePlanet;
        this.occupation = x.occupation;
        this.age = x.age;
        this.quotesList = x.sayings;
        this.image = x.images.main;
      }
    });

    this.getRandomQuotes();
    // this.filteredEmployeeData = this.employeesData
  }

  getRandomQuotes() {

    this.randomQuotes = [];
    for (let i = 0; i < 3; i++) {
      const ind: number =
      Math.floor(Math.random() * this.quotesList.length);
      const result: string = this.quotesList[ind];
      this.randomQuotes.push(result);
    }
    this.cd.detectChanges();
  }
  
}
