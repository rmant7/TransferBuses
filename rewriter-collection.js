const firestore = require("firebase");
require("firebase/firestore");

const MIN_NUMBER = 16;
const MAX_NUMBER = 24;
const idLength = getRandomNumber(MIN_NUMBER, MAX_NUMBER);
const numbers = "0123456789";
const alphabetLowerCase = "abcdefghijklmnopqrstuvwxyz";
const alphabetUpperCase = alphabetLowerCase.toUpperCase();
const sumbols = `${numbers}${alphabetLowerCase}${alphabetUpperCase}`;
const FROM_COLLECTION = "transfers-id-timestamp";
const TO_COLLECTION = "transfers-new";
const FROM_CITY_COLLECTION = TO_COLLECTION + "-filter-from-city";
const TO_CITY_COLLECTION = TO_COLLECTION + "-filter-to-city";

const firebaseConfig = {
  apiKey: "AIzaSyCgKLUOLllUaX4lXWam1uDKKbNGF4WcUZY",
  authDomain: "transferbuses.firebaseapp.com",
  projectId: "transferbuses",
  storageBucket: "transferbuses.appspot.com",
  messagingSenderId: "766106301817",
  appId: "1:766106301817:web:f4eb8e224bbdcb7f17aba8",
};

const fb = firestore.initializeApp(firebaseConfig);

function generate() {
  let id = "";
  for (let i = 0; i < idLength; i++) {
    id += sumbols[getRandomNumber(0, sumbols.length - 1)];
  }
  return id;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getFBCollection(name) {
  return fb.firestore().collection(name);
}

async function uploadFilterToCity(cityId) {
  const toCity = await getFilterToCity(cityId);
  console.log("to city: ", toCity);
  if (!toCity) {
    const response = await getFBCollection().doc(cityId).set({ _id: cityId, count: 1 });
    console.log(response);
  } else {
    const response = await getFBCollection(TO_CITY_COLLECTION)
      .doc(toCity._id)
      .update({ count: toCity.count + 1 })
      .then(() => console.log("Document successfully updated!"));
    console.log(response);
  }
}

async function uploadFilterFromCity(cityId) {
  const fromCity = await getFilterFromCity(cityId);
  if (!fromCity) {
    const response = await getFBCollection(FROM_CITY_COLLECTION).doc(cityId).set({ _id: cityId, count: 1 });
    console.log(response);
  } else {
    await getFBCollection(FROM_CITY_COLLECTION)
      .doc(fromCity._id)
      .update({ count: fromCity.count + 1 })
      .then(() => console.log("Document successfully updated!"));
  }
}

async function getFilterFromCity(cityId) {
  const response = await getFBCollection(FROM_CITY_COLLECTION)
    .doc(cityId)
    .get()
    .then((v) => v.data());
  return response;
}

async function getFilterToCity(cityId) {
  const response = await getFBCollection(TO_CITY_COLLECTION)
    .doc(cityId)
    .get()
    .then((v) => v.data());
  return response;
}

async function rewrite(dbFrom, dbTo) {
  const c = await fb.firestore().collection(dbFrom).get();
  c.docs.forEach((v) => {
    const _id = generate();
    console.log("old: ", v.data());
    const res = { ...v.data(), _id, _timestamp: new Date().toJSON() };
    delete res.timestamp;
    uploadFilterFromCity(v.data().from);
    uploadFilterToCity(v.data().to);
    fb.firestore().collection(dbTo).doc(_id).set(res);
    console.log("new: ", res);
  });
}

// rewrite("transfers-id-timestamp", "transfers-new");
// rewrite("dev-transfers-id-timestamp", "dev-transfers-new");

console.log(generate());
