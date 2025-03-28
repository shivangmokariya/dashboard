import { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      console.log(">>>>>>>>",objectUrl,"<<<objectUrl");
      setPreview(objectUrl);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    console.log(file, "<<<<<file");
    if (!process.env.VITE_BACKEND_URL) {
      return
    }
    try {
      const response = await axios.post(process.env.VITE_BACKEND_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>

      <input type="file" onChange={handleFileChange} />

      <button onClick={handleUpload} style={{ margin: "10px" }}>
        Upload
      </button>

      {preview && (
        <div style={{ marginTop: "20px" }}>
          <h3>Preview:</h3>
          <img src={preview} alt="Preview" style={{ maxWidth: "100%", height: "auto", border: "1px solid #ccc" }} />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
