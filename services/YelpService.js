import { Location, Permissions } from 'expo';
import get from 'lodash/get';

import { yelpApiKey } from '../constants/API';

const url = 'https://api.yelp.com/v3/businesses/search';

const params = {
    method: 'GET',
    headers: { Authorization: `Bearer ${yelpApiKey}` },
};

export default class YelpService {
    
    async getRestaurant(name, location) {
        const response = await fetch(`${url}?term=${name}&location=${location}`, params);
        const json = await response.json();
        return this._formatRestaurant(json.businesses[0]);
    }
    
    async getRestaurantNearby() {
        const { coords } = await this._getLocationAsync();
        const response = await fetch(`${url}?latitude=${coords.latitude}&longitude=${coords.longitude}`, params);
        const json = await response.json();
        return this._formatRestaurant(json.businesses[0]);
    }
    
    _formatRestaurant(restaurant) {
        if (!restaurant) return {};
        return {
            categories: restaurant.categories,
            coordinates: restaurant.coordinates,
            displayAddress: `${get(restaurant, 'location.address1')}, ${get(restaurant, 'location.city')}, ${get(restaurant, 'location.state')}`,
            imageUrl: restaurant.image_url,
            name: restaurant.name,
            price: restaurant.price,
            rating: restaurant.rating,
            reviewCount: restaurant.review_count,
            url: restaurant.url,
        }
    }
    
    async _getLocationAsync() {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            console.log('Permission to access location was denied')
        }
        return await Location.getCurrentPositionAsync({});
    };
    
}