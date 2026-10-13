import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaTrashAlt } from "react-icons/fa";
import { deleteWatchHistoryAPI, getWatchHistoryAPI } from "../Services/allAPI";

function WatchHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = async () => {
    try {
      const response = await getWatchHistoryAPI();
      setHistory(response.data);
    } catch {
      alert("Could not load watch history. Check whether the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadHistory(); }, []);

  const removeItem = async (id) => {
    try {
      await deleteWatchHistoryAPI(id);
      setHistory((items) => items.filter((item) => item.id !== id));
    } catch {
      alert("Could not remove this item.");
    }
  };

  return (
    <main className="container py-4 watch-history-page">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <span className="hero-kicker">YOUR RECENT ACTIVITY</span>
          <h1 className="fs-3 mt-1 mb-0">Watch History</h1>
        </div>
        <Link to="/home" className="btn btn-dark"><FaHome className="me-2" /> Back Home</Link>
      </div>

      {loading ? <p>Loading history...</p> : history.length === 0 ? (
        <div className="empty-state">
          <h2 className="h5">Your watch history is empty</h2>
          <p className="text-secondary mb-3">Play a video from Home and it will appear here.</p>
          <Link to="/home" className="btn btn-outline-dark"><FaHome className="me-2" /> Go to Home</Link>
        </div>
      ) : (
        <div className="table-responsive history-table-wrap">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                <th scope="col">Sl. No.</th>
                <th scope="col">Caption</th>
                <th scope="col">URL</th>
                <th scope="col">Time Stamp</th>
                <th scope="col" className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td className="history-caption">{item.caption || "Untitled video"}</td>
                  <td className="history-url">
                    {item.videoUrl ? <a href={item.videoUrl} target="_blank" rel="noreferrer">{item.videoUrl}</a> : <span className="text-secondary">No URL</span>}
                  </td>
                  <td>{item.watchedAt ? new Date(item.watchedAt).toLocaleString() : "Not available"}</td>
                  <td className="text-center">
                    <button type="button" className="btn btn-outline-danger btn-sm" title="Delete history item" aria-label={`Delete history item ${item.caption || index + 1}`} onClick={() => removeItem(item.id)}>
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
export default WatchHistory;
