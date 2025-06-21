import {
  Paper,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDroppable, useDraggable } from '@dnd-kit/core';

const DraggableTask = ({ task, index, columnId, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: {
      taskId: task.id,
      columnId,
    },
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    background: '#190c47',
    color: '#fff',
    border: '1px solid #555',
    borderRadius: '8px',
    marginBottom: '8px',
    padding: '8px',
    cursor: 'grab',
  };

  const handleDelete = (e) => {
    e.stopPropagation(); 
    e.preventDefault();
    onDelete(task.id);
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ListItem
        secondaryAction={
          <IconButton 
            edge="end" 
            onClick={handleDelete}
            onPointerDown={(e) => e.stopPropagation()} 
            onMouseDown={(e) => e.stopPropagation()} 
            sx={{ color: 'red' }}
          >
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemText
          primary={`#${index + 1} ${task.title}`}
          secondary={task.description}
          primaryTypographyProps={{ color: 'white' }}
          secondaryTypographyProps={{ color: 'gray' }}
        />
      </ListItem>
    </div>
  );
};

const KanbanColumn = ({ column, onDeleteTask }) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <Paper
      ref={setNodeRef}
      sx={{
        p: 2,
        height: '100%',
        overflowY: 'auto',
        backgroundColor: '#190c47',
        color: '#fff',
        border: '1px solid #333',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
        {column.title}
      </Typography>
      <List>
        {column.tasks.map((task, index) => (
          <DraggableTask
            key={task.id}
            task={task}
            index={index}
            columnId={column.id}
            onDelete={(taskId) => onDeleteTask(column.id, taskId)}
          />
        ))}
      </List>
    </Paper>
  );
};

export default KanbanColumn;