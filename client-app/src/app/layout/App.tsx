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
  const [selectedActivity, setSelectedActivity] = useState<Activity|undefined>(undefined);
  const [editMode, setEditMode] = useState<boolean>(false);
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
  function handleSelectActivity(id:string){
    setSelectedActivity(activities.find(activity=>activity.id ===id));
  }
  function handleCancelSelectedActivity(){
    setSelectedActivity(undefined);
  }
  function handleOpenForm(id?:string){
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    id ? handleSelectActivity(id) : handleCancelSelectedActivity() ;
    setEditMode(true);
  }
  function handleCloseForm(){
    setEditMode(false);
  }
  function handleCreateOrEditActivity(activity:Activity){
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    activity.id
    ? setActivities([...activities.filter(x=>x.id!==activity.id),activity])
    : setActivities([...activities,activity]);
    setEditMode(false);
    setSelectedActivity(activity);
  }
  function handleDeleteActivity(id:string){
    setActivities(activities.filter(x=>x.id!==id));
  }
  return (
    <>
      <NavBar openForm={handleOpenForm} />
      <Container>
       <ActivityDashboard 
       selectedActivity={selectedActivity}
       cancelSelectedActivity={handleCancelSelectedActivity}
       selectActivity={handleSelectActivity}
       activities={activities} 
       isError={isError}
       editMode={editMode}
       openForm={handleOpenForm}
       closeForm={handleCloseForm}
       createOrEdit = {handleCreateOrEditActivity}
       deleteActivity={handleDeleteActivity}/>
      </Container>
    </>
  );
}

export default App;
