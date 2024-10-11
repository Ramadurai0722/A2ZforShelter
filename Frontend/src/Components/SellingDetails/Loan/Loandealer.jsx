import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Typography, Row, Col } from "antd";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";
import config from "../../../config";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";

const { Title } = Typography;
const { Option } = Select;

const Loanpost = () => {
  const [form] = Form.useForm();

  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    email: "",
    BankDearlerName: "",
    phoneNumber: "",
    description: "",
    loanType: "",
  });

  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

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
            name: username,
            email,
            phoneNumber,
          }));
          form.setFieldsValue({
            name: username,
            email,
            phoneNumber,
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [form]);

  const handleChange = (changedValues) => {
    setFormData((prevData) => ({
      ...prevData,
      ...changedValues,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    console.log("Form Data: ", formData);
    try {
      const response = await axios.post(
        `${config.apiURL}/loanRoute/dealersregister`,
        formData
      );
      setSnackbarMessage(
        response.data.message || "Form submitted successfully!"
      );
      setSnackbarSeverity("success");

      form.setFieldsValue({
        BankDearlerName: "", 
        loanType: undefined,  
        description: "",   
      });
  
      setFormData((prevData) => ({
        ...prevData,
        BankDearlerName: "",
        loanType: "",
        description: "",
      }));
  
    } catch (error) {
      console.error("Error submitting form:", error.response ? error.response.data : error.message);
      setSnackbarMessage("Failed to submit loan dealer data.");
      setSnackbarSeverity("error");
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };
  
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const inputStyle = { height: "50px" };

  return (
    <>
      <Navbar />
      <div
        className="container"
        style={{ width: "80%", maxWidth: "1200px", margin: "0 auto", marginTop: "100px", marginBottom: "50px" }}
      >
        <Title
          level={2}
          style={{ textAlign: "center", marginBottom: "20px", fontWeight: "700" }}
        >
          Loan Dealers Registration Form
        </Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onValuesChange={handleChange}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input style={inputStyle} readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please input your email!" }]}
              >
                <Input type="email" style={inputStyle} readOnly />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[
                  { required: true, message: "Please input your phone number!" },
                ]}
              >
                <Input type="tel" style={inputStyle} readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Bank Name" name="BankDearlerName">
                <Input style={inputStyle} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Loan Type"
                name="loanType"
                rules={[
                  { required: true, message: "Please select a loan type!" },
                ]}
              >
                <Select>
                  <Option value="">--Select Loan Type--</Option>
                  <Option value="home-loan">Home Loan</Option>
                  <Option value="land-loan">Land & Plot Loan</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Describe Bank Loan Details" name="description">
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
      <Footer />
    </>
  );
};

export default Loanpost;
