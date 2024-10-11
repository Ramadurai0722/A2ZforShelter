import React, { useState } from 'react';
import { Snackbar, Button } from '@mui/material';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import './pricingtable.css';

const PricingTable = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handlePaymentSuccess = (plan, details) => {
    showSnackbar(`Payment of ₹${plan.price} confirmed! Payment ID: ${details.id}`);
  };

  return (
    <div className="pricing-container">
      <div className="plans-wrapper">
        {/* Free Plan */}
        <div className="plan free-plan">
          <div className="plan-header">
            <h3>Free</h3>
            <p className="price">₹0 / month</p>
            <p>Currently Active</p>
          </div>
          <div className="plan-details">
            <p><strong>No. of posts:</strong> Below 5</p>
            <p><strong>Post Validity:</strong> 3 Days</p>
            <p><strong>Leads:</strong><span className="cross">✗</span></p>
            <p><strong>Promote Via Email:</strong><span className="cross">✗</span></p>
            <p><strong>Adds:</strong><span className="cross">✗</span></p>
            <p><strong>Plan Validity:</strong><span className="cross">✗</span></p>
          </div>
          <button className="buy-now disabled">Free Plan</button>
        </div>

        {/* Prime Plan */}
        <div className="plan silver-plan">
          <div className="plan-header">
            <h3>Prime</h3>
            <p className="price">Price: ₹299</p>
            <p>30 Days</p>
          </div>
          <div className="plan-details">
            <p><strong>No. of posts:</strong> Below 15</p>
            <p><strong>Post Validity:</strong> 20 Days</p>
            <p><strong>Leads:</strong> 10</p>
            <p><strong>Promote Via Email:</strong> 25%</p>
            <p><strong>Adds:</strong><span className="cross">✗</span></p>
            <p><strong>Plan Validity:</strong> 30 Days</p>
          </div>
          <PayPalScriptProvider options={{ "client-id": "AaeSC1xdXmAdxLCvDvIXLJJ_Xlr2eNDHDk-9JVTYLnc_UyGFZk80WFs06_Nf30AcOVVWRBh_X4-BxEiV" }}>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: (299).toFixed(2), 
                    },
                  }],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  handlePaymentSuccess({ name: 'Prime', price: 299 }, details);
                });
              }}
            />
          </PayPalScriptProvider>
        </div>

        {/* Prime Plus Plan */}
        <div className="plan gold-plan">
          <div className="plan-header">
            <h3 className='prime'>Prime Plus</h3>
            <span className="best-seller-tag">Best Seller</span>
            <p className="price">Price: ₹599</p>
            <p>60 Days</p>
          </div>
          <div className="plan-details">
            <p><strong>No. of posts:</strong> Below 20</p>
            <p><strong>Post Validity:</strong> 45 Days</p>
            <p><strong>Leads:</strong> 25</p>
            <p><strong>Promote Via Email:</strong> 50%</p>
            <p><strong>Adds:</strong> 50%</p>
            <p><strong>Plan Validity:</strong> 60 Days</p>
          </div>
          <PayPalScriptProvider options={{ "client-id": "AaeSC1xdXmAdxLCvDvIXLJJ_Xlr2eNDHDk-9JVTYLnc_UyGFZk80WFs06_Nf30AcOVVWRBh_X4-BxEiV" }}>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: (599).toFixed(2), 
                    },
                  }],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  handlePaymentSuccess({ name: 'Prime Plus', price: 599 }, details);
                });
              }}
            />
          </PayPalScriptProvider>
        </div>

        {/* Elite Plan */}
        <div className="plan titanium-plan">
          <div className="plan-header">
            <h3 className='elite'>Elite</h3>
            <span className="recommended-tag">Recommended</span>
            <p className="price">Price: ₹999</p>
            <p>90 Days</p>
          </div>
          <div className="plan-details">
            <p><strong>No. of posts:</strong> Unlimited</p>
            <p><strong>Post Validity:</strong> 60 Days</p>
            <p><strong>Leads:</strong> 50</p>
            <p><strong>Promote Via Email:</strong> 80%</p>
            <p><strong>Adds:</strong> 80%</p>
            <p><strong>Plan Validity:</strong> 90 Days</p>
          </div>
          <PayPalScriptProvider options={{ "client-id": "AaeSC1xdXmAdxLCvDvIXLJJ_Xlr2eNDHDk-9JVTYLnc_UyGFZk80WFs06_Nf30AcOVVWRBh_X4-BxEiV" }}>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: (999).toFixed(2), 
                    },
                  }],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  handlePaymentSuccess({ name: 'Elite', price: 999 }, details);
                });
              }}
            />
          </PayPalScriptProvider>
        </div>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <Button color="inherit" onClick={handleSnackbarClose}>
            Close
          </Button>
        }
      />
    </div>
  );
};

export default PricingTable;
