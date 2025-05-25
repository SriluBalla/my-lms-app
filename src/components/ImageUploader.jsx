// ProfileImageUploader.jsx — reusable image upload component for Supabase with auto-save to profiles and compression

import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import { supabase } from "../supabaseDB";

const ProfileImageUploader = ({ userId, onUpload }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(""); // '', 'success', or 'error'
  const [uploadMessage, setUploadMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!profileImage || !userId) return;

    setUploadStatus("");
    setUploadMessage("");
    setIsUploading(true);

    if (profileImage.size > 5 * 1024 * 1024) {
      setUploadStatus("error");
      setUploadMessage("Original file must be under 5 MB.");
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

    // Automatically save the uploaded URL to the profiles table
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
    setUploadMessage("Image uploaded and saved successfully!");
    setIsUploading(false);
    onUpload(publicUrl);
  };

  return (
    <div className="form-group">
      <label htmlFor="profileImage">Upload Profile Image</label>
      <input
        type="file"
        id="profileImage"
        accept="image/*"
        onChange={(e) => setProfileImage(e.target.files[0])}
      />
      <button type="button" onClick={handleUpload} disabled={isUploading} className="button">
        {isUploading ? "Uploading..." : "Upload"}
      </button>
      {uploadMessage && (
        <p className={uploadStatus === "success" ? "success-msg" : "error-msg"}>
          {uploadMessage}
        </p>
      )}
    </div>
  );
};

export default ProfileImageUploader;
