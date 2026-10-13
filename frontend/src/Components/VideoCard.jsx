import { useState } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { RiDeleteBin6Line } from "react-icons/ri";
import { addToWatchHistoryAPI, deleteVideoAPI } from "../Services/allAPI";

function getEmbedUrl(url) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) return `https://www.youtube.com/embed/${parsed.pathname.slice(1).split("/")[0]}?autoplay=1`;
    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}?autoplay=1`;
      if (parsed.pathname.startsWith("/shorts/")) return `https://www.youtube.com/embed/${parsed.pathname.split("/")[2]}?autoplay=1`;
      if (parsed.pathname.startsWith("/embed/")) return `${url}${url.includes("?") ? "&" : "?"}autoplay=1`;
    }
  } catch { /* A direct media URL may be supplied. */ }
  return "";
}

function VideoCard({ video, onVideoDeleted }) {
  const [show, setShow] = useState(false);
  const [playing, setPlaying] = useState(false);
  const embedUrl = getEmbedUrl(video.videoUrl);

  const handlePlay = async () => {
    try {
      await addToWatchHistoryAPI({
        videoId: video.id,
        caption: video.caption,
        imageUrl: video.imageUrl,
        videoUrl: video.videoUrl
      });
    } catch {
      alert("Video could not be added to watch history. Check the backend.");
    }
    setPlaying(true);
    setShow(true);
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this video?")) return;
    try {
      await deleteVideoAPI(video.id);
      onVideoDeleted();
    } catch {
      alert("Could not delete this video.");
    }
  };

  return (
    <>
      <Card className="h-100 shadow-sm">
        <Card.Img
          onClick={handlePlay}
          variant="top"
          src={video.imageUrl || "https://placehold.co/600x350?text=Media+Player"}
          alt={video.caption}
          style={{ height: 190, objectFit: "cover", cursor: "pointer" }}
          onError={(e) => { e.currentTarget.src = "https://placehold.co/600x350?text=Media+Player"; }}
        />
        <Card.Body>
          <Card.Text className="d-flex justify-content-between align-items-center mb-0">
            <span>{video.caption}</span>
            <button className="btn btn-link text-danger p-0" title="Delete video" onClick={handleDelete}>
              <RiDeleteBin6Line className="fs-4" />
            </button>
          </Card.Text>
          <Button className="mt-3" variant="dark" onClick={handlePlay}>Play Video</Button>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={() => { setShow(false); setPlaying(false); }} size="lg" centered>
        <Modal.Header closeButton><Modal.Title>{video.caption}</Modal.Title></Modal.Header>
        <Modal.Body>
          {playing && (embedUrl
            ? <div className="ratio ratio-16x9"><iframe src={embedUrl} title={video.caption} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>
            : <video key={video.videoUrl} controls autoPlay playsInline className="w-100" src={video.videoUrl} onError={() => alert("This video URL cannot be played directly. Use a valid MP4 link or a YouTube video link.")}>Your browser does not support video playback.</video>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
export default VideoCard;
