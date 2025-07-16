export interface County {
  code: string
  name: string
}

export interface Ward {
  id: number
  name: string
  countyCode: string
}

export const KENYA_COUNTIES: County[] = [
  { code: "001", name: "Mombasa" },
  { code: "002", name: "Kwale" },
  { code: "003", name: "Kilifi" },
  { code: "004", name: "Tana River" },
  { code: "005", name: "Lamu" },
  { code: "006", name: "Taita-Taveta" },
  { code: "007", name: "Garissa" },
  { code: "008", name: "Wajir" },
  { code: "009", name: "Mandera" },
  { code: "010", name: "Marsabit" },
  { code: "011", name: "Isiolo" },
  { code: "012", name: "Meru" },
  { code: "013", name: "Tharaka-Nithi" },
  { code: "014", name: "Embu" },
  { code: "015", name: "Kitui" },
  { code: "016", name: "Machakos" },
  { code: "017", name: "Makueni" },
  { code: "018", name: "Nyandarua" },
  { code: "019", name: "Nyeri" },
  { code: "020", name: "Kirinyaga" },
  { code: "021", name: "Murang'a" },
  { code: "022", name: "Kiambu" },
  { code: "023", name: "Turkana" },
  { code: "024", name: "West Pokot" },
  { code: "025", name: "Samburu" },
  { code: "026", name: "Trans-Nzoia" },
  { code: "027", name: "Uasin Gishu" },
  { code: "028", name: "Elgeyo-Marakwet" },
  { code: "029", name: "Nandi" },
  { code: "030", name: "Baringo" },
  { code: "031", name: "Laikipia" },
  { code: "032", name: "Nakuru" },
  { code: "033", name: "Narok" },
  { code: "034", name: "Kajiado" },
  { code: "035", name: "Kericho" },
  { code: "036", name: "Bomet" },
  { code: "037", name: "Kakamega" },
  { code: "038", name: "Vihiga" },
  { code: "039", name: "Bungoma" },
  { code: "040", name: "Busia" },
  { code: "041", name: "Siaya" },
  { code: "042", name: "Kisumu" },
  { code: "043", name: "Homa Bay" },
  { code: "044", name: "Migori" },
  { code: "045", name: "Kisii" },
  { code: "046", name: "Nyamira" },
  { code: "047", name: "Nairobi" }
]

