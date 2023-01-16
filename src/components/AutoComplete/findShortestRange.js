export const findShortestRange = ({ currentPoint, pointInDatabase }) => {
    console.log(currentPoint);
    console.log(pointInDatabase);
  if (currentPoint & pointInDatabase) {
    const { lat: databaseLat, lon: databaseLng } = pointInDatabase;
    return Math.sqrt(
      Math.pow(currentPoint[0] - databaseLat,2) + Math.pow(currentPoint[1] - databaseLng,2)
    );
  }
};
