import { useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewVideo = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const showToast = useShowToast();
  const maxFileSizeInBytes = 10 * 1024 * 1024; // 10MB

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      if (file.size > maxFileSizeInBytes) {
        showToast("Error", "Video file size must be less than 10MB", "error");
        setSelectedVideo(null);
        return;
      }
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedVideo(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      showToast("Error", "Please select a valid video file", "error");
      setSelectedVideo(null);
    }
  };

  return { selectedVideo, handleVideoChange, setSelectedVideo };
};

export default usePreviewVideo;
