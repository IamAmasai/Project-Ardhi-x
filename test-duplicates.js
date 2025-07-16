// Test script to verify no duplicate wards
const { getWardsByCounty, KENYA_COUNTIES } = require('./lib/kenya-locations.ts');

console.log('Testing for duplicate wards...');

let duplicatesFound = false;

KENYA_COUNTIES.forEach(county => {
  const wards = getWardsByCounty(county.code);
  const uniqueWards = [...new Set(wards)];
  
  if (wards.length !== uniqueWards.length) {
    console.log(`❌ Duplicates found in ${county.name}:`, wards);
    duplicatesFound = true;
  } else {
    console.log(`✅ ${county.name}: ${wards.length} unique wards`);
  }
});

if (!duplicatesFound) {
  console.log('🎉 No duplicates found! All ward lists are clean.');
} else {
  console.log('⚠️ Duplicates still exist and need to be fixed.');
}
