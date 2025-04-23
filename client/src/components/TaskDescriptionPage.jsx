import React from 'react';
import { useParams } from 'react-router-dom';
import TaskDescription from '../components/TaskDescription';

const TaskDescriptionPage = () => {
  const { taskId } = useParams();
  return <TaskDescription taskId={taskId} />;
};

export default TaskDescriptionPage;
