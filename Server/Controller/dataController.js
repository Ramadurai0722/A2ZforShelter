
const axios = require('axios');

// Replace with your GeoNames username
const geonamesUsername = 'asglobal23';
exports.getStates = async (req, res) => {
    console.log("getStates");

    try {
        // GeoNames "children" endpoint to fetch the first-level administrative divisions (states) of a country
        const countryGeonameId = 1269750; // Replace with the GeoNames ID for the country (e.g., 1269750 for India)
        const response = await axios.get(`http://api.geonames.org/childrenJSON?geonameId=${countryGeonameId}&username=${geonamesUsername}`);
        // console.log("Response Data:", response.data);

        // Assuming the states are returned in the 'geonames' array
        const states = response.data.geonames;
        res.json(states || []);
    } catch (error) {
        console.error("Error fetching states:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error fetching states' });
    }
};

exports.getDistricts = async (req, res) => {

    const { stateGeonameId } = req.query; // The state ID passed as a query parameter
    console.log("getDistricts", stateGeonameId);
    try {
        // GeoNames "children" endpoint to fetch the second-level administrative divisions (districts) of a state
        const response = await axios.get(`http://api.geonames.org/childrenJSON?geonameId=${stateGeonameId}&username=${geonamesUsername}`);
        // console.log("Response Data:", response.data);

        // Assuming the districts are returned in the 'geonames' array
        const districts = response.data.geonames;
        res.json(districts || []);
    } catch (error) {
        console.error("Error fetching districts:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error fetching districts' });
    }
};

exports.getCities = async (req, res) => {
    const { districtGeonameId } = req.query; // The district ID passed as a query parameter
    console.log('getCities', districtGeonameId);
    try {
        // GeoNames "children" endpoint to fetch cities or towns in a district
        const response = await axios.get(`http://api.geonames.org/childrenJSON?geonameId=${districtGeonameId}&username=${geonamesUsername}`);
        const cities = response.data.geonames;
        res.json(cities || []);
    } catch (error) {
        console.error("Error fetching cities:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error fetching cities' });
    }
};
