const axios = require('axios');

const geonamesUsername = 'asglobal23';

exports.getStates = async (req, res) => {
    console.log("getStates");

    try {
        const countryGeonameId = 1269750;
        const response = await axios.get(`http://api.geonames.org/childrenJSON?geonameId=${countryGeonameId}&username=${geonamesUsername}`);
        const states = response.data.geonames;
        res.json(states || []);
    } catch (error) {
        console.error("Error fetching states:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error fetching states' });
    }
};

exports.getDistricts = async (req, res) => {
    const { stateGeonameId } = req.query; 
    console.log("getDistricts", stateGeonameId);
    try {
        const response = await axios.get(`http://api.geonames.org/childrenJSON?geonameId=${stateGeonameId}&username=${geonamesUsername}`);
        const districts = response.data.geonames;
        res.json(districts || []);
    } catch (error) {
        console.error("Error fetching districts:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error fetching districts' });
    }
};

exports.getCities = async (req, res) => {
    const { districtGeonameId } = req.query; 
    console.log('getCities', districtGeonameId);
    try {
        const response = await axios.get(`http://api.geonames.org/childrenJSON?geonameId=${districtGeonameId}&username=${geonamesUsername}`);
        const cities = response.data.geonames;
        res.json(cities || []);
    } catch (error) {
        console.error("Error fetching cities:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error fetching cities' });
    }
};

exports.getLocationByLatLng = async (req, res) => {
    const { lat, lng } = req.query;
    console.log("getLocationByLatLng", lat, lng);

    try {
        const response = await axios.get(`http://api.geonames.org/extendedFindNearbyJSON?lat=${lat}&lng=${lng}&username=${geonamesUsername}`);
        
        const nearestLocations = response.data.geonames;

        if (!nearestLocations || nearestLocations.length === 0) {
            return res.status(404).json({ error: 'No locations found' });
        }
        const state = nearestLocations.find(location => location.fcode === 'ADM1'); 
        const district = nearestLocations.find(location => location.fcode === 'ADM2'); 

        const city = nearestLocations.find(location => 
            location.fcode === 'PPLA2' || location.fcode === 'PPLA' || location.fcode === 'PPL'
        );

        res.json({
            state: state ? { name: state.name, geonameId: state.geonameId } : null,
            district: district ? { name: district.name, geonameId: district.geonameId } : null,
            city: city ? { name: city.name, geonameId: city.geonameId } : null
        });
    } catch (error) {
        console.error("Error fetching location:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error fetching location' });
    }
};
