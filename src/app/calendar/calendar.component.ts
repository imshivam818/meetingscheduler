import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput,DateSelectArg,EventClickArg,EventApi} from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(private changeDetector:ChangeDetectorRef) { }
  calendarVisible=true;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin,
            interactionPlugin,
          timeGridPlugin,
        listPlugin],
        headerToolbar:{
          left:'prev,next today',
          center:'title',
          right:'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        initialEvents:INITIAL_EVENTS,
        weekends:true,
        editable:true,
        selectable:true,
        selectMirror:true,
        dayMaxEvents:true,
        select:this.handleDateSelect.bind(this),
        eventClick: this.handleEventClick.bind(this),
        eventsSet: this.handleEvents.bind(this)
  };
  currentEvents: EventApi[] = [];  
 
  handleCalendarToggle(){
    this.calendarVisible=!this.calendarVisible;
  }
  handleWeekendsToggle(){
    const {calendarOptions} =this;
    calendarOptions.weekends=!calendarOptions.weekends;
  }
  handleDateSelect(selectInfo:DateSelectArg){
    const title=prompt('Please enter the meeting details');
    const calenderApi= selectInfo.view.calendar;
    calenderApi.unselect();
    if(title){
      calenderApi.addEvent({
        id:createEventId(),
        title,
        start:selectInfo.startStr,
        end:selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }
  handleEventClick(clickinfo:EventClickArg){
    if(confirm(`are you sure you want to delte the event '${clickinfo.event.title}'`)){
      clickinfo.event.remove();
    }
    }
  handleEvents(events:EventApi[]){
    this.currentEvents=events;
    this.changeDetector.detectChanges();
  }

  ngOnInit(): void {
  }

}
