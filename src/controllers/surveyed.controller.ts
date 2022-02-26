import { Response, NextFunction } from "express";
import { Surveyed } from "../entity/Surveyed.entity";
import { GenericRequest, ValidationError } from "../types";
import { Controller } from "./controller";
import { City, State }  from 'country-state-city';
import { ICity, IState } from "country-state-city/dist/lib/interface";

export class SurveyedController extends Controller {
  protected model = Surveyed;
  protected searchAbles = [ "name", "lastname", "city", "state", "country", "zip" ];

  validate(data: Surveyed): ValidationError[] {
    const { name, lastname, city, state, country = "MX", zip } = data;
    const errors: ValidationError[] = [];
    
    if(!name) errors.push(new ValidationError("name", "El nombre es requerido."));
    if(!lastname) errors.push(new ValidationError("lastname", "El apellido es requerido."));
    if(!['MX'].includes(country)) errors.push(new ValidationError("country", "País no soportado."));
    const states = State.getStatesOfCountry("MX").map((state: IState) => state.isoCode);
    if(!states.includes(state)) errors.push(new ValidationError("state", "El estado es invalido."));
    const cities = City.getCitiesOfState(country, state).map((city: ICity) => city.name);
    if(!cities.includes(city)) errors.push(new ValidationError("city", "La ciudad es invalida."));
    if(!/^\d{5}$/.test(zip)) errors.push(new ValidationError("zip", "Zip code invalido."));
  
    return errors;
  }

  async createOne(req: GenericRequest, res: Response, next: NextFunction) {
    try {
      let surveyed = req.body;
      const errors = await this.validate(surveyed);
      if (errors.length) return next(errors);
      const city = City.getCitiesOfState(surveyed.country || 'MX', surveyed.state).find(
        (city: ICity) => city.name === surveyed.city
      );
      const { identifiers: [ { id } ] } = await this.model.insert({ ...surveyed, lat: city?.latitude, lng: city?.longitude });
      surveyed = await this.model.findOne(id);
      return res.status(201).json(surveyed);
    } catch (error) {
      next(error);
    }
      // const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress ;
      // const ip2 = req.clientIp;
      // const { "user-agent": agent, host } = req.headers;
      // const countries = Country.getAllCountries().map((country: ICountry) => country.isoCode);
      //  ip
      //  ip_hostname
      //  ip_city
      //  ip_region
      //  ip_country
      //  ip_zip
      //  ip_org
      //  agent
      //  lat
      //  lng
      //  device
      //  device_type
  }

  async updateOne(req: GenericRequest, res: Response, next: NextFunction) {
    try {
      const surveyed = req.docFromId as Surveyed;
      const errors = await this.validate({ ...surveyed, ...req.body });
      if (errors.length) return next(errors);

      let lat = surveyed.lat;
      let lng = surveyed.lng;
      if (req.body.city) {
        const city = City.getCitiesOfState(surveyed.country || 'MX', surveyed.state).find(
          (city: ICity) => city.name === surveyed.city
        );
        lat = city?.latitude as string;
        lng = city?.longitude as string;
      }

      await this.model.update(surveyed.id, { ...req.body, lat, lng });
      const question = await this.model.findOne(surveyed.id);
      return res.status(201).json(question);
    } catch (error) {
      next(error);
    }
  }
}
