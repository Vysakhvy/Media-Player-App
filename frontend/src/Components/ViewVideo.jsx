import { useEffect, useState } from "react";
import { FaGripVertical } from "react-icons/fa";
import VideoCard from "./VideoCard";
import { getAllVideosAPI, updateVideoAPI } from "../Services/allAPI";

function ViewVideo({ refreshKey = 0, onVideoDragStart, onVideoDragEnd }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draggedId, setDraggedId] = useState(null);
  const [savingOrder, setSavingOrder] = useState(false);

  const loadVideos = async () => {
    try {
      const response = await getAllVideosAPI();
      setVideos(response.data);
    } catch {
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadVideos(); }, [refreshKey]);

  const handleDrop = async (targetId) => {
    if (draggedId === null || draggedId === targetId) {
      setDraggedId(null);
      return;
    }

    const oldVideos = [...videos];
    const reordered = [...videos];
    const fromIndex = reordered.findIndex((video) => String(video.id) === String(draggedId));
    const toIndex = reordered.findIndex((video) => String(video.id) === String(targetId));
    if (fromIndex < 0 || toIndex < 0) return setDraggedId(null);

    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);
    setVideos(reordered);
    setDraggedId(null);

    try {
      setSavingOrder(true);
      await Promise.all(reordered.map((video, index) => updateVideoAPI(video.id, { position: index })));
    } catch {
      alert("The video order changed on screen, but could not be saved. Check the backend.");
      setVideos(oldVideos);
    } finally {
      setSavingOrder(false);
    }
  };

  if (loading) return <p>Loading videos...</p>;
  if (!videos.length) return <p className="text-muted">No videos yet. Click “Upload New Video” to add your first video.</p>;

  return (
    <>
      {savingOrder && <p className="small text-secondary">Saving video order...</p>}
      <div className="row g-4 my-2">
        {videos.map((video) => (
          <div
            className={`col-12 col-sm-6 col-xl-4 video-drag-item ${String(draggedId) === String(video.id) ? "is-dragging" : ""}`}
            key={video.id}
            draggable
            onDragStart={(event) => {
              setDraggedId(video.id);
              onVideoDragStart?.(video.id);
              event.dataTransfer.effectAllowed = "move";
              event.dataTransfer.setData("text/plain", String(video.id));
            }}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              handleDrop(video.id);
            }}
            onDragEnd={() => { setDraggedId(null); onVideoDragEnd?.(); }}
          >
            <div className="drag-hint"><FaGripVertical /> Drag to reorder</div>
            <VideoCard video={video} onVideoDeleted={loadVideos} />
          </div>
        ))}
      </div>
    </>
  );
}
export default ViewVideo;
