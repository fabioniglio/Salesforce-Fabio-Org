import { LightningElement } from "lwc";

export default class CovidInfo extends LightningElement {
  // stores aggregated counts
  covidCounts = {};
  // stores the response returned from webservice
  covidInfo;
  // private property - used in filter functionality
  _covidInfo;
  // used to store the corresponding country name when info icon is clicked
  countryName;
  // filter version of covidInfo array - contains information specific to a country
  countryCovidInfo = {};

  // executed on component load
  connectedCallback() {
    let totalCases = 0;
    let totalDeaths = 0;
    let totalRecovered = 0;
    let todaysTotalCases = 0;
    let todaysTotalDeaths = 0;
    // make a werbservice call to get the data
    fetch("https://corona.lmao.ninja/countries")
      .then(function(response) {
        return response.json();
      })
      .then(responseJSON => {
        this.covidInfo = responseJSON;
        this._covidInfo = responseJSON;
        // iterate over the response array and aggreate the counts
        this.covidInfo.forEach(function(item, index) {
          totalCases = totalCases + item.cases;
          totalDeaths = totalDeaths + item.deaths;
          totalRecovered = totalRecovered + item.recovered;
          todaysTotalCases = todaysTotalCases + item.todayCases;
          todaysTotalDeaths = todaysTotalDeaths + item.todayDeaths;
        });
        // using spread operator to add new properties to the object
        this.covidCounts = {
          ...this.covidCounts,
          cases: totalCases,
          deaths: totalDeaths,
          recovered: totalRecovered,
          todaysCases: todaysTotalCases,
          todaysDeaths: todaysTotalDeaths
        };
      });
  }

  // executed when user types something in the country filter
  // handles the event thrown by covidTable component
  filterCovidInfo(event) {
    const searchKey = event.detail ? event.detail.toLowerCase() : event.detail;
    this._covidInfo = this.covidInfo.filter(info =>
      info.country.toLowerCase().includes(searchKey)
    );
  }

  // executed when user clicks on the info icon
  // handles the event thrown by covidTable component
  displayMoreInfo(event) {
    this.countryName = event.detail;
    this.countryCovidInfo = this.covidInfo.find(
      item => item.country === this.countryName
    );
  }
}