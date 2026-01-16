import { useEffect, useState } from "react";
import "./Users.scss";
import userService from "../../services/userService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModelDelete from "./ModalDelete";
import ModelUser from "./ModalUser";

const Users = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  // của Model Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataModal, setDataModal] = useState({});

  //của Model Create/Update
  const [isShowModalUser, setIsShowModalUser] = useState(false);
  const [actionModelUser, setActionModelUser] = useState("CREATE");
  const [dataModelUser, setDataModelUser] = useState({});

  const LIMIT = 5;

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const fetchUsers = async (page) => {
    let res = await userService.fetchAllUsers(page, LIMIT);
    if (res && res.EC === 0) {
      setListUsers(res.DT.users);
      setTotalPages(Math.ceil(res.DT.totalItems / LIMIT));

      setCurrentPage(page - 1);
    }
  };

  const handlePageClick = (event) => {
    fetchUsers(event.selected + 1);
  };

  const handleDeleteUser = async (user) => {
    setDataModal(user);
    setIsShowModalDelete(true);
  };

  const handleCteateUser = async () => {
    setIsShowModalUser(true);
    setActionModelUser("CREATE");
  };

  const handleEditUser = async (user) => {
    setActionModelUser("UPDATE");
    setDataModelUser(user);
    setIsShowModalUser(true);
  };

  const handleConfirmDelete = async () => {
    let res = await userService.deleteUser(dataModal.id);

    if (res && res.EC === 0) {
      toast.success(res.EM);
      setIsShowModalDelete(false);
      fetchUsers(1);
    } else {
      toast.error(res.EM);
    }
  };

  const handleRefresh = async () => {
    await fetchUsers();
  }

  return (
    <>
      <div className=" container">
        <div className="manage-users-container">
          <div className="user-header">
            <div className="title mt-3">
              <h3>Manage Users</h3>
            </div>
            <div className="acctions my-3">
              <button className="btn btn-success refresh" onClick={()=> handleRefresh()}>
                <i className="fa fa-refresh"></i>Refresh
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleCteateUser()}
              >
                <i className="fa fa-plus-circle"></i>
                Add User
              </button>
            </div>
          </div>

          <div className="user-body my-3">
            <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Id</th>
                  <th scope="col">Email</th>
                  <th scope="col">Username</th>
                  <th scope="col">Group</th>
                </tr>
              </thead>

              <tbody>
                {listUsers && listUsers.length > 0 ? (
                  <>
                    {listUsers.map((item, index) => {
                      return (
                        <tr key={item.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.id}</td>
                          <td>{item.email}</td>
                          <td>{item.username}</td>
                          <td>{item.Group ? item.Group.name : ""}</td>
                          <td>
                            <button
                              className="btn btn-warning mx-3 edit"
                              onClick={() => handleEditUser(item)}
                            >
                              <i
                                className="fa fa-pencil"
                                aria-hidden="true"
                              ></i>{" "}
                              Edit
                            </button>
                            <button
                              className="btn btn-danger delete"
                              onClick={() => handleDeleteUser(item)}
                            >
                              <i className="fa fa-trash" aria-hidden="true"></i>{" "}
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <span>Not found users</span>
                  </>
                )}
              </tbody>
            </table>
          </div>

          <div className="user-footer">
            <ReactPaginate
              forcePage={currentPage}
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={totalPages}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      </div>
      <ModelDelete
        show={isShowModalDelete}
        handleClose={() => setIsShowModalDelete(false)}
        confirmDelete={handleConfirmDelete}
        dataModal={dataModal}
      />

      <ModelUser
        show={isShowModalUser}
        handleClose={() => setIsShowModalUser(false)}
        fetchUsers={fetchUsers}
        action={actionModelUser}
        currentPage={currentPage}
        dataModelUser={dataModelUser}
      />
    </>
  );
};
export default Users;
