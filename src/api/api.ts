import { EUserRole } from "../const/const";
import { TUser } from "../const/types";
import { supabase } from "./supabase";

export const getUsersApi = async () => {
  let { data, error } = await supabase.from("users").select("*");

  if (data && !error) {
    return data;
  }

  return null;
};

export const getUserApi = async (userId: string) => {
  let { data, error } = await supabase
    .from("users")
    .select("subordinateList")
    .eq("id", userId)
    .single();

  if (data && !error) {
    return data;
  }

  return null;
};

export const createUserApi = async (
  newUser: TUser,
  subordinateList: TUser[]
) => {
  const { data, error: createError } = await supabase
    .from("users")
    .insert([
      {
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        chief: newUser.chief ? newUser.chief : null,
        subordinateList: subordinateList,
      },
    ])
    .select("id")
    .single();

  const chiefUserSubordinateList = await getUserApi(newUser.chief!);

  // crutch
  setTimeout(async () => {
    let updatedSubordinateList = [];

    if (chiefUserSubordinateList?.subordinateList.length > 0) {
      updatedSubordinateList = [
        ...chiefUserSubordinateList?.subordinateList,
        data?.id,
      ];
    } else {
      updatedSubordinateList = [data?.id];
    }

    const { error: updateError } = await supabase
      .from("users")
      .update({
        subordinateList: updatedSubordinateList,
      })
      .eq("id", newUser.chief);
  }, 500);

  if (!createError) {
    return data;
  }

  return null;
};

export const deleteUserApi = async (userId: string) => {
  const res = await getUserApi(userId);

  if (res && res.subordinateList.length > 0) {
    return;
  }

  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("id", userId);

  if (!error) {
    return data;
  }

  return null;
};

export const getAllUsersFullnameApi = async () => {
  const { data, error } = await supabase.from("users").select("fullName, id");

  if (!error) {
    return data;
  }

  return null;
};

export const editUserApi = async (userId: string, newUserData: TUser) => {
  const { data, error } = await supabase
    .from("users")
    .update(newUserData)
    .eq("id", userId);

  if (!error) {
    return data;
  }

  return null;
};

export const getPossibleSubordinatesApi = async (userRole: string) => {
  let res;

  switch (userRole) {
    case EUserRole.admin:
      res = await supabase
        .from("users")
        .select("*")
        .or("role.eq.Manager,role.eq.User")
        .is("chief", null);
      break;

    case EUserRole.manager:
      res = await supabase
        .from("users")
        .select("*")
        .eq("role", "User")
        .is("chief", null);
      break;

    case EUserRole.user:
      return null;
  }

  if (!res?.error) {
    return res?.data;
  }

  return null;
};
