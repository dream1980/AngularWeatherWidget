import { City } from './../../classes/city';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Weather } from 'src/app/classes/weather';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  weatherApiKey: string = "1890fcd579ac51bb12f42af3ceed6428";
  weatherApiUrl: string = "";

  constructor(private http:HttpClient) { }

  // reading data from a file
  getCities(list: Array<City>) {

    this.http.get<any>("http://localhost:8000/city.list.json").subscribe((data: any[]) => {
      // console.log(data);
      data.forEach((item: any) => {

        let city: City = new City(item.id, item.name);
        
        // adding the new item to the array
        list.push(item);
        
        // console.log(item);
        // console.log(item.name);
        // console.log(item.image);        
      });  
    });    
  }

  // reading weather per cityID
  getWeather(cityid: number, weather: Weather) {
    
    //this.http.get<any>("http://api.openweathermap.org/data/2.5/weather?id=473537&appid="+ this.weatherApiKey).subscribe((data: any[]) => {

    // TODO: handle when id not found

    this.http.get<any>("http://api.openweathermap.org/data/2.5/weather?id="+ cityid + "&appid="+ this.weatherApiKey).subscribe((data: any[]) => {
      // console.log(data);
      // console.log(data.main.temp);
      // console.log(data.main.humidity);
      // console.log(data.main.pressure);
      // console.log(data.weather[0].description);
      // console.log(data.weather[0].icon);
      // console.log(data.main.name);
      
      // temp is in kelvin unit so convert to celsius unit
      weather.temp = Math.floor(data.main.temp-273.15);
      weather.humidity = data.main.humidity;
      weather.pressure = data.main.pressure;
      weather.description = data.weather[0].description;
      weather.icon = data.weather[0].icon;
      weather.name = data.name; 
    });

    return null;
  }

}
