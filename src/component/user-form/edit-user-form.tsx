import { Field, Formik } from "formik";
import { useState, useEffect } from "react";
import { getAllUsersFullnameApi } from "../../api/api";
import { EUserRole } from "../../const/const";
import { TUser } from "../../const/types";
import { userValidationSchema } from "../../const/userValidationSchema";
import Button from "../button/button";
import "./user-form.sass";

type Props = {
  onSubmit: (userId: string, newUser: TUser) => void;
  user: TUser;
};

const EditUserForm = ({ onSubmit, user }: Props) => {
  const [usersFullname, setUsersFullname] = useState<
    { fullName: string; id: string }[]
  >([]);

  const getUsersFullname = async () => {
    const res = await getAllUsersFullnameApi();

    if (res) {
      setUsersFullname(res);
    }
  };

  useEffect(() => {
    getUsersFullname();
  }, []);

  return (
    <Formik
      initialValues={{
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        chief: user.chief,
      }}
      onSubmit={() => {}}
      validationSchema={userValidationSchema}
      validateOnBlur
    >
      {({ values, errors, touched, isValid, dirty }) => (
        <form className="user-form">
          <Field type="text" name="fullName" placeholder="Name:" />

          <Field type="email" name="email" placeholder="Email:" />

          <Field type="text" name="phone" placeholder="Phone:" />

          <Field as="select" name="role" placeholder="Role:">
            <option value={EUserRole.user}>User</option>
            <option value={EUserRole.admin}>Admin</option>
            <option value={EUserRole.manager}>Manager</option>
          </Field>

          <Field as="select" name="chief" placeholder="Chief:">
            {usersFullname.map((user) => (
              <option value={user.id} key={user.id}>
                {user.fullName}
              </option>
            ))}
          </Field>

          {errors.fullName && touched.fullName && (
            <div className="user-form__error">{errors.fullName}</div>
          )}

          {errors.phone && touched.phone && (
            <div className="user-form__error">{errors.phone}</div>
          )}

          {errors.email && touched.email && (
            <div className="user-form__error">{errors.email}</div>
          )}

          {errors.role && touched.role && (
            <div className="user-form__error">{errors.role}</div>
          )}

          <Button
            onClick={() => onSubmit(user.id!, values)}
            isActive={isValid && dirty}
          >
            Edit user
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default EditUserForm;
