import { Activity } from '../../../app/models/activity';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
type ActivityListProps = {
    activities:Activity[];
    isError:boolean;
}
function ActivityList({activities,isError}:ActivityListProps) {
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
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content="View" color="blue"/>
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