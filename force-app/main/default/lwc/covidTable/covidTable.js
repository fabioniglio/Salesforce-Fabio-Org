import { LightningElement, api } from "lwc";

export default class CovidTable extends LightningElement {
  @api covidInfo;

  // called when user types in the search box
  handleChange(event) {
    const countryName = event.target.value;
    // Debouncing this method: Do not throw the filter event unless user has finished
    // typing the country name is search box
    window.clearTimeout(this.delayTimeout);
    this.delayTimeout = setTimeout(() => {
      this.filterList(countryName);
    }, 1000);
  }

  // throws an event which is handled by covidInfo
  filterList(countryName) {
    const valueChangeEvent = new CustomEvent("filter", {
      detail: countryName
    });
    this.dispatchEvent(valueChangeEvent);
  }

  // throws an event which is handled by covidInfo
  handleInfoIconClick(event) {
    const infoIconClickEvent = new CustomEvent("moreinfo", {
      detail: event.target.value
    });
    this.dispatchEvent(infoIconClickEvent);
  }
}