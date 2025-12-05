import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./utils/supabase";

function App() {
  // TODO add type
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    let { data: users, error } = await supabase.from("users").select("id");

    console.log(users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return <div className="App"></div>;
}

export default App;
