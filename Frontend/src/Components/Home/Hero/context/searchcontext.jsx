import React, { createContext, useState } from 'react';

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [searchValues, setSearchValues] = useState({});

    const updateSearchValues = (values) => {
        setSearchValues((prevValues) => ({
            ...prevValues,
            ...values,
        }));
    };

    return (
        <SearchContext.Provider value={{ searchValues, updateSearchValues }}>
            {children}
        </SearchContext.Provider>
    );
};

export { SearchContext, SearchProvider };
