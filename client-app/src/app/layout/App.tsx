import { useEffect, useState } from "react";
import "./index.css";
import axios, { AxiosError } from "axios";
import { Container } from "semantic-ui-react";
import { type Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
function App() {
  const [isError, setIsError] = useState<boolean>(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5182/Activities")
      .then((response) => {
        if (response.status === 200) {
          setActivities(response.data);
        } else {
          setIsError(true);
        }
      })
      .catch((error: AxiosError) => {
        console.log("Error:" + error.message);
        setIsError(true);
      });
  }, []);
  return (
    <>
      <NavBar />
      <Container>
       <ActivityDashboard activities={activities} isError={isError}/>
      </Container>
    </>
  );
}

export default App;
