import React, { useEffect, useContext, useState } from 'react';
import { SearchContext } from '../context/searchcontext';
import { Box, Typography, Snackbar, Button } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import config from '../../../../config';
import './searchresult.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Searchresult = () => {
    const { searchValues } = useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [likeCounts, setLikeCounts] = useState({});
    const [snackbarType, setSnackbarType] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    const categories = [
        { name: 'Cement', endpoint: `${config.apiURL}/cementRoutes/cement` },
        { name: 'Houses', endpoint: `${config.apiURL}/houseRoute/houses` },
        { name: 'Interior', endpoint: `${config.apiURL}/interiorRoute/interior` },
        { name: 'PG Hostels', endpoint: `${config.apiURL}/pgHostelRoute/pgHostel` },
        { name: 'Pipe Wires', endpoint: `${config.apiURL}/pipeWiresRoute/pipewires` },
        { name: 'Sand', endpoint: `${config.apiURL}/sandRoute/sand` },
        { name: 'Steel', endpoint: `${config.apiURL}/steelRoute/steel` },
        { name: 'Stone', endpoint: `${config.apiURL}/stoneRoute/stone` },
        { name: 'Wood', endpoint: `${config.apiURL}/woodRoute/wood` },
    ];
    console.log(searchValues);
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const promises = categories.map(category =>
                    fetch(category.endpoint).then(response => response.json())
                );

                const results = await Promise.all(promises);
                const allItems = results.flat();
                console.log("Fetched items:", allItems);
                setItems(allItems);

                const counts = await Promise.all(allItems.map(item =>
                    axios.get(`${config.apiURL}/favourites/count/${item._id}`)
                ));
                const likeCountMap = counts.reduce((acc, curr, index) => {
                    acc[allItems[index]._id] = curr.data.count;
                    return acc;
                }, {});
                setLikeCounts(likeCountMap);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        const fetchFavourites = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.warn('User ID is not set in local storage');
                return;
            }
            try {
                const response = await axios.get(`${config.apiURL}/favourites/all/${userId}`);
                setFavourites(response.data);
            } catch (error) {
                console.error('Error fetching favourites:', error);
            }
        };

        fetchItems();
        fetchFavourites();
    }, []);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleAddToFavourites = async (itemId) => {
        const userId = localStorage.getItem('userId');

        if (!userId) {
            setSnackbarMessage("You need to log in to add to favourites!");
            setSnackbarType('error');
            setSnackbarOpen(true);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            return;
        }

        try {
            if (favourites.includes(itemId)) {
                await axios.delete(`${config.apiURL}/favourites/remove`, { params: { userId, productId: itemId } });
                setFavourites(prevFavourites => prevFavourites.filter(id => id !== itemId));
                setSnackbarMessage("Item removed from favourites");
                setSnackbarType('success');
            } else {
                await axios.post(`${config.apiURL}/favourites/add`, { userId, productId: itemId });
                setFavourites(prevFavourites => [...prevFavourites, itemId]);
                setSnackbarMessage("Item added to favourites");
                setSnackbarType('success');
            }
            const { data: countData } = await axios.get(`${config.apiURL}/favourites/count/${itemId}`);
            setLikeCounts(prevCounts => ({ ...prevCounts, [itemId]: countData.count }));
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error updating favourites:', error);
            setSnackbarMessage("Error updating favourites");
            setSnackbarType('error');
            setSnackbarOpen(true);
        }
    };


    const handleViewDetails = (category, id) => {
        console.log("Category:", category, "ID:", id);
        switch (category) {
            case 'pghostel':
                navigate(`/productviewpg/${id}`);
                break;
            case 'house':
                navigate(`/houseview/${id}`);
                break;
            case 'cement':
                navigate(`/cementview/${id}`);
                break;
            case 'interior':
                navigate(`/interiorview/${id}`);
                break;
            case 'catering':
                navigate(`/cateringview/${id}`);
                break;
            case 'pipewire':
                navigate(`/pipe&wireview/${id}`);
                break;
            case 'sand':
                navigate(`/sandview/${id}`);
                break;
            case 'steel':
                navigate(`/steelview/${id}`);
                break;
            case 'stone':
                navigate(`/stoneview/${id}`);
                break;
            case 'wood':
                navigate(`/woodview/${id}`);
                break;
            default:
                break;
        }
    };



const toSingular = (word) => {
    if (!word) return word;

    if (word.endsWith('s') && !word.endsWith('ss')) {
        return word.slice(0, -1);
    }
    if (word.endsWith('ies')) {
        return word.slice(0, -3) + 'y'; 
    }
    if (word.endsWith('es')) {
        return word.slice(0, -2); 
    }
    return word; 
};

