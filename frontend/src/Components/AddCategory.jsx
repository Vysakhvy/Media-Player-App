import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { addCategoryAPI } from "../Services/allAPI";

function AddCategory({ onCategoryAdded }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async (event) => {
    event.preventDefault();
    if (!name.trim()) return alert("Please enter a category name");
    try {
      setLoading(true);
      await addCategoryAPI({ name: name.trim(), createdAt: new Date().toISOString() });
      setName("");
      setShow(false);
      onCategoryAdded?.();
    } catch {
      alert("Could not add category. Check whether the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="btn btn-dark w-100" onClick={() => setShow(true)}>+ Add Category</button>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton><Modal.Title>Add Category</Modal.Title></Modal.Header>
        <form onSubmit={handleAdd}>
          
          <Modal.Body style={{ backgroundColor: "#212529" }}>
            <label className="form-label" htmlFor="category-name" style={{ color: "#fff" }}>Category name</label>
            <input id="category-name" className="form-control" placeholder="e.g. Travel, Learning" value={name} onChange={(e) => setName(e.target.value)} required />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="button" onClick={() => setShow(false)}>Cancel</Button>
            <Button variant="dark" type="submit" disabled={loading}>{loading ? "Saving..." : "Save Category"}</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
export default AddCategory;
