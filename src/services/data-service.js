import { getBuildMode } from "../config/build-config";
import { fb } from "../config/firebase-config";
import { MAX_PAGE_SIZE, TIMESTAMP_FIELD } from "../utils/constants";
import { generate } from "../utils/unique-id-util";

const mode = getBuildMode();

function getFBCollection(name) {
  return fb.firestore().collection(name);
}

function getFBTransfersCollection() {
  return fb.firestore().collection(mode.collection);
}

function getFBTransfersLimitedCollection() {
  return fb.firestore().collection(mode.collection).limit(MAX_PAGE_SIZE);
}

function getSortedTransfersQuery() {
  return getFBTransfersLimitedCollection().orderBy(TIMESTAMP_FIELD, "desc");
}

function getNextTransfersFromLastQuery(last) {
  return getSortedTransfersQuery().startAt(last._timestamp);
}

export async function getTransfersBy(filters) {
  let queries = getFBTransfersCollection();
  filters.forEach((f) => (queries = queries.where(f.key, "==", f.value)));
  console.log(queries);
  try {
    const collection = await queries.get();
    const data = collection.docs.map((doc) => {
      return doc.data();
    });
    return data;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

export async function uploadTransfer(transfer) {
  try {
    const _id = generate();
    const response = await getFBTransfersCollection()
      .doc(_id)
      .set({
        ...transfer,
        _id,
        _timestamp: new Date().toJSON(),
      });
    await uploadFilterFromCity(transfer.from);
    await uploadFilterToCity(transfer.to);
    console.log("response", response);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

export async function uploadNewTransfer(transfer) {
  try {
    const res = {
      ...transfer,
      _id: generate(),
      _timestamp: new Date().toJSON(),
    };
    const response = await getFBTransfersCollection().doc(res._id).set(res);
    await uploadFilterFromCity(transfer.from);
    await uploadFilterToCity(transfer.to);
    console.log("response", response);
    return res;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

export async function uploadFilterToCity(cityId) {
  const toCity = await getFilterToCity(cityId);
  console.log(toCity);
  if (!toCity) {
    const response = await getFBCollection(mode.filterToCityCollection)
      .doc(cityId)
      .set({ _id: cityId, count: 1 });
    console.log(response);
  } else {
    const response = await getFBCollection(mode.filterToCityCollection)
      .doc(toCity._id)
      .update({ count: toCity.count + 1 })
      .then(() => console.log("Document successfully updated!"));
    console.log(response);
  }
}

export async function uploadFilterFromCity(cityId) {
  const fromCity = await getFilterFromCity(cityId);
  if (!fromCity) {
    const response = await getFBCollection(mode.filterFromCityCollection)
      .doc(cityId)
      .set({ _id: cityId, count: 1 });
    console.log(response);
  } else {
    await getFBCollection(mode.filterFromCityCollection)
      .doc(fromCity._id)
      .update({ count: fromCity.count + 1 })
      .then(() => console.log("Document successfully updated!"));
  }
}

export async function getFilterToCity(cityId) {
  const response = await getFBCollection(mode.filterToCityCollection)
    .doc(cityId)
    .get()
    .then((v) => v.data());
  return response;
}

export async function getAllFiltersToCity() {
  const collection = await getFBCollection(mode.filterToCityCollection).get();
  const filters = collection.docs.map((doc) => doc.data());
  return filters;
}

export async function getFilterFromCity(cityId) {
  const response = await getFBCollection(mode.filterFromCityCollection)
    .doc(cityId)
    .get()
    .then((v) => v.data());
  return response;
}

export async function getAllFiltersFromCity() {
  const collection = await getFBCollection(mode.filterFromCityCollection).get();
  const filters = collection.docs.map((doc) => doc.data());
  return filters;
}

export async function getTransfers() {
  try {
    const collection = await getSortedTransfersQuery().get();
    // rewrite("transfers-id-timestamp", "transfers-new");
    // rewrite("dev-transfers-id-timestamp", "dev-transfers-new");
    const transfers = collection.docs.map((doc) => doc.data());
    console.log("received transfers: ", transfers);
    return transfers;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

export async function getTransfer(id) {
  try {
    const doc = await getFBTransfersCollection().doc(id).get();
    // const transfer = collection.docs.map((doc) => {
    //   return { ...doc.data(), _documentId: doc.id };
    // });
    const transfer = doc.data();
    console.log("received transfer doc: ", doc);
    return transfer;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

export async function getAllTransfers() {
  try {
    const collection = await getFBTransfersCollection().get();
    const transfers = collection.docs.map((doc) => doc.data());
    console.log("received all transfers: ", transfers);
    return transfers;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

export async function getNextTransfers(last) {
  try {
    const collection = await queries.get();
    const transfers = collection.docs.map((doc) => {
      return doc.data();
    });
    console.log("next transfers: ", transfers);
    return transfers;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

async function rewrite(dbFrom, dbTo) {
  const c = await fb.firestore().collection(dbFrom).get();
  c.docs.forEach((v) => {
    const _id = generate();
    console.log("old: ", v.data());
    const res = { ...v.data(), _id, _timestamp: new Date().toJSON() };
    delete res.timestamp;
    // uploadFilterFromCity(v.data().from);
    // uploadFilterToCity(v.data().to);
    fb.firestore().collection(dbTo).doc(_id).set(res);
    console.log("new: ", res);
  });
}

// export async function getMyLots(uid){
//     try{
//         const lotsIds = (await fb.firestore().collection("users").doc(uid).get()).data().lotsIds;
//         var lots = [];
//         if(!lotsIds){
//             return lots;
//         }
//         console.log("My lots:",lots);
//         for(let i = 0; i < lotsIds.length; i++){
//             var lot = (await fb.firestore().collection("lots").doc(lotsIds[i]).get()).data();
//             lots.push({...lot,id:lotsIds[i]});
//         }
//         console.log(lotsIds);
//         return lots;
//     }catch(error){
//         return Promise.reject(error);
//     }
// }
//
//
// export async function getLotById(id){
//     try{
//         const lot = await fb.firestore().collection("lots").doc(id).get();
//         console.log({...lot.data(),id:id});
//         return {...lot.data(),id:id};
//     }catch(error){
//         return Promise.reject(error);
//     }
// }
// export async function deleteLotByid(uid,id){
//     try{
//         const snap = await fb.firestore().collection("lots").doc(id).collection("buyers").get();
//         const users = snap.docs.map(doc => doc.id);
//         console.log("deletedeeeeeee",users)
//         for(var i = 0; i < users.length;i++){
//             await unsubscribeFromLot(users[i],id);
//         }
//
//
//         const deleted = await fb.firestore().collection("lots").doc(id).delete();
//         const ref = fb.firestore().collection("users").doc(uid);
//         await ref.update({
//             lotsIds:firebase.firestore.FieldValue.arrayRemove(id)
//         })
//
//         // return deleted;
//     }catch(error){
//         return Promise.reject(error);
//     }
// }
//
//
// export async function checkBuying(uid,id){
//     if(!uid){
//         return false;
//     }
//     const doc =  await fb.firestore().collection("lots").doc(id).collection("buyers").doc(uid).get();
//     if(doc.exists){
//         console.log("купил уже");
//         return true;
//     }else{
//         console.log("еще не купил");
//         return false;
//     }
// }
//
// export async function subscribeOnLot(uid,id,amount){
//     amount = parseInt(amount);
//     try{
//         const isBought =await checkBuying(uid,id)
//         if(isBought){
//             throw "already bought";
//         }
//
//         const lot = await getLotById(id);
//
//         console.log("Gotted lot:",lot,"id of lot: ",id);
//
//         if(lot.amount + parseInt(amount) > lot.totalAmount){
//             throw "too big number";
//         }
//
//
//
//         const collection = fb.firestore().collection("lots").doc(id).collection("buyers");
//         await collection.doc(uid).set({amount});
//         const lotRef = fb.firestore().collection("lots").doc(id);
//         console.log();
//         if(lot.amount + amount === lot.totalAmount){
//             await lotRef.update({
//                 finished:true
//             })
//         }
//
//         await lotRef.update({
//             amount:firebase.firestore.FieldValue.increment(amount)
//         })
//
//
//         const userRef =  fb.firestore().collection("users").doc(uid);
//         await userRef.update({
//             groupIds:firebase.firestore.FieldValue.arrayUnion(id)
//         })
//     }catch(error){
//         return Promise.reject(error);
//     }
// }
//
// export async function unsubscribeFromLot(uid,id){
//     console.log("ID", id);
//     console.log("UID", uid);
//     const ref =  fb.firestore().collection("lots").doc(id).collection("buyers").doc(uid);
//     const amount =  parseInt((await ref.get()).data().amount);
//     console.log("AMOUNT", amount);
//
//     await ref.delete();
//     const lotRef = fb.firestore().collection("lots").doc(id);
//     await lotRef.update({
//         amount:firebase.firestore.FieldValue.increment(-amount),
//         finished:false
//     })
//
//
//     const userRef = fb.firestore().collection("users").doc(uid);
//     await userRef.update({
//         groupIds:firebase.firestore.FieldValue.arrayRemove(id)
//     })
// }
// export async function getMyGroups(uid){
//     try{
//         const lotsIds = (await fb.firestore().collection("users").doc(uid).get()).data().groupIds;
//         if(!lotsIds){
//             return [];
//         }
//         var lots = [];
//         for(let i = 0; i < lotsIds.length; i++){
//            var lot = (await fb.firestore().collection("lots").doc(lotsIds[i]).get()).data();
//            lots.push({...lot,id:lotsIds[i]});
//         }
//         console.log(lots);
//         return lots;
//     }catch(error){
//         return Promise.reject(error);
//     }
// }
