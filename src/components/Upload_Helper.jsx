import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import { supabase } from "../supabaseDB";
import ConfirmMessage from "./Msg_in_Body";

const ProfileImageUploader = ({ userId, onUpload }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadStatus, setUploadStatus] = useState(""); // added
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!profileImage || !userId) return;

    setUploadStatus("");
    setUploadMessage("");
    setIsUploading(true);

    if (profileImage.size > 1 * 1024 * 1024) {
      setUploadStatus("error");
      setUploadMessage("Original file must be under 1 MB.");
      setIsUploading(false);
      return;
    }

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    let compressedFile;
    try {
      compressedFile = await imageCompression(profileImage, options);
    } catch (compressionError) {
      setUploadStatus("error");
      setUploadMessage("Image compression failed. Please try another file.");
      setIsUploading(false);
      return;
    }

    const fileExt = compressedFile.name.split(".").pop();
    const fileName = `user-${userId}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("profile-pictures")
      .upload(filePath, compressedFile, {
        contentType: compressedFile.type,
        upsert: true,
      });

    if (uploadError) {
      setUploadStatus("error");
      setUploadMessage(`Upload failed: ${uploadError.message}`);
      setIsUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("profile-pictures")
      .getPublicUrl(filePath);

    const publicUrl = urlData?.publicUrl || "";

    const { error: dbError } = await supabase
      .from("profiles")
      .upsert([{ id: userId, profile_img_url: publicUrl }]);

    if (dbError) {
      setUploadStatus("error");
      setUploadMessage(`Image uploaded, but failed to save URL: ${dbError.message}`);
      setIsUploading(false);
      return;
    }

    setUploadStatus("success");
    setUploadMessage("Image uploaded and saved successfully! If you are replacing an image, please hard refresh the page to see the new image.");
    setIsUploading(false);
    onUpload(publicUrl);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
          setProfileImage(file);
        }
      }}
      className="drop-zone"
      style={{
        border: "2px dashed #aaa",
        padding: "1rem",
        textAlign: "center",
        borderRadius: "0.5rem",
        marginBottom: "1rem",
      }}
    >
      <p>Drag and drop an image here, or click below to select a file that is <strong>1 MB or less</strong></p>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setProfileImage(e.target.files[0])}
      />

      {profileImage && (
        <div style={{ marginTop: "1rem" }}>
          <img
            src={URL.createObjectURL(profileImage)}
            alt="Preview"
            style={{ maxWidth: "150px", borderRadius: "0.5rem" }}
          />

          <button
            type="button"
            onClick={handleUpload}
            disabled={isUploading}
            className="button"
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>

          {/* ✅ Use ConfirmMessage for feedback */}
          {uploadMessage && (
            <ConfirmMessage type={uploadStatus} text={uploadMessage} />
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileImageUploader;
