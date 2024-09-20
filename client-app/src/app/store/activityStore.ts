import {   makeAutoObservable, runInAction } from "mobx"
import { Activity, ActivityFormValues } from "../models/activity";
import { agent } from "../api/agent";
import {format} from "date-fns"
import { store } from "./store";
import { Profile } from "../models/profile";

export default class ActivityStore{
    activityRegistry=new Map<string,Activity>();
    selectedActivity:Activity|undefined = undefined;
    editMode=false;
    loading=false;
    loadingInitial=false;
    private getActivity=(id:string)=>this.activityRegistry.get(id);
    constructor(){
        makeAutoObservable(this);
    }
    get activitiesByDate(){
        return Array.from(this.activityRegistry.values())
            .sort((a,b)=>a.date!.getTime()-b.date!.getTime());
    }
    get groupedActivities(){
        return Object.entries(
            this.activitiesByDate.reduce((activities,activity)=>{
                const dateShort = activity.dateShort
                activities[dateShort] = activities[dateShort]?[...activities[dateShort],activity]:[activity];
                return activities;
            },{} as {[key:string]:Activity[]})
        )
    }
    loadActivities =async ()=>{
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();
            runInAction(()=>{
                activities.forEach(activity=>{
                    this.setActivity(activity);
                })
                this.setLoadingInitial(false);
            })
        }
        catch(error){
                console.log(error)
                runInAction(()=>{
                    this.setLoadingInitial(false);
                })
        }
    }
    loadActivity = async(id:string)=>{
        let activity = this.getActivity(id);
        if(activity){
            this.selectedActivity = activity;
            return activity;
        }
        else{
            this.setLoadingInitial(true);
            try{
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(()=>{
                    this.selectedActivity = activity;
                })
                this.setLoadingInitial(false);
                return activity;
            }
            catch(error)
            {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
       
    }
    private setActivity=(activity:Activity)=>{
        const user = store.userStore.user;
        if(user){
            const isGoing = activity.profiles?.some(
                a=>a.userName===user.userName
            )
            if(isGoing){activity.isGoing = isGoing;}
            else {activity.isGoing = false;}

            activity.isHost = activity.hostUserName===user.userName;
            activity.host = activity.profiles?.find(x=>x.userName===activity.hostUserName);
        }
        activity.date = new Date(activity.date!);
        activity.dateShort = format(activity.date!, "dd MMM yyyy");
        this.activityRegistry.set(activity.id,activity);
    }
    selectActivity=(id:string)=>{
        this.selectedActivity = this.activityRegistry.get(id);
    }
    cancelSelectedActivity = ()=>{
        this.selectedActivity = undefined;
    }
    createActivity=async (activity:ActivityFormValues)=>{
        const user = store.userStore.user;
        const attendee = new Profile(user!);
        try{
            const id =await agent.Activities.create(activity);
            const newActivity = new Activity(activity);
            newActivity.hostUserName = user!.userName;
            newActivity.profiles = [attendee];
            this.setActivity(newActivity);
            runInAction(()=>{
                activity.id = id;
                this.selectedActivity = newActivity;
            })
            return id;
        }
        catch(error)
        {
            console.log(error)
            return "";
        }
    }
    updateActivity=async (activity:ActivityFormValues)=>{
        try{
            await agent.Activities.update(activity);
            runInAction(()=>{
                if(activity.id)
                {
                    const updatedActivity ={...this.getActivity(activity.id),...activity};
                    this.activityRegistry.set(activity.id,updatedActivity as Activity);
                    this.selectedActivity = updatedActivity as Activity;

                }
            })
        }
        catch(error)
        {
            console.log(error);
        }
    }
    deleteActivity = async(id:string)=>{
        this.loading=true;
        try{
            await agent.Activities.delete(id);
            runInAction(()=>{
                this.activityRegistry.delete(id);
                if(this.selectedActivity?.id ===id) this.cancelSelectedActivity();
                this.loading=false;

            })
        }
        catch(error)
        {
            console.log(error)
            this.loading=false;
        }
        
    }
    setLoadingInitial (value:boolean)
    {
        this.loadingInitial = value;
    }
    updateAttendance = async()=>{
        const user = store.userStore.user;
        this.loading = true;
        if(this.selectedActivity?.id)
            console.log("nie brak:"+ this.selectedActivity?.id)
        else
            console.log("brak")
        try{
            await agent.Activities.attend(this.selectedActivity!.id);
            runInAction(()=>{
                if(this.selectedActivity?.isGoing){
                    this.selectedActivity.profiles = this.selectedActivity.profiles
                        ?.filter( a=>a.userName!==user?.userName);
                    this.selectedActivity.isGoing = false;
                }else{
                    const attendee = new Profile(user!);
                    this.selectedActivity?.profiles?.push(attendee);
                    this.selectedActivity!.isGoing=true;
                }
                this.activityRegistry.set(this.selectedActivity!.id,this.selectedActivity!)
            })
        }
        catch(error){
            console.log(error)
        }
        finally{
            runInAction(()=>this.loading=false);
        }
    }
}