import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import ButtonAction from "../Button/ButtonAction";
import Msg_in_Body from "../Message/Msg_in_Body";

const ImageUploader = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleSelectFile = async () => {
    if (!file) return;

    setUploadMessage("");
    setIsUploading(true);

    if (file.size > 1 * 1024 * 1024) {
      setUploadStatus("error");
      setUploadMessage("File must be under 1 MB");
      setIsUploading(false);
      return;
    }

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      onUpload(compressedFile); // return compressed file to parent
      setUploadStatus("success");
      setUploadMessage("Image ready to be submitted!");
    } catch {
      setUploadStatus("error");
      setUploadMessage("Compression failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      className="drop-zone"
      style={{
        border: "2px dashed #aaa",
        padding: "1rem",
        borderRadius: "0.5rem",
      }}
    >
      <p>
        Upload an image under <strong>1MB</strong>
      </p>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      {file && (
        <div style={{ marginTop: "1rem" }}>
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            style={{ maxWidth: "150px", borderRadius: "0.5rem" }}
          />
          <ButtonAction
            id="prepare"
            label={isUploading ? "Processing..." : "Upload"}
            onClick={handleSelectFile}
            disabled={isUploading}
          />
          {uploadMessage && (
            <Msg_in_Body type={uploadStatus} text={uploadMessage} />
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
