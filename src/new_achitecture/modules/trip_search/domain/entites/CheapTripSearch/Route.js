// routes.json
class Route {
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
let route = {"80009":{
        "from":8,
        "to":9,
        "price":190,
        "duration":560,
        "direct_routes":"80380,130281"}};

class DirectRoute {
    id;
    from; // start city id
    to; // finish city id
    transport;
    price;
    duration;
    constructor(id, from, to, transport, price, duration) {
        this.id = id;
        this.from = from;
        this.to = to;
        this.transport = transport;
        this.price = price;
        this.duration = duration;
    }

}
// example
let direct_route = {"80252": {
        "from":8,
        "to":9,
        "transport":1,
        "price":315,
        "duration":395}};
