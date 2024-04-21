export function parseData(apiData) {
  let reqData = {};

  let payload = apiData ? apiData.payload : [];

  if (payload.length > 0) {
    payload.forEach(data => {
      if (!reqData[data.asset_class]) {
        reqData[data.asset_class] = {
          expand: true,
          data: []
        };
      }
      reqData[data.asset_class].data.push(data);
    });
  }

  return reqData;
}
