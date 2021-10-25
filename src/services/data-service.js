import { getBuildMode } from "../config/build-config";
import { fb } from "../config/firebase-config";
import { MAX_PAGE_SIZE, TIMESTAMP_FIELD } from "../utils/constants";
import { generate } from "../utils/unique-id-util";

const mode = getBuildMode();

function getFBCollection(name) {
  return fb.firestore().collection(name);
}

function getNextTransfersQuery() {
  return getFBCollection(mode.collection).orderBy(TIMESTAMP_FIELD).limit(MAX_PAGE_SIZE);
}

function getNextTransfersFromLastQuery(last) {
  return getNextTransfersQuery().startAt(last.timestamp);
}

export async function getTransfersByFromCityId(fromCityId) {
  console.log(fromCityId);
  try {
    const collection = await getFBCollection(mode.collection).where("from", "==", fromCityId).get();
    const data = collection.docs.map((doc) => {
      console.log(doc.data());
      return { ...doc.data(), _documentId: doc.id };
    });
    return data;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

export async function uploadTransfer(transfer) {
  if (!transfer.regularTrips) {
    delete transfer.regularTripsDays;
  }
  try {
    const collection = fb.firestore().collection(mode.collection);
    const response = await collection.add({
      ...transfer,
      _id: generate(),
      _timestamp: new Date().toJSON(),
    });
    // await uploadFilterFromCity(transfer.from);
    console.log("response", response);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

export async function uploadNewTransfer(transfer) {
  const response = await getTransfersByFromCityId().add(transfer);
  console.log("response", response);
  return response;
}

export async function uploadFilterFromCity(cityId) {
  const fromCity = getFilterFromCity(cityId);
  if (!fromCity) {
    const response = await getFBCollection(mode.filterFromCityCollection)
      .add({ _id: cityId, count: 1 })
      .then((response) => response.data);
    console.log(response);
  } else {
    const response = await getFBCollection(mode.filterFromCityCollection)
      .doc(fromCity._id)
      .update({ count: fromCity.count + 1 })
      .then(() => console.log("Document successfully updated!"));
    console.log(response);
  }
}

export async function getFilterFromCity(cityId) {
  const response = await getFBCollection(mode.filterFromCityCollection)
    .where("_id", "==", cityId)
    .then((response) => response.data);
  console.log(response);
  return response;
}

export async function getAllFiltersFromCity() {
  const collection = await getFBCollection(mode.filterFromCityCollection).get();
  const filtersFromCity = collection.docs.map((doc) => {
    return { ...doc.data(), _documentId: doc.id };
  });
  return filtersFromCity;
}

export async function getTransfers() {
  try {
    const collection = await getNextTransfersQuery().get();
    // rewrite("transfers-id-timestamp", "transfers-new");
    // rewrite("dev-transfers-id-timestamp", "dev-transfers-new");
    const transfers = collection.docs.map((doc) => {
      return { ...doc.data(), _documentId: doc.id };
    });
    console.log("received transfers: ", transfers);
    return transfers;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

export async function getAllTransfers() {
  try {
    const collection = await getFBCollection(mode.collection).get();
    const transfers = collection.docs.map((doc) => {
      return { ...doc.data(), _documentId: doc.id };
    });
    console.log("received all transfers: ", transfers);
    return transfers;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

export async function getNextTransfers(last) {
  try {
    const collection = await getNextTransfersFromLastQuery(last).get();
    const transfers = collection.docs.map((doc) => {
      return { ...doc.data(), _documentId: doc.id };
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
    console.log("old: ", v.data());
    const res = { ...v.data(), _id: generate(), _timestamp: new Date().toJSON() };
    delete res.timestamp;
    fb.firestore().collection(dbTo).add(res);
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
