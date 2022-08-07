export const fetcher = (...args) => fetch(...args).then(res => res.json());


export const API_ENDPOINT = "https://driptasenapati.github.io/cov19india/data/";


export const STATE_NAMES = {
  AP: 'Andhra Pradesh',
  AR: 'Arunachal Pradesh',
  AS: 'Assam',
  BR: 'Bihar',
  CT: 'Chhattisgarh',
  GA: 'Goa',
  GJ: 'Gujarat',
  HR: 'Haryana',
  HP: 'Himachal Pradesh',
  JH: 'Jharkhand',
  KA: 'Karnataka',
  KL: 'Kerala',
  MP: 'Madhya Pradesh',
  MH: 'Maharashtra',
  MN: 'Manipur',
  ML: 'Meghalaya',
  MZ: 'Mizoram',
  NL: 'Nagaland',
  OR: 'Odisha',
  PB: 'Punjab',
  RJ: 'Rajasthan',
  SK: 'Sikkim',
  TN: 'Tamil Nadu',
  TG: 'Telangana',
  TR: 'Tripura',
  UT: 'Uttarakhand',
  UP: 'Uttar Pradesh',
  WB: 'West Bengal',
  AN: 'Andaman and Nicobar Islands',
  CH: 'Chandigarh',
  DN: 'Dadra and Nagar Haveli and Daman and Diu',
  DL: 'Delhi',
  JK: 'Jammu and Kashmir',
  LA: 'Ladakh',
  LD: 'Lakshadweep',
  PY: 'Puducherry',
  TT: 'India'
};

const numberFormatter = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 1,
});


export const abbreviateNumber = (number) => {
  const numberCleaned = Math.round(Math.abs(number));
  if (numberCleaned < 1e3) return numberFormatter.format(Math.floor(number));
  else if (numberCleaned >= 1e3 && numberCleaned < 1e5)
    return numberFormatter.format(number / 1e3) + 'K';
  else if (numberCleaned >= 1e5 && numberCleaned < 1e7)
    return numberFormatter.format(number / 1e5) + 'L';
  else if (numberCleaned >= 1e7 && numberCleaned < 1e10)
    return numberFormatter.format(number / 1e7) + 'Cr';
  else if (numberCleaned >= 1e10 && numberCleaned < 1e14)
    return numberFormatter.format(number / 1e10) + 'K Cr';
  else if (numberCleaned >= 1e14)
    return numberFormatter.format(number / 1e14) + 'L Cr';
};

export const STATE_POP = {
  "AN": 419978,
  "AP": 52883163,
  "AR": 1528296,
  "AS": 34586234,
  "BR": 119461013,
  "CH": 1126705,
  "CT": 28566990,
  "DN": 343709,
  "DL": 18345784,
  "GA": 1542750,
  "GJ": 63907200,
  "HR": 27388008,
  "HP": 7316708,
  "JK": 13635010,
  "JH": 37329128,
  "KA": 66165886,
  "KL": 35330888,
  "LA": 279924,
  "LD": 64473,
  "MP": 82342793,
  "MH": 120837347,
  "MN": 3008546,
  "ML": 2968889,
  "MZ": 1205974,
  "NL": 1978502,
  "OR": 45429399,
  "PY": 1375592,
  "PB": 29611935,
  "RJ": 78230816,
  "SK": 610577,
  "TN": 38472769,
  "TG": 76481545,
  "TR": 3673917,
  "UP": 237095024,
  "UT": 10086292,
  "WB": 97694960
}