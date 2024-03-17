class FlyingRoute {
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
let flyingRoute = {"80009": {
        "from":8,
        "to":9,
        "price":190,
        "duration":560,
        "direct_routes":"80380,130281"}};
