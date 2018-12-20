import pick from 'lodash/pick';

import { default as activities } from '../data/activities.json';
import { default as favRestaurants } from '../data/fav.restaurants.json';

import YelpService from './YelpService';

export default class DateService {
    constructor() {
        this.yelpService = new YelpService();
    }
    
    _getRandom(list = []) {
        return list[Math.floor(Math.random() * list.length)];
    }
    
    _getRandomActivity(chillRageFactor) {
        const parsedActivities = activities.filter(activity => {
            if (chillRageFactor < 1/3) return activity.chillRageFactor < 1/3;
            if (chillRageFactor > 2/3) return activity.chillRageFactor > 2/3;
            return true;
        });
        return this._getRandom(parsedActivities);
    }
    
    _getRandomFavRestaurant() {
        return this._getRandom(favRestaurants);
    }
    
    async getDate(criteria) {
        const { chillRageFactor, fromFavRestaurants } = criteria;
        
        const activity = this._getRandomActivity(chillRageFactor);
        
        const { name, location } = pick(this._getRandomFavRestaurant(), ['name', 'location']);
        const restaurant = await (fromFavRestaurants
            ? this.yelpService.getRestaurant(name, location)
            : this.yelpService.getRestaurantNearby());
        
        return { activity, restaurant };
    }
}