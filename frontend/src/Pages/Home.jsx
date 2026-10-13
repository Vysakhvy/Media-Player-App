import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHistory, FaTrashAlt } from "react-icons/fa";
import AddVideo from "../Components/AddVideo";
import ViewVideo from "../Components/ViewVideo";
import AddCategory from "../Components/AddCategory";
import {
  deleteCategoryAPI,
  getAllCategoriesAPI,
  getAllVideosAPI,
  updateVideoAPI,
} from "../Services/allAPI";

function Home() {
  const [refreshVideos, setRefreshVideos] = useState(0);
  const [categories, setCategories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [draggedVideoId, setDraggedVideoId] = useState(null);
  const [dropCategoryId, setDropCategoryId] = useState(null);

  const loadCategories = async () => {
    try {
      const response = await getAllCategoriesAPI();
      setCategories(response.data);
    } catch (error) {
      console.error("Could not load categories:", error);
    }
  };

  const loadVideos = async () => {
    try {
      const response = await getAllVideosAPI();
      setVideos(response.data);
    } catch (error) {
      console.error("Could not load videos:", error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadVideos();
  }, [refreshVideos]);

  const assignVideoToCategory = async (category, videoId) => {
    if (videoId === null || videoId === undefined || videoId === "") {
      alert("Please drag a video onto a category.");
      return;
    }

    try {
      await updateVideoAPI(videoId, {
        categoryId: category.id,
      });

      await loadVideos();
      alert("Video assigned to " + category.name);
    } catch (error) {
      console.error("Category assignment failed:", error);
      alert("Could not assign the video. Check whether the backend is running.");
    } finally {
      setDraggedVideoId(null);
      setDropCategoryId(null);
    }
  };

  // Remove a video from its category without deleting the video
  const removeVideoFromCategory = async (video) => {
    if (!window.confirm("Remove this video from the category?")) return;

    try {
      await updateVideoAPI(video.id, {
        categoryId: null,
      });

      await loadVideos();
    } catch (error) {
      console.error("Could not remove video from category:", error);
      alert("Could not remove the video. Check whether the backend is running.");
    }
  };

  const removeCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await deleteCategoryAPI(id);

      setCategories((items) =>
        items.filter(
          (category) => String(category.id) !== String(id)
        )
      );
    } catch (error) {
      console.error("Could not delete category:", error);
      alert("Could not delete category. Check whether the backend is running.");
    }
  };

  return (
    <main className="container py-4 home-page">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div className="d-flex flex-wrap align-items-center gap-3">
          <div>
            <h1 className="fs-3 mb-0 mt-1">My Media</h1>
          </div>

          <AddVideo
            onVideoAdded={() => setRefreshVideos((value) => value + 1)}
          />
        </div>

        <div>
          <Link to="/">
            <button className="btn btn-secondary">
              <i className="fa-solid fa-arrow-left me-2"></i>
              Back
            </button>
          </Link>
        </div>

        <Link to="/watch-history" className="btn btn-outline-dark">
          <FaHistory className="me-2" />
          Watch History
        </Link>
      </div>

      <div className="row g-4">
        <section className="col-12 col-lg-9">
          <h2 className="fs-4">All Videos</h2>

          <p className="text-secondary small">
            Drag a video onto a category on the right to assign it.
          </p>

          <ViewVideo
            refreshKey={refreshVideos}
            onVideoDragStart={(id) => setDraggedVideoId(id)}
            onVideoDragEnd={() => {
              setDraggedVideoId(null);
              setDropCategoryId(null);
            }}
          />
        </section>

        <aside className="col-12 col-lg-3">
          <div className="category-panel">
            <h2 className="fs-4">Categories</h2>

            <AddCategory onCategoryAdded={loadCategories} />

            {categories.length > 0 ? (
              <ul className="list-group mt-3">
                {categories.map((category) => {
                  const categoryVideos = videos.filter(
                    (video) =>
                      String(video.categoryId) === String(category.id)
                  );

                  return (
                    <li
                      key={category.id}
                      className={`list-group-item ${
                        String(dropCategoryId) === String(category.id)
                          ? "border-primary border-3"
                          : ""
                      }`}
                      onDragEnter={(event) => {
                        event.preventDefault();
                        setDropCategoryId(category.id);
                      }}
                      onDragOver={(event) => {
                        event.preventDefault();
                        event.dataTransfer.dropEffect = "move";
                        setDropCategoryId(category.id);
                      }}
                      onDragLeave={(event) => {
                        if (
                          !event.currentTarget.contains(event.relatedTarget)
                        ) {
                          setDropCategoryId(null);
                        }
                      }}
                      onDrop={(event) => {
                        event.preventDefault();
                        event.stopPropagation();

                        const videoId =
                          event.dataTransfer.getData("text/plain") ||
                          draggedVideoId;

                        if (videoId !== null && videoId !== "") {
                          assignVideoToCategory(category, videoId);
                        }
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center gap-2">
                        <strong className="text-break">
                          {category.name}
                        </strong>

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger category-delete"
                          title={`Delete ${category.name}`}
                          aria-label={`Delete ${category.name}`}
                          onClick={() => removeCategory(category.id)}
                        >
                          <FaTrashAlt />
                        </button>
                      </div>

                      {categoryVideos.length > 0 ? (
                        <div className="mt-3">
                          {categoryVideos.map((video) => (
                            <div
                              key={video.id}
                              className="mb-3 p-2 border rounded"
                            >
                              <img
                                src={
                                  video.imageUrl ||
                                  "https://placehold.co/300x180?text=Media"
                                }
                                alt={video.caption}
                                className="img-fluid rounded w-100"
                                style={{
                                  maxHeight: "120px",
                                  objectFit: "cover",
                                }}
                                onError={(event) => {
                                  event.currentTarget.src =
                                    "https://placehold.co/300x180?text=Media";
                                }}
                              />

                              <p className="small fw-semibold mt-2 mb-2 text-break">
                                {video.caption}
                              </p>

                              {/* Remove only the category assignment */}
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger w-100"
                                onClick={() =>
                                  removeVideoFromCategory(video)
                                }
                              >
                                <FaTrashAlt className="me-2" />
                                Remove 
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="small text-secondary mt-2 mb-0">
                          No videos assigned yet. Drop a video here.
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-secondary small mt-3">
                Your categories will appear here.
              </p>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Home;