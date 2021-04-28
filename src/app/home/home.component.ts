import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  search: string = '';
  
  array: Array<any>;
  currentTemp = "";
  currentTUnit = "";
  displayHourly = [];
  displayWeek = [];
  minTemp = '';
  maxTemp = '';
  searchList = [];
  searchVal = "";

  constructor( private apiservice: ApiServiceService,
    private http: HttpClient,
    private datepipe: DatePipe) { }

  ngOnInit() {
  }

  onSearch() {
    this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address='
      +this.search
      +'&key='+this.key)
    .subscribe( res => {
      this.find(res);
    });
  }

  find( res) {
    const lat = res.results[0].geometry.location.lat;
    const lng = res.results[0].geometry.location.lng;
    this.http.get('https://api.weather.gov/points/'+lat+','+lng)
      .subscribe( results => {
        this.getWeather(results);
      });
  }

  getWeather( grids ){
    const gridId = grids.properties.gridId;
    const gridX = grids.properties.gridX;
    const gridY = grids.properties.gridY;
    const hourlyForecast = [];
    this.http.get('https://api.weather.gov/gridpoints/'+gridId+'/'+gridX+','+gridY+'/forecast/hourly')
      .subscribe( results => {
        this.hourlyWeather(results);
        this.sevenDayForecast(gridId, gridX, gridX);
      });
    
  }

  hourlyWeather( data: any ) {

    let hourlyData = [];
    this.displayHourly = [];
    hourlyData =  data.properties.periods;  
    
    const currentDate = new Date();

    hourlyData.forEach(x => {
      let newDate = new Date(x.endTime);
      if(newDate.getDate() <= currentDate.getDate()){
        let obj = {
          time: newDate,
          temp: x.temperature,
          tempUnit: x.temperatureUnit,
          forecast: x.shortForecast
        };
        this.displayHourly.push(obj);
        if(newDate.getDate() == currentDate.getDate()){
          this.currentTemp = x.temperature;
          this.currentTUnit = x.temperatureUnit;
        }
        this.minTemp = x.temperature;
        this.maxTemp = x.temperature;
      }
      
    });
    this.displayHourly.forEach( temp => {
      this.minTemp = this.minTemp < temp.temp ? this.minTemp : temp.temp;
      this.maxTemp = this.maxTemp > temp.temp ? this.maxTemp : temp.temp;
    })

  }

  sevenDayForecast(gridId, gridX, gridY) {
    this.http.get('https://api.weather.gov/gridpoints/'+gridId+'/'+gridX+','+gridY+'/forecast')
      .subscribe( results => {
        this.weekForecast(results);
      });
  }

  weekForecast( week: any ) {
    let weekArray: any [] = week.properties.periods;
    weekArray.forEach(val => {
      let obj = {
        day: val.name,
        forecast: val.shortForecast,
        temp: val.temperature,
        tempUnit: val.temperatureUnit,
        date: this.datepipe.transform(val.endTime, 'M/d/yy')
      }
      this.displayWeek.push(obj);
    });
  }

  addList() {
    this.searchList.push(this.search);
  }

  selectChange( event ) {
    this.search = event;
  }

}
