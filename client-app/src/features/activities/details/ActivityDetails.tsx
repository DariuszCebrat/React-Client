import { Card,Image,CardContent, CardHeader, CardMeta, CardDescription, Button } from "semantic-ui-react";
import { useStore } from "../../../app/store/store";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import useWindowSize from "../../hooks/useWindowsSize";
function ActivityDetails() {
  const size = useWindowSize();
  const {id} = useParams();
  const {activityStore} = useStore();
  const {selectedActivity:activity,openForm,cancelSelectedActivity,loadActivity,loadingInitial} = activityStore;

  useEffect(()=>{
    if(id) loadActivity(id);
  },[id,loadActivity])
  if(loadingInitial || !activity)return <LoadingComponent/>;
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <CardContent>
        <CardHeader>{activity.title}</CardHeader>
        <CardMeta>
          <span >{activity.date.replace("T"," ")}</span>
        </CardMeta>
        <CardDescription>
          {activity.description}
        </CardDescription>
      </CardContent>
      <CardContent extra>
        <Button.Group widths={2}>
            
            {location.pathname.includes(`/activities/${activity.id}`) || (size && size.width<800)
            ?<Button as={Link} to={`/manage/${activity.id}`} basic color='blue' content="Edit" ></Button>
            :<Button  basic color='blue' content="Edit" onClick={()=>openForm(activity.id)}></Button>
}

            {location.pathname.includes(`/activities/${activity.id}`) || (size && size.width<800)
            ?<Button as={Link} to="/activities" floated="right" type="submit" content="Cancel"/>
            :<Button basic color='grey' content="Cancel" onClick={()=>cancelSelectedActivity()}/>}
            
        </Button.Group>
      </CardContent>
    </Card>
  );
}

export default observer( ActivityDetails);
