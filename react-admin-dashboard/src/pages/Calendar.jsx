import { useState, useEffect } from 'react';
import { Paper, Box } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import AddEventModal from '../components/calendar/AddEventModal';
import { saveToStorage, getFromStorage } from '../utils/localStorage';

const STORAGE_KEY = 'calendarEvents';

const Calendar = () => {
 
  const [events, setEvents] = useState(() => getFromStorage(STORAGE_KEY, []));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  
  useEffect(() => {
    saveToStorage(STORAGE_KEY, events);
  }, [events]);

  const handleDateSelect = (selectInfo) => {
    setSelectedDate({
      start: selectInfo.startStr,
      end: selectInfo.endStr || selectInfo.startStr,
    });
    setIsModalOpen(true);
  };

  const handleEventAdd = (event) => {
    const newEvent = {
      id: Date.now(),
      title: event.title,
      start: event.start, 
      end: event.end,
      location: event.location,
      repeat: event.repeat,
      allDay: true,
    };
    setEvents((prev) => [...prev, newEvent]);
    setIsModalOpen(false);
  };

  const handleEventRemove = (eventId) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
  };

  return (
    <Box
      sx={{
        width: '75vw',
        height: 'calc(100vh - 64px)', 
        overflow: 'hidden',
        bgcolor: 'background.default',
      }}
    >
      <Paper sx={{ height: '100%', width: '100%', p: 2 }}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable
          selectMirror
          editable
          dayMaxEvents
          weekends
          height="100%"
          events={events.map((e) => ({
            ...e,
            title: `${e.title} ${e.location ? '📍' + e.location : ''} ${e.repeat && e.repeat !== 'never' ? '🔁' : ''}`,
          }))}
          select={handleDateSelect}
          eventClick={(info) => {
            if (window.confirm(`Delete event "${info.event.title}"?`)) {
              handleEventRemove(Number(info.event.id));
            }
          }}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay',
          }}
        />
      </Paper>

      <AddEventModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleEventAdd}
        selectedDate={selectedDate}
      />
    </Box>
  );
};

export default Calendar;
