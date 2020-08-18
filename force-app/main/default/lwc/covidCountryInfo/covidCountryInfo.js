import { LightningElement, api } from "lwc";

export default class CovidCountryInfo extends LightningElement {
  @api countryName;
  @api countryCovidInfo;
}