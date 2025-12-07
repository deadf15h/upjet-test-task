import { EUserRole } from "../const/const";
import { TUser } from "../const/types";
import { supabase } from "./supabase";

export const getUsersApi = async () => {
  let { data, error } = await supabase.from("users").select("*");

  if (data && !error) {
    console.log("getUsersApi success");
    return data;
  }

  return null;
};

export const getUserApi = async (userId: string) => {
  let { data, error } = await supabase
    .from("users")
    .select("subordinateList")
    .eq("id", userId);

  if (data && !error) {
    console.log("getUserApi success");
    return data;
  }

  return null;
};

export const createUserApi = async (
  newUser: TUser,
  subordinateList: TUser[]
) => {
  const { data, error } = await supabase.from("users").insert([
    {
      fullName: newUser.fullName,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      chief: newUser.chief,
      subordinateList: subordinateList,
    },
  ]);

  if (!error) {
    console.log("createUserApi success");
    return data;
  }

  return null;
};

export const deleteUserApi = async (userId: string) => {
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("id", userId);

  if (!error) {
    console.log("deleteUserApi success");
    return data;
  }

  return null;
};

export const getAllUsersFullnameApi = async () => {
  const { data, error } = await supabase.from("users").select("fullName, id");

  if (!error) {
    console.log("getAllUsersFullnameApi success");
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
    console.log("editUserApi success");
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
    // .is("subordinateList", null);

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
    console.log("getPossibleSubordinatesApi success");
    return res?.data;
  }

  return null;
};
