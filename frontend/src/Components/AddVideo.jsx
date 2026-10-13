import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaCloudArrowUp } from "react-icons/fa6";
import { addVideoAPI } from "../Services/allAPI";

function AddVideo({ onVideoAdded }) {
  const [show, setShow] = useState(false);
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!caption.trim() || !imageUrl.trim() || !videoUrl.trim()) {
      alert("Please complete all fields.");
      return;
    }

    try {
      setLoading(true);
      await addVideoAPI({
        caption: caption.trim(),
        imageUrl: imageUrl.trim(),
        videoUrl: videoUrl.trim(),
        createdAt: new Date().toISOString(),
        position: Date.now()
      });
      setCaption("");
      setImageUrl("");
      setVideoUrl("");
      setShow(false);
      onVideoAdded?.();
    } catch {
      alert("Could not upload video. Check whether the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="btn btn-dark" onClick={() => setShow(true)}>
        <FaCloudArrowUp className="me-2" /> Upload New Video
      </button>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton className="upload-modal-header">
          <Modal.Title><FaCloudArrowUp className="me-2" /> Upload Videos</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleUpload}>
          <Modal.Body>
            <label className="form-label" htmlFor="video-caption">Video caption</label>
            <input id="video-caption" className="form-control mb-3" placeholder="Enter video caption" value={caption} onChange={(e) => setCaption(e.target.value)} required />
            <label className="form-label" htmlFor="video-thumbnail">Thumbnail image URL</label>
            <input id="video-thumbnail" type="url" className="form-control mb-3" placeholder="https://example.com/thumbnail.jpg" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
            <label className="form-label" htmlFor="video-url">Video URL</label>
            <input id="video-url" type="url" className="form-control" placeholder="MP4 or YouTube video URL" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} required />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="button" onClick={() => setShow(false)}>Cancel</Button>
            <Button variant="dark" type="submit" disabled={loading}>{loading ? "Uploading..." : "Upload Video"}</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
export default AddVideo;
