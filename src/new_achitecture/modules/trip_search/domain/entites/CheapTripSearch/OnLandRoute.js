class OnLandRoute {
    id;
    from; // start city id
    to; // finish city id
    price; //euro
    duration; //min
    direct_routes; // ids of other routes
    constructor(id, from, to, price, duration, direct_routes) {
        this.id = id;
        this.from = from;
        this.to = to;
        this.price = price;
        this.duration = duration;
        this.direct_routes = direct_routes;
    }

}

// example
let onLandRoute = {"90025":{
        "from":9,
        "to":25,
        "price":20,
        "duration":760,
        "direct_routes":"90044"}};
