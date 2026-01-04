import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import userService from "../../services/userService.js";
import _ from "lodash";
import { toast } from "react-toastify";

const ModelUser = (props) => {
  const defaultData = {
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
    address: "",
    sex: "male",
    groupId: "",
  };

  const validInputsDefault = {
    email: true,
    phoneNumber: true,
    username: true,
    password: true,
    address: true,
    sex: true,
    groupId: true,
  };

  const [userData, setUserData] = useState(defaultData);
  const [validInputs, setvalidInputs] = useState(validInputsDefault);
  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    getGroups();
  }, []);

  useEffect(() => {
    if (props.action === "UPDATE" && props.show == true) {
      setUserData({
        ...props.dataModelUser,
        groupId: props.dataModelUser.Group
          ? String(props.dataModelUser.Group.id)
          : "",
      });
      setvalidInputs(validInputsDefault);
    }

    if (!props.show) {
      setUserData(defaultData);
      setvalidInputs(validInputsDefault);
    }
  }, [props.show]);

  const getGroups = async () => {
    let res = await userService.fetchGroups();
    if (res && res.data && res.data.EC === 0) {
      setUserGroups(res.data.DT);
      if (res.data.DT && res.data.DT.length > 0) {
        let group = res.data.DT;
        setUserData({
          ...userData,
          groupId: group[0].id,
        });
      }
    }
  };

  const handleOnchangeInput = (value, name) => {
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };

  const checkValidInputs = () => {
    setvalidInputs(validInputsDefault);
    let arr = ["email", "phoneNumber", "password", "groupId"];

    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs[arr[i]] = false;
        setvalidInputs(_validInputs);

        toast.error(`Empty input ${arr[i]}`);
        return false;
      }
    }
    let regx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!String(userData["email"]).toLowerCase().match(regx)) {
      let _validInputs = _.cloneDeep(validInputsDefault);
      _validInputs.email = false;
      setvalidInputs(_validInputs);

      toast.error("please enter a vaild email address");
      return false;
    }
    return true;
  };

  const handleConfirmUser = async () => {
    try {
      let res;
      if (props.action === "UPDATE") {
        res = await userService.updateUser(userData);
      } else {
        let isValid = checkValidInputs();
        if (!isValid) return;
        res = await userService.createNewUser(userData);
      }

      if (res && res.data && res.data.EC === 0) {
        toast.success(res.data.EM);
        resetForm();
        props.handleClose();
        props.fetchUsers(props.currentPage + 1);
      } else {
        toast.error(res.data.EM);

        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs.email = false;
        setvalidInputs(_validInputs);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.EM) {
        toast.error(error.response.data.EM);

        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs.password = false;
        setvalidInputs(_validInputs);
      } else {
        toast.error("Error from server");
      }
    }
  };

  const resetForm = () => {
    setUserData(defaultData);
    setvalidInputs(validInputsDefault);
  };

  return (
    <>
      <Modal
        size="lg"
        show={props.show}
        onHide={props.handleClose}
        className="model-user"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <span>
              {props.action === "CREATE" ? "Create new user" : "Edit user"}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label htmlFor="email">
                Email Address (<span className="text-danger">*</span>):
              </label>
              <input
                type="email"
                disabled={props.action === "CREATE" ? false : true}
                className={
                  validInputs.email ? "form-control" : "form-control is-invalid"
                }
                id="email"
                value={userData.email}
                onChange={(e) => handleOnchangeInput(e.target.value, "email")}
              />
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label htmlFor="phonenumber">
                Phone Number (<span className="text-danger">*</span>):
              </label>
              <input
                type="text"
                disabled={props.action === "CREATE" ? false : true}
                className={
                  validInputs.phoneNumber
                    ? "form-control"
                    : "form-control is-invalid"
                }
                id="phonenumber"
                value={userData.phoneNumber}
                onChange={(e) =>
                  handleOnchangeInput(e.target.value, "phoneNumber")
                }
              />
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={userData.username}
                onChange={(e) =>
                  handleOnchangeInput(e.target.value, "username")
                }
              />
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label htmlFor="password">
                Password (<span className="text-danger">*</span>):
              </label>
              <input
                type="password"
                disabled={props.action === "CREATE" ? false : true}
                className={
                  validInputs.password
                    ? "form-control"
                    : "form-control is-invalid"
                }
                id="password"
                value={userData.password}
                onChange={(e) =>
                  handleOnchangeInput(e.target.value, "password")
                }
              />
            </div>

            <div className="col-12 form-group">
              <label htmlFor="address">Address:</label>
              <textarea
                type="text"
                className="form-control"
                id="address"
                value={userData.address}
                onChange={(e) => handleOnchangeInput(e.target.value, "address")}
              />
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label htmlFor="gender">
                Gender:
              </label>
              <select
                className="form-select"
                id="gender"
                value={userData.sex}
                onChange={(e) => handleOnchangeInput(e.target.value, "sex")}
              >
                <option value="" hidden>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label htmlFor="group">
                Group (<span className="text-danger">*</span>):
              </label>

              <select
                className={
                  validInputs.groupId ? "form-select" : "form-select is-invalid"
                }
                id="group"
                value={userData.groupId}
                onChange={(e) => handleOnchangeInput(e.target.value, "groupId")}
              >
                <option value="" hidden>
                  Select Group
                </option>

                {userGroups &&
                  userGroups.length > 0 &&
                  userGroups.map((group, index) => (
                    <option key={`group-${index}`} value={group.id}>
                      {group.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleConfirmUser()}>
            {props.action === "CREATE" ? "Add User" : "Update User"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModelUser;
