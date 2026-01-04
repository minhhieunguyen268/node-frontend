import { Modal, Button } from "react-bootstrap";

const ModelDelete = (props) => {
  const { show, handleClose, confirmDelete, dataModal } = props;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      modal-top-centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm delete</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="text-danger fw-bold">
          Are you sure to delete user:{" "}
          <span>{dataModal?.username}</span> ?
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={confirmDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModelDelete;
