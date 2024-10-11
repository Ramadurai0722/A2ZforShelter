import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Slider,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import config from "../../../config";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";

const { Title } = Typography;
const { Option } = Select;

const SandpostForm = () => {
  const [form] = Form.useForm();

  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    email: "",
    phoneNumber: "",
    sellerAddress: "",
    sandType: "Gravel",
    quantity: "1 Unit",
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
          // Update form data
          setFormData((prevData) => ({
            ...prevData,
            userId: _id,
            name: username,
            email,
            phoneNumber,
          }));
          // Set values in the form inputs
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

  const handleImageChange = ({ fileList }) => {
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
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleRemoveImage = (index) => {
    setFileList((prevList) => {
      const newList = prevList.filter((_, i) => i !== index);
      return newList;
    });
    setFormData((prevData) => {
      const newImages = prevData.images.filter((_, i) => i !== index);
      return {
        ...prevData,
        images: newImages,
      };
    });
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((file) => formDataToSend.append("images", file));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });
  
    try {
      // Use formData.userId to access the userId
      const response = await axios.post(
        `${config.apiURL}/sandRoute/sand`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSnackbarMessage("Form submitted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      
      // Reset form data after submission
      setFormData({
        userId: formData.userId, // Use formData.userId here
        name: "",
        email: "",
        phoneNumber: "",
        sellerAddress: "",
        sandType: "Gravel",
        quantity: "1 Unit",
        price: "",
        images: [],
        description: "",
      });
      setFileList([]);
    } catch (error) {
      setSnackbarMessage("Error submitting form. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Error submitting form: ", error);
    }
  };
  

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const inputStyle = { height: "50px" };
  return (
    <>
    <Navbar />
    <div
      className="container"
      style={{ width: "80%", maxWidth: "1200px", margin: "0 auto",marginTop:"100px",marginBottom:"50px" }}
    >
      <Title
        level={1}
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontWeight: "700",
        }}
      >
        Sand Seller
      </Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onValuesChange={handleChange}
        initialValues={formData}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input type="name" style={inputStyle} readOnly />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Email ID"
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
            <Form.Item
              label="Seller Address"
              name="sellerAddress"
              rules={[
                {
                  required: true,
                  message: "Please input your seller address!",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Sand Type"
              name="sandType"
              rules={[
                { required: true, message: "Please select a sand type!" },
              ]}
            >
              <Select
                value={formData.sandType}
                onChange={(value) => handleChange({ sandType: value })}
              >
                {[
                  "Gravel",
                  "Fine Sand",
                  "Coarse Sand",
                  "Utility Sand",
                  "Fill Sand",
                  "River Sand",
                  "M-Sand",
                  "P-Sand",
                  "Concrete Sand",
                  "Pit Sand",
                  "Artificial Sand",
                  "Granite Sand",
                ].map((sandType) => (
                  <Option key={sandType} value={sandType}>
                    {sandType}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Quantity" name="quantity">
              <Input value={formData.quantity} style={inputStyle} readOnly />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please input the price!" }]}
            >
              <Input type="number" style={inputStyle} min={1} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Upload Images"
          rules={[
            { required: true, message: "Please upload at least one image!" },
          ]}
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleImageChange}
            onPreview={handlePreview}
            beforeUpload={() => false}
            multiple
          >
            {fileList.length >= 8 ? null : (
              <Button icon={<UploadOutlined />}>Upload</Button>
            )}
          </Upload>
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please provide a description!" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
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

export default SandpostForm;
