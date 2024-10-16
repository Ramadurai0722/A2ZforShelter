import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import config from '../../../config';
import "./Adds.css";

const AdsCarousel = () => {
  const [adsData, setAdsData] = useState([]);
  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
  };

  useEffect(() => {
    const fetchAdsData = async () => {
      try {
        const fetchRequests = [
          { type: 'Wood', url: `${config.apiURL}/woodRoute/wood` },
          { type: 'Stone', url: `${config.apiURL}/stoneRoute/stone` },
          { type: 'House', url: `${config.apiURL}/houseRoute/houses` },
          { type: 'PG Hostel', url: `${config.apiURL}/pgHostelRoute/pgHostel` },
          { type: 'Pipe & Wire', url: `${config.apiURL}/pipeWiresRoute/pipewires` },
          { type: 'Sand', url: `${config.apiURL}/sandRoute/sand` },
          { type: 'Steel', url: `${config.apiURL}/steelRoute/steel` },
          { type: 'Catering', url: `${config.apiURL}/cateringRoute/catering` },
          { type: 'Cement', url: `${config.apiURL}/cementRoutes/cement` },
        ];

        const responses = await Promise.all(fetchRequests.map(req => fetch(req.url)));
        const data = await Promise.all(responses.map(response => response.json()));

        const flatData = data.reduce((acc, currData, index) => {
          const adType = fetchRequests[index].type;
          const adsWithType = currData.map(item => ({
            ...item,
            type: adType
          }));
          return acc.concat(adsWithType);
        }, []);

        setAdsData(flatData);
      } catch (error) {
        console.error('Error fetching ads data:', error);
      }
    };

    fetchAdsData();
  }, []);

  const handleCardClick = (ad) => {
    const { _id, type } = ad;

    if (_id) {
      const typeToRouteMap = {
        'Ladies Hostel': `/productviewpg/`,
        'House': `/houseview/`,
        'Cement': `/cementview/`,
        'Interior': `/interiorview/`,
        'Catering': `/cateringview/`,
        'Pipe & Wire': `/pipe&wireview/`,
        'Sand': `/sandview/`,
        'Steel': `/steelview/`,
        'Stone': `/stoneview/`,
        'Wood': `/woodview/`,
      };

      const route = typeToRouteMap[type];
      if (route) {
        navigate(`${route}${_id}`);
      } else {
        console.error('Unknown ad type:', type);
      }
    } else {
      console.error('Ad ID is undefined');
    }
  };

  return (
    <div className="adds-carousel-container">
      <Slider {...settings}>
        {adsData.map(ad => {
          const imageArray = Array.isArray(ad.images) && ad.images.length > 0 
            ? ad.images 
            : Array.isArray(ad.photos) && ad.photos.length > 0 
              ? ad.photos 
              : [];

          return (
            <div key={ad._id} onClick={() => handleCardClick(ad)} style={{ cursor: 'pointer' }}>
              <div className="adds-ad-card">
                {imageArray.length > 0 ? (
                  <Slider {...settings} className="adds-image-slider">
                    {imageArray.map((image, index) => (
                      <div key={`${ad._id}-image-${index}`} className="adds-image-container">
                        <img
                          src={`${config.apiURL}/${image}`}
                          alt={ad.title}
                          className="adds-ad-image"
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="adds-no-image">
                    <p>No Image Available</p>
                  </div>
                )}
                <p className="adds-ad-price">Price: {ad.price}</p>
                <p className="adds-ad-location">
                  Location: {ad.districtName ? `${ad.districtName}, ` : ''}{ad.cityName || ad.shopAddress || ad.sellerAddress}
                </p>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default AdsCarousel;
