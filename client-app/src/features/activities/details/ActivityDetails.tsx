import {Grid } from "semantic-ui-react";
import { useStore } from "../../../app/store/store";
import { useParams } from "react-router-dom";
import {  useEffect } from "react";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSideBar from "./ActivityDetailedSideBar";
function ActivityDetails() {
  const {id} = useParams();
  const {activityStore} = useStore();
  const {selectedActivity:activity,loadActivity,loadingInitial} = activityStore;

  useEffect(()=>{
    if(id) loadActivity(id);
  },[id,loadActivity])
  if(loadingInitial || !activity)return <LoadingComponent/>;
  return (
    <Grid>
        <Grid.Column width="10">
          <ActivityDetailedHeader activity={activity}/>
          <ActivityDetailedInfo activity={activity}/>
          <ActivityDetailedChat/>
        </Grid.Column>
        <Grid.Column width="6">
          <ActivityDetailedSideBar activity={activity!}/>
        </Grid.Column>
    </Grid>
  );
}

export default observer( ActivityDetails);
