export async function uploadToCloudinary(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET!);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );
  const data = await res.json();
  return data.secure_url;
}
