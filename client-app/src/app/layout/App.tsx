import { useEffect } from "react";
import "./index.css";
import {  Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../store/store";
import { observer } from "mobx-react-lite";
function App() {
  const {activityStore} = useStore();
  useEffect(() => {
      activityStore.loadActivities();
  }, [activityStore]);
  
  
  if(activityStore.loadingInitial) return <LoadingComponent content="Loading activities..."/>;
  return (
    <>
      <NavBar />
      <Container>
       <ActivityDashboard />
      </Container>
    </>
  );
}

export default observer( App);
