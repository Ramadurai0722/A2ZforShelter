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
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import config from "../../../config";
import "../SalePost.css"; 
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";

const { Title } = Typography;
const { Option } = Select;

const StonepostForm = () => {
  const [form] = Form.useForm();

  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    email: "",
    phoneNumber: "",
    sellerAddress: "",
    stoneCategory: "Granite",
    stoneType: "Whole",
    quantity: "1 Tonne",
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
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((file) =>
          formDataToSend.append("images", file)
        );
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post(
        `${config.apiURL}/stoneRoute/stone`,
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
      setFileList([]);
    } catch (error) {
      setSnackbarMessage("Error submitting form.");
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

  const inputStyle = { height: "50px" }; 

  return (
    <>
    <Navbar />
    <div
      className="container"
      style={{ width: "80%", maxWidth: "1200px", margin: "0 auto",marginBottom:"50px",marginTop:"100px" }}
    >
      <Title
        level={1}
        style={{ textAlign: "center", marginBottom: "20px", fontWeight: "700" }}
      >
        Stone Seller
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
              <Input style={inputStyle} readOnly />
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
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input.TextArea style={inputStyle} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Stone Category"
              name="stoneCategory"
              rules={[{ required: true, message: "Please select a category!" }]}
            >
              <Select
                value={formData.stoneCategory}
                onChange={(value) => handleChange({ stoneCategory: value })}
                style={inputStyle}
              >
                {[
                  "Granite",
                  "Basalt and trap",
                  "Serpentine",
                  "Limestone",
                  "Chalk",
                  "Sandstone",
                  "Caliche",
                  "Marble",
                  "Slate",
                  "Quartzite",
                  "Laterite",
                  "Gneiss",
                ].map((category) => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Stone Type"
              name="stoneType"
              rules={[
                { required: true, message: "Please select a stone type!" },
              ]}
            >
              <Select
                value={formData.stoneType}
                onChange={(value) => handleChange({ stoneType: value })}
                style={inputStyle}
              >
                {["Whole", "Crushed"].map((type) => (
                  <Option key={type} value={type}>
                    {type}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Quantity" name="quantity">
              <Input value={formData.quantity} readOnly style={inputStyle} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please input the price!" }]}
            >
              <Input type="number" min={1} style={inputStyle} />
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
            onChange={handleUploadChange}
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
          <Input.TextArea style={inputStyle} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Modal
        open={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>

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

export default StonepostForm;
