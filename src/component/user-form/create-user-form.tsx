import { Field, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import {
  getAllUsersFullnameApi,
  getPossibleSubordinatesApi,
} from "../../api/api";
import { EUserRole } from "../../const/const";
import { userValidationSchema } from "../../const/userValidationSchema";
import { TUser } from "../../const/types";
import Button from "../button/button";
import "./user-form.sass";

type Props = {
  onSubmit: (newUser: TUser, subordinateList: TUser[]) => void;
};

const CreateUserForm = ({ onSubmit }: Props) => {
  const [usersFullname, setUsersFullname] = useState<TUser[]>([]);
  const [possibleSubordinates, setPossibleSubordinates] = useState<TUser[]>([]);
  const [userSubordinateList, setUserSubordinateList] = useState<TUser[]>([]);
  const selectRef = useRef(null);

  const getUsersFullname = async () => {
    const res = await getAllUsersFullnameApi();

    if (res) {
      setUsersFullname(res);
    }
  };

  const handleAddSubordinate = (user: TUser) => {
    if (
      userSubordinateList &&
      userSubordinateList.find((u) => user.id === u.id)
    ) {
      return;
    }

    setUserSubordinateList([...userSubordinateList, user]);
  };

  const handleRemoveSubordinate = (user: TUser) => {
    setUserSubordinateList(userSubordinateList.filter((u) => u.id !== user.id));
  };

  const getPossibleSubordinates = async (userRole: string) => {
    const res = await getPossibleSubordinatesApi(userRole);

    if (res) {
      setPossibleSubordinates(res);
    }
  };

  useEffect(() => {
    getUsersFullname();
  }, []);

  useEffect(() => {
    const select = selectRef.current;

    const handleChange = (e: any) => {
      getPossibleSubordinates(e.target.value);
    };

    if (select) {
      // @ts-ignore
      select.addEventListener("change", handleChange);
    }

    return () => {
      if (select) {
        // @ts-ignore
        select.removeEventListener("change", handleChange);
      }
    };
  }, []);

  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        phone: "",
        role: "",
        chief: "",
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

          <Field as="select" name="role" placeholder="Role:" ref={selectRef}>
            <option disabled value="">
              Select
            </option>
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

          {/* TODO layout */}
          <div className="">
            Subordinate list:
            {userSubordinateList && (
              <div className="">
                {userSubordinateList.map((user) => (
                  <div className="">
                    {user.fullName}: ({user.id})
                    <div
                      className=""
                      onClick={() => handleRemoveSubordinate(user)}
                    >
                      -
                    </div>
                  </div>
                ))}
              </div>
            )}
            Add users:
            {possibleSubordinates.map((user) => (
              <div className="">
                {user.fullName}: ({user.id})
                <div className="" onClick={() => handleAddSubordinate(user)}>
                  +
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={() => onSubmit(values, userSubordinateList)}
            isActive={isValid && dirty}
          >
            Add user
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default CreateUserForm;