const filteredItems = items.filter(item => {
    const { district, searchLocation, searchProduct } = searchValues;
    const lowerDistrict = district?.toLowerCase().trim();
    const lowerSearchLocation = searchLocation?.toLowerCase().trim();
    const lowerSearchProduct = searchProduct?.toLowerCase().trim() || "";

    const addressFields = [
        item.sellerAddress,
        item.shopAddress,
        item.location
    ].filter(Boolean).map(addr => addr.toLowerCase().replace(/\s+/g, ' ').trim());

    const matchesDistrict = lowerDistrict && addressFields.some(address =>
        address.includes(lowerDistrict)
    );

    const matchesSearchLocation = lowerSearchLocation && addressFields.some(address =>
        address.includes(lowerSearchLocation)
    );

    const singularSearchProduct = toSingular(lowerSearchProduct);
    const matchesProduct = singularSearchProduct && (
        item.category?.toLowerCase().includes(singularSearchProduct) ||
        item.name?.toLowerCase().includes(singularSearchProduct)
    );

    const searchWords = lowerSearchProduct.split(' ').filter(Boolean);
    const matchesProductByWords = searchWords.length > 0 && searchWords.some(word => {
        const singularWord = toSingular(word);
        return item.category?.toLowerCase().includes(singularWord) ||
            item.name?.toLowerCase().includes(singularWord);
    });

    if (lowerDistrict && !lowerSearchLocation && !lowerSearchProduct) {
        return matchesDistrict;
    }

    if (!lowerDistrict && lowerSearchLocation && !lowerSearchProduct) {
        return matchesSearchLocation;
    }

    if (!lowerDistrict && !lowerSearchLocation && lowerSearchProduct) {
        return matchesProduct || matchesProductByWords;
    }

    if (lowerDistrict && lowerSearchProduct) {
        return matchesDistrict && (matchesProduct || matchesProductByWords);
    }

    if (lowerSearchLocation && lowerSearchProduct) {
        return matchesSearchLocation && (matchesProduct || matchesProductByWords);
    }

    return false;
});

    
    const renderFieldsHead = (item) => {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px',
                backgroundColor: '#f9f9f9',
                transition: 'background-color 0.3s',
            }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e9ecef'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}>
                <div style={{ textAlign: 'left' }}>
                    {item.category === 'house' && item.bedrooms && (
                        <Typography variant="h6" style={{ fontSize: '15px', color: '#343a40' }}>
                            {item.bedrooms} BHK
                        </Typography>
                    )}
                    {item.category === 'cement' && item.quantity && (
                        <Typography variant="h6" style={{ fontSize: '15px', color: '#343a40' }}>
                            {item.quantity} KG
                        </Typography>
                    )}
                    {item.category === 'interior' && item.type && (
                        <Typography variant="body2" style={{ fontSize: '12px', color: '#343a40' }}>
                            {item.type}
                        </Typography>
                    )}
                    {item.category === 'pghostel' && item.type && (
                        <Typography variant="h6" style={{ fontSize: '15px', color: '#343a40' }}>
                            {item.type}
                        </Typography>
                    )}
                    {item.category === 'pipewire' && (
                        <Typography variant="h6" style={{ fontSize: '15px', color: '#343a40' }}>
                            {item.Type === "Pipes" ? item.pipeBrand : item.wireBrand}
                        </Typography>
                    )}
                    {(item.category === 'sand' || item.category === 'stone' || item.category === 'wood') && item.quantity && (
                        <Typography variant="h6" style={{ fontSize: '15px', color: '#343a40' }}>
                            {item.quantity}
                        </Typography>
                    )}
                    {item.category === 'steel' && item.steelType && (
                        <Typography variant="h6" style={{ fontSize: '15px', color: '#343a40' }}>
                            {item.steelType}
                        </Typography>
                    )}
                </div>
                <div style={{ textAlign: 'right' }}>
                    {item.price && (
                        <Typography
                            variant="body2"
                            style={{
                                color: "green",
                                fontSize: '20px',
                                fontWeight: 'bold',
                                padding: '2px 5px',
                                borderRadius: '4px',
                                backgroundColor: '#dff0d8'
                            }}
                        >
                            {item.price} RPS
                        </Typography>
                    )}
                </div>
            </div>
        );
    };

    const renderFields = (item) => {
        const styles = {
            title: { fontSize: '16px', fontWeight: 'bold', margin: '8px 0', color: '#333', marginLeft: "10px" },
            subtitle: { fontSize: '14px', margin: '4px 0', color: '#666', marginLeft: "10px" },
            label: { fontWeight: 'bold', color: '#333', marginLeft: "3px" },
            container: { marginBottom: '12px' }
        };

        return (
            <div style={styles.container}>
                {item.category === 'house' && (
                    <>
                        {item.purpose && <Typography variant="h4" style={styles.title}>{item.purpose}</Typography>}
                        {item.projectName && <Typography variant="body1" style={styles.subtitle}>{item.projectName}</Typography>}
                        {item.adTitle && <Typography variant="body1" style={styles.subtitle}>{item.adTitle}</Typography>}
                        {item.bathrooms && <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Bathrooms:</span> {item.bathrooms}</Typography>}
                        {item.location && (
                            <Typography variant="body2" style={styles.subtitle}>
                                <span style={styles.label}>Location:</span>
                                <span style={{ fontSize: "11.2px" }}> {item.location.split(',').slice(-3).join(',').trim()}</span>
                            </Typography>
                        )}
                    </>
                )}
                {item.category === 'cement' && (
                    <>
                        {item.brand && <Typography variant="h6" style={styles.title}>{item.brand}</Typography>}
                        {item.name && <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Seller Name:</span> {item.name}</Typography>}
                        {item.cementType && <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Type:</span> {item.cementType}</Typography>}
                        {item.shopAddress && (
                            <Typography variant="body2" style={styles.subtitle}>
                                <span style={styles.label}>Location:</span>
                                <span style={{ fontSize: "11.2px" }}> {item.shopAddress.split(',').slice(-3).join(',').trim()}</span>
                            </Typography>
                        )}
                    </>
                )}
                {item.category === 'interior' && (
                    <>
                        {item.products && <Typography variant="h3" style={styles.title}>{item.products}</Typography>}
                        {item.name && <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Seller Name:</span> {item.name}</Typography>}
                        {item.sellerAddress && (
                            <Typography variant="body2" style={styles.subtitle}>
                                <span style={styles.label}>Location:</span>
                                <span style={{ fontSize: "11.2px" }}> {item.sellerAddress.split(',').slice(-3).join(',').trim()}</span>
                            </Typography>
                        )}
                    </>
                )}
                {item.category === 'pghostel' && (
                    <>
                        {item.pgHostelName && <Typography variant="h5" style={styles.title}>{item.pgHostelName}</Typography>}
                        {item.food && <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Food:</span> {item.food}</Typography>}
                        {item.maintenance && <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Monthly Maintenance:</span> {item.maintenance}</Typography>}
                        {item.location && (
                            <Typography variant="body2" style={styles.subtitle}>
                                <span style={styles.label}>Location:</span>
                                <span style={{ fontSize: "11.2px" }}> {item.location.split(',').slice(-3).join(',').trim()}</span>
                            </Typography>
                        )}
                    </>
                )}
                {item.category === 'pipewire' && (
                    <>
                        {item.Type === "Pipes" ? (
                            <>
                                <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Seller Name:</span> {item.name}</Typography>
                                {/* <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Pipe Type:</span> {item.pipeType}</Typography> */}
                                <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Diameter:</span> {item.pipeDiameter}</Typography>
                                <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Length:</span> {item.pipeLength} m</Typography>
                                <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Quantity:</span> {item.quantity}</Typography>
                                <Typography variant="body2" style={styles.subtitle}>
                                    <span style={styles.label}>Location:</span>
                                    <span style={{ fontSize: "11.2px" }}> {item.sellerAddress.split(',').slice(-3).join(',').trim()}</span>
                                </Typography>
                            </>
                        ) : (
                            <>
                                <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Seller Name:</span> {item.name}</Typography>
                                {/* <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Wire Type:</span> {item.wireType}</Typography> */}
                                <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Diameter:</span> {item.wireDiameter}</Typography>
                                <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Length:</span> {item.wireLength} m</Typography>
                                <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Quantity:</span> {item.quantity}</Typography>
                                <Typography variant="body2" style={styles.subtitle}>
                                    <span style={styles.label}>Location:</span>
                                    <span style={{ fontSize: "11.2px" }}> {item.sellerAddress.split(',').slice(-3).join(',').trim()}</span>
                                </Typography>
                            </>
                        )}
                    </>
                )}
                {item.category === 'sand' && (
                    <>
                        {item.sandType && <Typography variant="h6" style={styles.title}>{item.sandType}</Typography>}
                        {item.name && <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Seller Name:</span> {item.name}</Typography>}
                        {item.sellerAddress && (
                            <Typography variant="body2" style={styles.subtitle}>
                                <span style={styles.label}>Location:</span>
                                <span style={{ fontSize: "11.2px" }}> {item.sellerAddress.split(',').slice(-3).join(',').trim()}</span>
                            </Typography>
                        )}
                    </>
                )}
                {item.category === 'stone' && (
                    <>
                        {item.stoneType && <Typography variant="h6" style={styles.title}>{item.stoneType}</Typography>}
                        {item.name && <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Seller Name:</span> {item.name}</Typography>}
                        {item.stoneCategory && <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Stone Category:</span> {item.stoneCategory}</Typography>}
                        {item.sellerAddress && (
                            <Typography variant="body2" style={styles.subtitle}>
                                <span style={styles.label}>Location:</span>
                                <span style={{ fontSize: "11.2px" }}> {item.sellerAddress.split(',').slice(-3).join(',').trim()}</span>
                            </Typography>
                        )}
                    </>
                )}
                {item.category === 'wood' && (
                    <>
                        {item.woodType && <Typography variant="h6" style={styles.title}>{item.woodType}</Typography>}
                        {item.name && <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Seller Name:</span> {item.name}</Typography>}
                        {item.thickness && <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Thickness:</span>{item.thickness} </Typography>}
                        {item.quantityType && <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Quantity Type:</span>{item.quantityType} </Typography>}
                        {item.sellerAddress && (
                            <Typography variant="body2" style={styles.subtitle}>
                                <span style={styles.label}>Location:</span>
                                <span style={{ fontSize: "11.2px" }}> {item.sellerAddress.split(',').slice(-3).join(',').trim()}</span>
                            </Typography>
                        )}
                    </>
                )}
                {item.category === 'steel' && (
                    <>
                        {item.steelType && <Typography variant="h6" style={styles.title}>{item.steelType}</Typography>}
                        {item.name && <Typography variant="body2" style={styles.subtitle}><span style={styles.label}>Seller Name:</span> {item.name}</Typography>}
                        {item.shopAddress && (
                            <Typography variant="body2" style={styles.subtitle}>
                                <span style={styles.label}>Location:</span>
                                <span style={{ fontSize: "11.2px" }}> {item.shopAddress.split(',').slice(-3).join(',').trim()}</span>
                            </Typography>
                        )}
                    </>
                )}
            </div>
        );
    };


    return (
        <Box className="searchresult-container">
            {filteredItems.length === 0 ? (
                <Typography>No items found.</Typography>
            ) : (
                <div className="searchresult-card-grid">
                    {filteredItems.map(item => (
                        <div key={item._id} className="searchresult-card">
                            {renderFieldsHead(item)}
                            <div className="searchresult-card-image-container">
                                {(item.images && item.images.length > 0) || (item.photos && item.photos.length > 0) ? (
                                    <Carousel
                                        showThumbs={false}
                                        infiniteLoop
                                        autoPlay
                                        stopOnHover
                                        showStatus={false}
                                        className="searchresult-carousel"
                                    >
                                        {(item.images && item.images.length > 0 ? item.images : item.photos).map((image, index) => (
                                            <div key={index}>
                                                <img
                                                    src={`${config.apiURL}/${image}`}
                                                    alt={item.name || `Image ${index + 1}`}
                                                    className="searchresult-card-image"
                                                />
                                            </div>
                                        ))}
                                    </Carousel>
                                ) : null}
                            </div>

                            <div className="searchresult-like-container">
                                <button
                                    onClick={() => handleAddToFavourites(item._id)}
                                    className="heart-button"
                                >
                                    {favourites.includes(item._id) ? (
                                        <FaHeart className="heart-icon filled" />
                                    ) : (
                                        <FaRegHeart className="heart-icon" />
                                    )}
                                </button>
                                <span className="like-count">{likeCounts[item._id] || 0} Likes</span>
                            </div>

                            {renderFields(item)}
                            <button
                                className="view-details-button"
                                onClick={() => handleViewDetails(item.category, item._id)}
                                style={{ backgroundColor: "transparent", color: "blue" }}
                            >
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <Snackbar
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                autoHideDuration={2000}
                sx={{
                    '& .MuiSnackbarContent-root': {
                        backgroundColor: snackbarType === 'success' ? '#4caf50' : '#f44336', // Green for success, red for error
                        color: '#fff',
                        borderRadius: '8px',
                        padding: '11px',
                        fontSize: '0.8rem',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                    },
                }}
            />

        </Box>
    );


}

export default Searchresult;