export const COUNTY_WARDS: Record<string, string[]> = {
  "047": [ // Nairobi
    "Eastleigh North", "Eastleigh South", "Airbase", "Pumwani", "Pangani", "Ziwani Kariokor",
    "Landimawe", "Nairobi Central", "Ngara", "Milimani", "Kilimani", "Kawangware", "Gatina",
    "Kileleshwa", "Kabiro", "Mountain View", "Karura", "Parklands Highridge", "Kitisuru",
    "Lavington", "Kayole North", "Kayole Central", "Kayole South", "Komarock",
    "Matopeni Spring Valley", "Umoja I", "Umoja II", "Mowlem", "Kariobangi North",
    "Dandora Area I", "Dandora Area II", "Dandora Area III", "Dandora Area IV",
    "Kariobangi South", "Embakasi", "Nyayo Highrise", "Pipeline", "Kware", "Mukuru kwa Njenga",
    "Mukuru kwa Reuben", "Imara Daima", "Mihango", "Utawala", "Uthiru Kinoo", "Kabete",
    "Uthiru", "Githurai", "Githurai 44", "Zimmerman", "Roysambu", "Kahawa West", "Kahawa",
    "Clay City", "Kasarani", "Mwiki", "Ruaraka", "Baba Dogo", "Utalii", "Mathare North",
    "Lucky Summer", "Kiamaiko", "Huruma", "Ngei", "Mlango Kubwa"
  ],
  "001": [ // Mombasa
    "Changamwe", "Jomba", "Port Reitz", "Kipevu", "Airport", "Chaani", "Miritini",
    "Junda", "Bamburi", "Mkomani", "Shanzu", "Frere Town", "Ziwa la Ng'ombe",
    "Kongowea", "Kadzandani", "Jomba Kuu", "Magogoni", "Shimanzi",
    "Ganjoni", "Tudor", "Tononoka", "Majengo", "Mvita", "Stone Town",
    "Shika Adabu", "Gulshan", "Haile Selassie", "Makadara", "Old Town", "Mji wa Kale"
  ],
  "022": [ // Kiambu
    "Githunguri", "Githiga", "Ikinu", "Ngewa", "Komothai", "Kiambu", "Township",
    "Riabai", "Ndumberi", "Theta", "Juja", "Witeithie", "Kalimoni", "Murera",
    "Theta", "Thika", "Hospital", "Kamenu", "Gatuanyaga", "Ngoliba", "Kiganjo", "Gatundu South",
    "Kiamwangi", "Ndarugu", "Gatongora", "Kakuzi Mitubiri", "Mugutha", "Kimende", "Ngenda",
    "Kijabe", "Lari Kirenga", "Kinale", "Kamburu", "Limuru Central", "Ndeiya", "Limuru East",
    "Bibirioni", "Limuru", "Kabete", "Muguga", "Nyadhuna", "Gitaru"
  ],
  "032": [ // Nakuru
    "Nakuru East", "Biashara", "Flamingo", "Menengai West", "Pipeline", "Rhoda", "Shabaab",
    "Kaptembwo", "Kapkures", "Barut", "Kabatini", "Lanet Umoja", "Nakuru West", "Bahati",
    "Dundori", "Kabazi", "Kiamaina", "Lanet", "London", "Mau Narok", "Menengai", "Mosop",
    "Nessuit", "Nakuru", "Elementaita", "Gilgil", "Malewa West", "Mbaruk Eburu", "Murinduko",
    "Naivasha East", "Olkaria", "Viwandani", "Hells Gate", "Lake View", "Mai Mahiu", "Maraigushu",
    "Biashara", "Crater", "Hells Gate", "Kongasis", "Maiella", "Mau Narok", "Menengai",
    "Biashara", "Mosop", "Nakuru East", "Rhoda", "Shabaab", "Subukia"
  ],
  "042": [ // Kisumu
    "Market Milimani", "Kondele", "Nyalenda A", "Nyalenda B", "Migosi", "Shaurimoyo Kaloleni",
    "Robert Ouko", "Kolwa Central", "Kolwa East", "Manyatta B", "Nyalenda A", "Kolwa West",
    "South West Kisumu", "Central Kisumu", "Kisumu North", "West Kisumu", "North West Kisumu",
    "Migosi", "Shaurimoyo", "Market Milimani", "Kondele", "Nyalenda", "Kolwa", "Manyatta",
    "Ahero", "Awasi Onjiko", "Ombeyi", "Chemelil", "Muhoroni", "Masogo", "Chemilil",
    "Kibigori", "Songhor", "Fort Ternan", "Chemelil", "Muhoroni", "Miwani", "Ombeyi",
    "Ahero", "Awasi", "Kaloleni", "Kondele", "Central Kisumu", "Market Milimani",
    "Migosi", "Shaurimoyo", "Nyalenda A", "Nyalenda B", "Kolwa Central", "Kolwa East",
    "Kolwa West", "South West Kisumu", "North West Kisumu", "West Kisumu", "Kisumu North"
  ]
  // Add more counties as needed...
}

export const getWardsByCounty = (countyCode: string): string[] => {
  const wards = COUNTY_WARDS[countyCode] || []
  // Remove duplicates to prevent React key conflicts
  return [...new Set(wards)]
}

export const getCountyByCode = (code: string) => {
  return KENYA_COUNTIES.find(county => county.code === code)
}

export const getCountyByName = (name: string) => {
  return KENYA_COUNTIES.find(county => county.name === name)
}
