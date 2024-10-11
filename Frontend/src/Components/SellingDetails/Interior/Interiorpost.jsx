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
import './interior.css'; 
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";

const { Title } = Typography;
const { Option } = Select;

const InteriorpostForm = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    email: "",
    phoneNumber: "",
    sellerAddress: "",
    category: "",
    products: "",
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

// Full categories and products map
const categoryProductsMap = {
  "Wall & Table Decor": [
    "Wall prints",
    "Clocks",
    "Table lamps",
    "Art",
    "Mirrors",
    "Photo frames",
    "Books",
    "Crystals",
    "Glass sculptures",
    "Records",
    "Magazines",
    "Marble trivets",
    "Game board",
    "Decorative bowl or plate",
    "Juju hat",
    "Globe",
    "Cloche",
    "Coasters",
  ],
  "Soft Furnishings": [
    "Cushions",
    "Rugs",
    "Sheepskins",
    "Throw rugs",
    "Floor runner",
  ],
  Furniture: ["Stool", "Side tables", "Occasional chairs", "Timber decor"],
  "Storage & Organization": [
    "Baskets",
    "Hooks",
    "Pinboards",
    "Canisters",
    "Trays",
    "Box",
  ],
  Lighting: ["Floor lamps", "Candles", "Oil burners", "Candle sticks"],
  "Plants & Natural Elements": [
    "Indoor plants",
    "Dried flowers",
    "Coral",
    "Pot stand",
    "Watering can",
  ],
  "Textiles & Accessories": [
    "Vases",
    "Macrame",
    "Cowhide",
    "Hourglass",
    "Wick trimmer",
  ],
  Tiles: [
    "Ceramic tiles",
    "Porcelain tiles",
    "Mosaic tiles",
    "Subway tiles",
    "Terrazzo tiles",
    "Marble tiles",
    "Glass tiles",
    "Patterned tiles",
    "Encaustic cement tiles",
    "Hexagonal tiles",
    "Wood-look tiles",
    "Natural stone tiles",
    "Metallic tiles",
    "3D tiles",
  ],
  Paints: [
    "Matte paint",
    "Satin paint",
    "Gloss paint",
    "Eggshell paint",
    "Chalk paint",
    "Textured paint",
    "Metallic paint",
    "Eco-friendly paint",
    "Accent wall paint",
    "Pastel paint",
    "Ombre paint",
    "Magnetic paint",
    "Chalkboard paint",
    "Ceiling paint",
    "Glow-in-the-dark paint",
  ],
  "False Ceiling (Parceiling) Products": [
    "Gypsum ceiling",
    "POP ceiling",
    "Wooden ceiling panels",
    "PVC ceiling panels",
    "Metal ceiling panels",
    "Glass ceiling panels",
    "Fabric ceilings",
    "Coffered ceilings",
    "Acoustic ceiling tiles",
    "Stretch ceiling",
    "Plastic ceilings",
    "Mineral fiber ceilings",
    "LED light ceiling panels",
    "Tin ceiling tiles",
    "Mirror ceiling panels",
  ],
  "Bathroom Products": [
    "Wash basin",
    "Bathtub",
    "Shower head",
    "Toilet",
    "Bathroom vanity",
    "Towel rack",
    "Soap dispenser",
    "Toilet paper holder",
    "Bathroom mirror",
    "Shower curtain",
    "Bath mat",
    "Shower caddy",
    "Towel hooks",
    "Toothbrush holder",
    "Bathroom storage cabinet",
  ],
  "Kitchen Products": [
    "Kitchen sink",
    "Cookware",
    "Cutlery",
    "Dinnerware",
    "Kitchen cabinets",
    "Chopping board",
    "Dish rack",
    "Spice rack",
    "Oven",
    "Microwave",
    "Refrigerator",
    "Kitchen island",
    "Range hood",
    "Blender",
    "Coffee maker",
    "Toaster",
    "Utensil holder",
    "Kitchen towels",
    "Pantry storage jars",
    "Knife set",
    "Measuring cups",
    "Mixing bowls",
  ],
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

  const handleSubmit = async () => {
    try {
      await form.validateFields(); // Validate fields before submission
      const formDataToSend = new FormData();
      
      Object.keys(formData).forEach((key) => {
        if (key === "images") {
          formData.images.forEach((file) => formDataToSend.append("images", file));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await axios.post(
        `${config.apiURL}/interiorRoute/interior`,
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
      
      // Reset form fields
      form.resetFields(); 
      setFormData({
        userId: "",
        name: "",
        email: "",
        phoneNumber: "",
        sellerAddress: "",
        category: "",
        products: "",
        price: "",
        images: [],
        description: "",
      }); 
      setFileList([]); 

      form.setFieldsValue({
        userId: "",
        name: "",
        email: "",
        phoneNumber: "",
        sellerAddress: "",
        category: "",
        products: "",
        price: "",
        description: "",
      });

    } catch (error) {
      if (error.response) {
        setSnackbarMessage("Error submitting form. Please try again.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
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
    <div className="container" style={{marginTop:"100px",marginBottom:"50px"}}>
      <Title className="title" level={1}>
        Interior Products Seller
      </Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onValuesChange={handleChange}
        initialValues={formData}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input your name!" }]}>
              <Input style={inputStyle} readOnly />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Email ID" name="email" rules={[{ required: true, message: "Please input your email!" }]}>
              <Input type="email" style={inputStyle} readOnly />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true, message: "Please input your phone number!" }]}>
              <Input type="tel" style={inputStyle} readOnly />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Seller Address" name="sellerAddress" rules={[{ required: true, message: "Please input your seller address!" }]}>
              <Input.TextArea style={inputStyle} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item label="Category" name="category" rules={[{ required: true, message: "Please select a category!" }]}>
              <Select
                value={formData.category}
                onChange={(value) => handleChange({ category: value, products: "" })}
                style={inputStyle}
              >
                {Object.keys(categoryProductsMap).map((category) => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Products" name="products" rules={[{ required: true, message: "Please select a product!" }]}>
              <Select
                value={formData.products}
                onChange={(value) => handleChange({ products: value })}
                style={inputStyle}
              >
                {(categoryProductsMap[formData.category] || []).map((product) => (
                  <Option key={product} value={product}>
                    {product}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item label="Price" name="price" rules={[{ required: true, message: "Please input the price!" }]}>
              <Input type="number" min={1} style={inputStyle} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Upload Images"
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
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
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

export default InteriorpostForm;
