import { useEffect, useState } from "react";
import "./index.css";
import  { AxiosError } from "axios";
import { Container } from "semantic-ui-react";
import { type Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { agent } from "../api/agent";
import LoadingComponent from "./LoadingComponent";
function App() {
  const [isError, setIsError] = useState<boolean>(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity|undefined>(undefined);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] =useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  useEffect(() => {
      agent.Activities.list().then(response=>{
        const activities :Activity[] = [];
        response.forEach(activity=>{
          activity.date = activity.date.slice(0,activity.date.lastIndexOf(":"));
          activities.push(activity);
        })
        setActivities(activities);
        setLoading(false);
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
    setSubmitting(true);
    if(activity){
      if(activity.id)
        {
          agent.Activities.update(activity).then(()=>{
          setActivities([...activities.filter(x=>x.id!==activity.id),activity])
          setSelectedActivity(activity);
          setEditMode(false);
          setSubmitting(false);
          })
        }
        else{
          agent.Activities.create(activity).then((id)=>{
            setActivities([...activities,{...activity,id:id}]);
            setSelectedActivity(activity);
            setEditMode(false);
            setSubmitting(false);
          });
        }
    }
  }
  function handleDeleteActivity(id:string){
    setSubmitting(true);
    agent.Activities.delete(id).then(()=>{
      setActivities(activities.filter(x=>x.id!==id));
      setSubmitting(false);
    })
  }
  if(loading) return <LoadingComponent content="Loading activities..."/>;
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
       deleteActivity={handleDeleteActivity}
       submitting={submitting}/>
      </Container>
    </>
  );
}

export default App;
