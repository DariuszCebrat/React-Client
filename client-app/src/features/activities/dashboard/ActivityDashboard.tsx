import { Grid } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
type ActivityDashboardProps={
    activities:Activity[];
    isError:boolean;
    selectedActivity:Activity|undefined;
    cancelSelectedActivity:()=>void;
    selectActivity:(id:string)=>void;
    editMode:boolean;
    openForm:(id:string)=>void;
    closeForm:()=>void;
    createOrEdit:(activity:Activity)=>void;
    deleteActivity:(id:string)=>void;
}
function ActivityDashboard({deleteActivity,createOrEdit,activities,isError,selectedActivity,selectActivity,cancelSelectedActivity,editMode,openForm,closeForm}:ActivityDashboardProps) {
  return (
    <Grid>
        <Grid.Column width="10">
            <ActivityList 
            activities={activities}
            isError={isError} 
            selectActivity={selectActivity}
            deleteActivity={deleteActivity} />
        </Grid.Column>
        <Grid.Column width="6">
            {selectedActivity && !editMode &&
            <ActivityDetails 
            activity={selectedActivity} 
            cancelSelectedActivity={cancelSelectedActivity} 
            openForm={openForm}/>}
            {editMode &&
            <ActivityForm closeForm={closeForm} 
            activity={selectedActivity}
            createOrEdit={createOrEdit}
            />}
        </Grid.Column>
    </Grid>
  )
}

export default ActivityDashboard