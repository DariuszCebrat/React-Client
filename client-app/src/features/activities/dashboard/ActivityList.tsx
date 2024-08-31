import { SyntheticEvent, useState } from 'react';
import { type Activity } from '../../../app/models/activity';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
type ActivityListProps = {
    activities:Activity[];
    isError:boolean;
    selectActivity:(id:string)=>void;
    deleteActivity:(id:string)=>void;
    submitting:boolean;
}
function ActivityList({submitting,deleteActivity,activities,isError,selectActivity}:ActivityListProps) {
   const[target, setTarget] = useState<string>("");
   function handleDeleteActivity(event:SyntheticEvent<HTMLButtonElement>,id:string){
    setTarget(event.currentTarget.name);
    deleteActivity(id)
   }
    return (
    <Segment>
        <Item.Group divided>
                {isError ? (
                <Item>Application Error, contact with administrator!</Item>
                ) : Array.isArray(activities) ? (
                activities.map((activity) => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date.replace("T"," ")}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content="View" color="blue" onClick={()=>selectActivity(activity.id)}/>
                                <Button name={activity.id} loading={submitting && target===activity.id} floated='right' content="Delete" color="red" onClick={(e)=>handleDeleteActivity(e,activity.id)}/>
                                <Label basic content={activity.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))
                ) : (
                <Item>No activities available.</Item>
                )}
        </Item.Group>
    </Segment>
    
  )
}

export default ActivityList;