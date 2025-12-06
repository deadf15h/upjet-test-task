import { Field, Formik } from "formik";
import { TUser } from "../../const/types";
import "./add-user-form.sass";

type Props = {
  onSubmit: (newUser: TUser) => void;
};

const AddUserForm = ({ onSubmit }: Props) => {
  return (
    <div className="add-user-form">
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          phone: "",
          role: "",
          chief: "",
        }}
        onSubmit={() => {}}
      >
        {({ values }) => (
          <form className="footer-form__form">
            <Field type="text" name="fullName" placeholder="Name:" />

            <Field type="email" name="email" placeholder="Email:" />

            <Field type="text" name="phone" placeholder="Phone:" />

            {/* TODO add select */}
            <Field as="select" name="role" placeholder="Role:" />

            <Field as="select" name="chief" placeholder="Chief:" />

            {/* TODO add subordinateList */}
            {/* <Field type="text" name="phone" placeholder="Phone:" /> */}

            <div onClick={() => onSubmit(values)}>Add user</div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddUserForm;
