import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  Typography,
  Modal,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import config from "../../../config";
import { Snackbar, Alert } from "@mui/material";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";

const { Title } = Typography;
const { Option } = Select;

const styles = {
  container: {
    width: "80%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginTop: "140px",
    marginBottom: "50px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontWeight: "700",
    fontSize: "24px",
    color: "#333",
  },
  inputStyle: {
    height: "50px",
    borderRadius: "4px",
    border: "1px solid #d9d9d9",
    transition: "border-color 0.3s",
  },
  button: {
    backgroundColor: "#1890ff",
    borderColor: "#1890ff",
    borderRadius: "4px",
    transition: "background-color 0.3s, border-color 0.3s",
  },
  uploadButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px dashed #d9d9d9",
    borderRadius: "4px",
    height: "50px",
    marginTop: "10px",
  },
  uploadText: {
    marginLeft: "8px",
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

const CateringpostForm = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    email: "",
    phoneNumber: "",
    shopAddress: "",
    meals: "Break-Fast",
    menuCatalogues: "",
    numberOfPeople: "",
    price: "",
    images: [],
    description: "",
  });

  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");

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

  useEffect(() => {
    form.setFieldsValue({
      shopAddress: formData.shopAddress,
      meals: formData.meals,
      menuCatalogues: formData.menuCatalogues,
      numberOfPeople: formData.numberOfPeople,
      price: formData.price,
      description: formData.description,
    });
  }, [formData, form]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleChange = (changedValues) => {
    setFormData((prevData) => ({
      ...prevData,
      ...changedValues,
    }));
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
    setFormData((prevData) => ({
      ...prevData,
      images: fileList.map((file) => file.originFileObj),
    }));
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
  };

  const validateFormFields = () => {
    const requiredFields = [
      "shopAddress",
      "menuCatalogues",
      "numberOfPeople",
      "price",
      "description",
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setSnackbarMessage(`Please fill in the ${field}!`);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return false;
      }
    }
    if (fileList.length === 0) {
      setSnackbarMessage("Please upload at least one image!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateFormFields()) return;

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((file) => formDataToSend.append("images", file));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post(
        `${config.apiURL}/cateringRoute/catering`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Form Data Submitted: ", response.data);

      setSnackbarMessage("Form submitted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // Reset formData to empty values
      setFormData({
        userId: formData.userId,
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        shopAddress: "",
        meals: "Break-Fast",
        menuCatalogues: "",
        numberOfPeople: "",
        price: "",
        images: [],
        description: "",
      });

      setFileList([]);
    } catch (error) {
      console.error("Error submitting form: ", error);
      setSnackbarMessage("Error submitting form. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <Title level={1} style={styles.title}>
          Catering Service
        </Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onValuesChange={handleChange}
          initialValues={formData}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input style={styles.inputStyle} readOnly />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Email ID"
                name="email"
                rules={[{ required: true, message: "Please input your email!" }]}
              >
                <Input type="email" style={styles.inputStyle} readOnly />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[{ required: true, message: "Please input your phone number!" }]}
              >
                <Input type="tel" style={styles.inputStyle} readOnly />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Shop Address"
                name="shopAddress"
                rules={[{ required: true, message: "Please input your shop address!" }]}
              >
                <Input.TextArea style={styles.inputStyle} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Meals"
                name="meals"
                rules={[{ required: true, message: "Please select a meal type!" }]}
              >
                <Select
                  value={formData.meals}
                  onChange={(value) => handleChange({ meals: value })}
                  style={styles.inputStyle}
                >
                  {["Break-Fast", "Lunch", "Dinner"].map((meal) => (
                    <Option key={meal} value={meal}>
                      {meal}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Menu Catalogues"
                name="menuCatalogues"
                rules={[{ required: true, message: "Please input the menu items!" }]}
              >
                <Input style={styles.inputStyle} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Number of Members"
                name="numberOfPeople"
                rules={[{ required: true, message: "Please input the number of people!" }]}
              >
                <Input type="number" min={1} style={styles.inputStyle} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: "Please input the price!" }]}
              >
                <Input type="number" min={1} style={styles.inputStyle} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Upload Images"
            required
            rules={[{ required: true, message: "Please upload at least one image!" }]}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleUploadChange}
              onPreview={handlePreview}
              beforeUpload={() => false}
              multiple
            >
              <div style={styles.uploadButton}>
                <UploadOutlined />
                <span style={styles.uploadText}>Upload</span>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please provide a description!" }]}
          >
            <Input.TextArea style={styles.inputStyle} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block style={styles.button}>
              Submit
            </Button>
          </Form.Item>
        </Form>

        {/* Modal for Image Preview */}
        <Modal
          open={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={() => setPreviewVisible(false)}
        >
          <img alt="preview" style={{ width: "100%" }} src={previewImage} />
        </Modal>

        {/* Snackbar for feedback messages */}
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

export default CateringpostForm;
