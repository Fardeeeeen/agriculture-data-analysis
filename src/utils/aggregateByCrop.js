export const aggregateByCrop = (data) => {
  const cropAggregates = {};

  data.forEach((item) => {
    const crop = item['Crop Name'];
    const cropYield = parseFloat(item['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'] || 0); // Convert to float and handle missing values
    const cultivationArea = parseFloat(item['Area Under Cultivation (UOM:Ha(Hectares))'] || 0); // Convert to float and handle missing values

    if (!cropAggregates[crop]) {
      cropAggregates[crop] = {
        totalYield: 0,
        totalCultivationArea: 0,
        count: 0,
      };
    }

    cropAggregates[crop].totalYield += cropYield;
    cropAggregates[crop].totalCultivationArea += cultivationArea;
    cropAggregates[crop].count += 1;
  });

  const aggregatedData = Object.keys(cropAggregates).map((crop) => ({
    crop,
    averageYield: (cropAggregates[crop].totalYield / cropAggregates[crop].count).toFixed(3),
    averageCultivationArea: (cropAggregates[crop].totalCultivationArea / cropAggregates[crop].count).toFixed(3),
  }));

  return aggregatedData;
};