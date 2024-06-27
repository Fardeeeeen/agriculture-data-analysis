export const aggregateByYear = (data) => {
  const yearAggregates = {};

  data.forEach((item) => {
    const year = item.Year.split(',')[1].trim(); // Extracting the year from "Financial Year (Apr - Mar), 1950"
    const crop = item['Crop Name'];
    const production = parseFloat(item['Crop Production (UOM:t(Tonnes))'] || 0); // Convert to float and handle missing values

    if (!yearAggregates[year]) {
      yearAggregates[year] = {
        maxCrop: crop,
        maxProduction: production,
        minCrop: crop,
        minProduction: production,
      };
    } else {
      if (production > yearAggregates[year].maxProduction) {
        yearAggregates[year].maxCrop = crop;
        yearAggregates[year].maxProduction = production;
      }
      if (production < yearAggregates[year].minProduction) {
        yearAggregates[year].minCrop = crop;
        yearAggregates[year].minProduction = production;
      }
    }
  });

  const aggregatedData = Object.keys(yearAggregates).map((year) => ({
    year,
    maxCrop: yearAggregates[year].maxCrop,
    minCrop: yearAggregates[year].minCrop,
  }));

  return aggregatedData;
};