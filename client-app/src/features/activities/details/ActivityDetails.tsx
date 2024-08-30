import { Card,Image,CardContent, CardHeader, CardMeta, CardDescription, Button } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
type ActivityDetailsProps = {
    activity:Activity;
};
function ActivityDetails({activity}:ActivityDetailsProps) {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <CardContent>
        <CardHeader>{activity.title}</CardHeader>
        <CardMeta>
          <span >{activity.date}</span>
        </CardMeta>
        <CardDescription>
          {activity.description}
        </CardDescription>
      </CardContent>
      <CardContent extra>
        <Button.Group widths={2}>
            <Button basic color='blue' content="Edit"></Button>
            <Button basic color='grey' content="Cancel"></Button>
        </Button.Group>
      </CardContent>
    </Card>
  );
}

export default ActivityDetails;
