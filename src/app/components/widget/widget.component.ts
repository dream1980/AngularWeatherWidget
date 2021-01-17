import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/classes/city';
import { Weather } from 'src/app/classes/weather';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {

  cities: Array<City> = new Array<City>();
  currentWeather: Weather = new Weather();
  currentCity: number = 0;

  constructor(private data: DataService) { }

  ngOnInit(): void {

    this.data.getCities(this.cities);    
  }

  // event when cities dropdown changed
  handleChange(event: any) {
    //console.log(event);
    // console.log(event.target.value);

    this.currentCity = event.target.value;
  }

  handleUpdate() {
    this.data.getWeather(this.currentCity, this.currentWeather);
  }

  // get full url path of icon
  getIconUrl(icon: string): string {

    return "http://openweathermap.org/img/w/" + icon + ".png"
  }
}
