import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import {
  DndContext,
  closestCorners,
  DragOverlay,
} from '@dnd-kit/core';
import KanbanColumn from '../components/kanban/KanbanColumn'; 

import AddTaskModal from '../components/kanban/AddTaskModal';
import { saveToStorage, getFromStorage } from '../utils/localStorage';

const STORAGE_KEY = 'kanbanData';

const initialColumns = {
  todo: {
    id: 'todo',
    title: 'To Do',
    tasks: [
      { id: '1', title: 'Research competitors', description: 'Analysis needed' },
      { id: '2', title: 'Design homepage', description: 'Create mockups' },
    ],
  },
  inProgress: {
    id: 'inProgress',
    title: 'In Progress',
    tasks: [
      { id: '3', title: 'Implement auth', description: 'Using JWT' },
    ],
  },
  done: {
    id: 'done',
    title: 'Done',
    tasks: [
      { id: '4', title: 'Setup project', description: 'Initial configuration' },
    ],
  },
};

const Kanban = () => {
  const [columns, setColumns] = useState(() =>
    getFromStorage(STORAGE_KEY, initialColumns)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    saveToStorage(STORAGE_KEY, columns);
  }, [columns]);

  const handleAddTask = (task) => {
    const newTask = { ...task, id: Date.now().toString() };
    setColumns((prev) => ({
      ...prev,
      todo: {
        ...prev.todo,
        tasks: [...prev.todo.tasks, newTask],
      },
    }));
    setIsModalOpen(false);
  };

  const handleDeleteTask = (columnId, taskId) => {
    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        tasks: prev[columnId].tasks.filter((task) => task.id !== taskId),
      },
    }));
  };

  const handleDragStart = (event) => {
    const { active } = event;
    const columnId = active.data.current.columnId;
    const task = columns[columnId].tasks.find(t => t.id === active.id);
    setActiveTask(task);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      setActiveTask(null);
      return;
    }

    const activeColumnId = active.data.current.columnId;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) {
      setActiveTask(null);
      return;
    }

    const activeTask = columns[activeColumnId].tasks.find(
      (task) => task.id === active.id
    );

    setColumns((prev) => ({
      ...prev,
      [activeColumnId]: {
        ...prev[activeColumnId],
        tasks: prev[activeColumnId].tasks.filter(
          (task) => task.id !== active.id
        ),
      },
      [overColumnId]: {
        ...prev[overColumnId],
        tasks: [...prev[overColumnId].tasks, activeTask],
      },
    }));

    setActiveTask(null);
  };

  return (
    <Box sx={{ height: 'calc(100vh - 100px)', p: 2, overflow: 'hidden' }}>
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" onClick={() => setIsModalOpen(true)}>
          Add New Task
        </Button>
      </Box>

      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
            height: 'calc(100% - 56px)',
            overflow: 'auto',
          }}
        >
          {Object.values(columns).map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </Box>

       
        <DragOverlay>
          {activeTask && (
            <Box
              sx={{
                background: '#1e1e1e',
                color: '#fff',
                border: '1px solid #555',
                borderRadius: '8px',
                padding: '8px',
                zIndex: 9999,
                boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
                minWidth: '200px',
              }}
            >
              <strong>{activeTask.title}</strong>
              <div style={{ fontSize: '0.85rem', marginTop: '4px' }}>
                {activeTask.description}
              </div>
            </Box>
          )}
        </DragOverlay>
      </DndContext>

      <AddTaskModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTask}
      />
    </Box>
  );
};

export default Kanban;
