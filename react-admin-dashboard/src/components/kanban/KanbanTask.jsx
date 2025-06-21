import { Paper, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const KanbanTask = ({ task, index, columnId, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task.id,
    data: {
      taskId: task.id,
      columnId,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    background: '#1e1e1e',
    color: '#fff',
    border: '1px solid #555',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'grab',
    zIndex: isDragging ? 9999 : 1,
    boxShadow: isDragging ? '0 4px 20px rgba(0,0,0,0.3)' : 'none',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div>
        <Typography variant="subtitle1" color="white">
          #{index + 1} {task.title}
        </Typography>
        <Typography variant="body2" color="gray">
          {task.description}
        </Typography>
      </div>
      <IconButton onClick={() => onDelete(task.id)} sx={{ color: 'red' }}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default KanbanTask;
