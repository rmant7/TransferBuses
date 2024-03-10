// direct_routes.json;

class TravelInfo {
    route;
    from; // start city id
    to; // finish city id
    transport; // transport id
    price; //euro
    duration; //min
    constructor(route, from, to, transport, price, duration) {
        this.route = route;
        this.from = from;
        this.to = to;
        this.transport = transport;
        this.price = price;
        this.duration = duration;

    }

}

// example
let travelInfo = {
    'route': "80252",
    // Bellow: info from direct route
    "from":8,
    "to":9,
    "transport":1,
    "price":315,
    "duration":395,
};