import React, { useState, useEffect } from 'react';
import config from '../../../config';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import { Form, Input, Button, Select, Typography, Row, Col } from 'antd';
import axios from 'axios';

const { Title } = Typography;
const { Option } = Select;

const styles = {
  container: {
    width: '80%',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: "140px",
    marginBottom: "50px",
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: '700',
    fontSize: '24px',
    color: '#333',
  },
  inputStyle: {
    height: '50px',
    borderRadius: '4px',
    border: '1px solid #d9d9d9',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#1890ff',
    borderColor: '#1890ff',
    borderRadius: '4px',
    width: '100%',
  },

  '@media (max-width: 800px)': {
    container: {
      width: '95%', 
      padding: '10px', 
    },
    title: {
      fontSize: '20px', 
    },
    inputStyle: {
      height: '40px', 
    },
  },
};

const BoreWell = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    userId: '',
    Name: '',
    email: '',
    phoneNumber: '',
    description: '',
    borewellDepth: '',
    waterSourceType: '',
    drillingType: '',
    location: '',
    equipmentDetails: '',
  });

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      axios
        .get(`${config.apiURL}/api/getprofile`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          const { username, email, phoneNumber, _id } = response.data;
          setFormData((prevData) => ({
            ...prevData,
            userId: _id,
            Name: username,
            email,
            phoneNumber,
          }));
          form.setFieldsValue({
            Name: username,
            email,
            phoneNumber,
          });
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [form]);

  const handleChange = (changedValues) => {
    setFormData((prevData) => ({
      ...prevData,
      ...changedValues,
    }));
  };

  const handleSubmit = async (values) => {
    const dataToSend = { ...formData, ...values };
    
    try {
      const response = await fetch(`${config.apiURL}/borewell/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Borewell registered:', data);
        // Reset form data if necessary
        setFormData({
          userId: formData.userId,
          Name: formData.Name,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          description: '',
          borewellDepth: '',
          waterSourceType: '',
          drillingType: '',
          location: '',
          equipmentDetails: '',
        });
        form.resetFields(); // Reset form fields
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <Title level={2} style={styles.title}>
          Borewell Services Registration Form
        </Title>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item label="Name" name="Name">
                <Input style={styles.inputStyle} readOnly value={formData.Name} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Email" name="email">
                <Input type="email" style={styles.inputStyle} readOnly value={formData.email} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item label="Phone Number" name="phoneNumber">
                <Input type="tel" style={styles.inputStyle} readOnly value={formData.phoneNumber} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Borewell Depth (in feet)" name="borewellDepth" required>
                <Input
                  type="number"
                  placeholder="Enter depth"
                  value={formData.borewellDepth}
                  onChange={(e) => handleChange({ borewellDepth: e.target.value })}
                  style={styles.inputStyle}
                  required
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item label="Water Source Type" name="waterSourceType" required>
                <Select
                  value={formData.waterSourceType}
                  onChange={(value) => handleChange({ waterSourceType: value })}
                  style={styles.inputStyle}
                  required
                >
                  <Option value="">--Select Water Source--</Option>
                  <Option value="groundwater">Groundwater</Option>
                  <Option value="surface-water">Surface Water</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Drilling Type" name="drillingType" required>
                <Select
                  value={formData.drillingType}
                  onChange={(value) => handleChange({ drillingType: value })}
                  style={styles.inputStyle}
                  required
                >
                  <Option value="">--Select Drilling Type--</Option>
                  <Option value="rotary-drilling">Rotary Drilling</Option>
                  <Option value="percussion-drilling">Percussion Drilling</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item label="Location" name="location" required>
                <Input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleChange({ location: e.target.value })}
                  style={styles.inputStyle}
                  required
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Equipment Details" name="equipmentDetails" required>
                <Input.TextArea
                  value={formData.equipmentDetails}
                  onChange={(e) => handleChange({ equipmentDetails: e.target.value })}
                  style={styles.inputStyle}
                  required
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Additional Description">
                <Input.TextArea
                  value={formData.description}
                  onChange={(e) => handleChange({ description: e.target.value })}
                  style={styles.inputStyle}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={styles.button}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Footer />
    </>
  );
};

export default BoreWell;
