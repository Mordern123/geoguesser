const REGIONS = [
    { name: "North America", minLat: 24.396308, maxLat: 49.384358, minLng: -125.000000, maxLng: -66.934570 },
    { name: "United Kingdom", minLat: 49.000000, maxLat: 61.000000, minLng: -8.000000, maxLng: 2.000000 },
    { name: "France", minLat: 41.000000, maxLat: 51.000000, minLng: -5.000000, maxLng: 9.000000 },
    { name: "Germany", minLat: 47.000000, maxLat: 55.000000, minLng: 5.000000, maxLng: 15.000000 },
    { name: "Italy", minLat: 36.000000, maxLat: 47.000000, minLng: 6.000000, maxLng: 18.000000 },
    { name: "Spain", minLat: 36.000000, maxLat: 44.000000, minLng: -9.000000, maxLng: 3.000000 },
    { name: "Netherlands", minLat: 50.750000, maxLat: 53.500000, minLng: 3.200000, maxLng: 7.220000 },
    { name: "Switzerland", minLat: 45.800000, maxLat: 47.800000, minLng: 5.900000, maxLng: 10.500000 },
    { name: "Austria", minLat: 46.370000, maxLat: 49.020000, minLng: 9.530000, maxLng: 17.160000 },
    { name: "Sweden", minLat: 55.000000, maxLat: 69.000000, minLng: 11.000000, maxLng: 24.000000 },
    { name: "Norway", minLat: 57.000000, maxLat: 71.000000, minLng: 4.000000, maxLng: 31.000000 },
    { name: "Denmark", minLat: 54.500000, maxLat: 57.750000, minLng: 8.000000, maxLng: 13.000000 },
    { name: "Finland", minLat: 59.800000, maxLat: 70.100000, minLng: 20.550000, maxLng: 31.580000 },
    { name: "Poland", minLat: 49.000000, maxLat: 55.000000, minLng: 14.000000, maxLng: 24.000000 },
    { name: "Czech Republic", minLat: 48.550000, maxLat: 51.060000, minLng: 12.090000, maxLng: 18.860000 },
    { name: "Portugal", minLat: 36.950000, maxLat: 42.150000, minLng: -9.500000, maxLng: -6.180000 },
    { name: "Greece", minLat: 34.800000, maxLat: 41.750000, minLng: 19.370000, maxLng: 28.250000 },
    { name: "Hungary", minLat: 45.740000, maxLat: 48.590000, minLng: 16.110000, maxLng: 22.900000 },
    { name: "Ireland", minLat: 51.420000, maxLat: 55.380000, minLng: -10.680000, maxLng: -5.990000 },
    { name: "Romania", minLat: 43.620000, maxLat: 48.270000, minLng: 20.260000, maxLng: 29.720000 },
    { name: "Bulgaria", minLat: 41.230000, maxLat: 44.220000, minLng: 22.350000, maxLng: 28.610000 },
    { name: "Croatia", minLat: 42.380000, maxLat: 46.550000, minLng: 13.490000, maxLng: 19.450000 },
    { name: "Japan", minLat: 32.000000, maxLat: 45.000000, minLng: 130.000000, maxLng: 145.000000 },
    { name: "South Korea", minLat: 33.000000, maxLat: 38.000000, minLng: 126.000000, maxLng: 129.000000 },
    { name: "Australia", minLat: -43.000000, maxLat: -10.000000, minLng: 113.000000, maxLng: 153.000000 },
    { name: "New Zealand", minLat: -47.000000, maxLat: -34.000000, minLng: 166.000000, maxLng: 178.000000 },
    { name: "Brazil", minLat: -33.000000, maxLat: 5.000000, minLng: -73.000000, maxLng: -34.000000 },
    { name: "Argentina", minLat: -55.000000, maxLat: -22.000000, minLng: -73.000000, maxLng: -53.000000 },
    { name: "South Africa", minLat: -34.000000, maxLat: -22.000000, minLng: 16.000000, maxLng: 32.000000 },
    { name: "India", minLat: 8.000000, maxLat: 35.000000, minLng: 68.000000, maxLng: 97.000000 },
    { name: "Thailand", minLat: 5.000000, maxLat: 20.000000, minLng: 97.000000, maxLng: 105.000000 },
    { name: "Indonesia", minLat: -10.000000, maxLat: 6.000000, minLng: 95.000000, maxLng: 141.000000 },
    { name: "Malaysia", minLat: 0.000000, maxLat: 7.000000, minLng: 99.000000, maxLng: 119.000000 },
    { name: "Singapore", minLat: 1.236500, maxLat: 1.470500, minLng: 103.605000, maxLng: 104.007000 },
    { name: "Taiwan", minLat: 21.900000, maxLat: 25.300000, minLng: 120.000000, maxLng: 122.000000 },
    { name: "Hong Kong", minLat: 22.153000, maxLat: 22.561000, minLng: 113.837000, maxLng: 114.434000 },
    { name: "Mexico", minLat: 14.000000, maxLat: 32.000000, minLng: -117.000000, maxLng: -86.000000 },
    { name: "Canada", minLat: 41.000000, maxLat: 70.000000, minLng: -141.000000, maxLng: -52.000000 },
    { name: "United Kingdom", minLat: 49.000000, maxLat: 61.000000, minLng: -8.000000, maxLng: 2.000000 },
    { name: "France", minLat: 41.000000, maxLat: 51.000000, minLng: -5.000000, maxLng: 9.000000 },
    { name: "Germany", minLat: 47.000000, maxLat: 55.000000, minLng: 5.000000, maxLng: 15.000000 },
    { name: "Italy", minLat: 36.000000, maxLat: 47.000000, minLng: 6.000000, maxLng: 18.000000 },
    { name: "Spain", minLat: 36.000000, maxLat: 44.000000, minLng: -9.000000, maxLng: 3.000000 },
    { name: "Netherlands", minLat: 50.750000, maxLat: 53.500000, minLng: 3.200000, maxLng: 7.220000 },
    { name: "Switzerland", minLat: 45.800000, maxLat: 47.800000, minLng: 5.900000, maxLng: 10.500000 },
    { name: "Austria", minLat: 46.370000, maxLat: 49.020000, minLng: 9.530000, maxLng: 17.160000 },
    { name: "Sweden", minLat: 55.000000, maxLat: 69.000000, minLng: 11.000000, maxLng: 24.000000 },
    { name: "Norway", minLat: 57.000000, maxLat: 71.000000, minLng: 4.000000, maxLng: 31.000000 },
    { name: "Denmark", minLat: 54.500000, maxLat: 57.750000, minLng: 8.000000, maxLng: 13.000000 },
    { name: "Finland", minLat: 59.800000, maxLat: 70.100000, minLng: 20.550000, maxLng: 31.580000 },
];

export default REGIONS;