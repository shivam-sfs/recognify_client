import ApiFeature from "@/Api/ApiFeature";
import { setLoader } from "@/redux/reducer/loader";
import { Button, Form } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import React, { ChangeEvent, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { setRecallApi } from "@/redux/reducer/RecallApi";
import ShowToast, { error, errorMessage } from "../Utils/ShowToast";
import { useRouter } from "next/router";
import { MAX_FILE_SIZE_BYTES, PAGE_TYPE_ADD } from "../Utils/constants";
import { TagsInput } from "react-tag-input-component";

const ActionScreen: React.FC<ActionModalType> = (props) => {
  // props
  const { id, onClose, isActive, data, type, urls, path } = props;

  // validation logic
  const validation = {
    work: Yup.string()
      .required("work Name is required")
      .min(2, "work must be at least 2 characters")
      .max(30, "work can be at most 30 characters"),
    type: Yup.string().required("Industry is required"),
    price: Yup.string().required("Work cost is required"),
    status: Yup.string().required("status is required"),
    message: Yup.string().required("Description is required"),
    deadline: Yup.string().required("what is the project deadline"),
  };

  // states

  const [formInitData] = useState<any>({
    work: type == PAGE_TYPE_ADD ? "" : data.work,
    type: type == PAGE_TYPE_ADD ? "" : data.type,
    price: type == PAGE_TYPE_ADD ? "" : data.price,
    status: type == PAGE_TYPE_ADD ? "" : data.status,
    message: type == PAGE_TYPE_ADD ? "" : data.message,
    deadline: type == PAGE_TYPE_ADD ? "" : data.deadline,
  });

  //   Hooks
  const dispatch = useDispatch();

  const file2Base64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString() || "");
      reader.onerror = (error) => reject(error);
    });
  };

  //   from submit
  const onsubmit = async (value: any) => {
    dispatch(setLoader(true));
    let res;
    try {
      if (type == PAGE_TYPE_ADD) {
        res = await ApiFeature.post(
          urls,
          { ...value, partner_id: data.partner_id },
          0
        );
      } else {
        res = await ApiFeature.put(urls, value, id);
      }
      if (res.status == 200) {
        dispatch(setLoader(false));
        dispatch(setRecallApi(true));
        onClose("");
      }
    } catch (error) {
      dispatch(setLoader(false));
    } finally {
      dispatch(setLoader(false));
    }
  };
  console.log(data);
  return (
    <Modal
      show={isActive}
      onHide={() => onClose("")}
      dialogClassName="modal-lg"
      style={{ marginLeft: "23px" }}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h6 className="col-md-6 mb-2 mb-md-0">Profile</h6>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize={true}
          onSubmit={onsubmit}
          initialValues={formInitData}
          validationSchema={Yup.object().shape(validation)}
        >
          {({ values, setFieldValue, errors, handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="w-100">
              {<>{console.log(errors)}</>}
              <div className="row">
                <div className="col-md-6">
                  <Form.Group controlId="work">
                    <Form.Label className="form-control-label">
                      <h6>Work</h6>
                    </Form.Label>
                    <Field
                      type="text"
                      className="form-control-alternative form-control field-input"
                      name="work"
                      autoComplete="off"
                      placeholder="Work"
                    />
                    <ErrorMessage
                      name="work"
                      component="span"
                      className="error-message"
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group controlId="type">
                    <Form.Label className="form-control-label">
                      <h6>Industry</h6>
                    </Form.Label>
                    <Field
                      type="text"
                      className="form-control-alternative form-control field-input"
                      name="type"
                      autoComplete="off"
                      placeholder="Industry"
                    />
                    <ErrorMessage
                      name="type"
                      component="span"
                      className="error-message"
                    />
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group controlId="price">
                    <Form.Label className="form-control-label">
                      <h6>cost in Rupees</h6>
                    </Form.Label>
                    <Field
                      type="number"
                      className="form-control-alternative form-control field-input"
                      name="price"
                      autoComplete="off"
                      placeholder="cost"
                    />
                    <ErrorMessage
                      name="price"
                      component="span"
                      className="error-message"
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group controlId="deadline">
                    <Form.Label className="form-control-label">
                      <h6>Deadline</h6>
                    </Form.Label>
                    <Field
                      type="date"
                      className="form-control-alternative form-control field-input"
                      name="deadline"
                      autoComplete="off"
                      placeholder="cost"
                    />
                    <ErrorMessage
                      name="deadline"
                      component="span"
                      className="error-message"
                    />
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group controlId="status">
                    <Form.Label className="form-control-label">
                      <h6>status</h6>
                    </Form.Label>
                    <Field
                      as="select"
                      className="form-control-alternative form-control field-input"
                      name="status"
                    >
                      <option hidden value="">
                        Select status
                      </option>
                      <option selected value={"initial_stage"}>
                        Initial Stage
                      </option>
                      <option value={"in_progress"}>In Progress</option>
                      <option value={"completed"}>Completed</option>
                    </Field>
                    <ErrorMessage
                      name="status"
                      component="span"
                      className="error-message"
                    />
                  </Form.Group>
                </div>
              </div>
              <div className="mt-1">
                <Form.Group controlId="description">
                  <Form.Label className="form-control-label">
                    <h6>Description</h6>
                  </Form.Label>
                  <Field
                    as="textarea"
                    rows={4}
                    type="textarea"
                    placeholder="Description"
                    id="message"
                    name="message"
                    className="form-control-alternative form-control"
                  />
                  <ErrorMessage
                    name="message	"
                    component="span"
                    className="error-message"
                  />
                </Form.Group>
              </div>
              <div className="row mt-4">
                <div className="col-md-12 m-auto text-center">
                  <Button className="btn btn-primary w-50" type="submit">
                    {type == PAGE_TYPE_ADD ? "Add" : "Update"}
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ActionScreen;
