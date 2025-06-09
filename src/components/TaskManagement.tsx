
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Calendar, User } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useEvent } from '@/contexts/EventContext';
import { useAuth } from '@/contexts/AuthContext';

interface Task {
  id: string;
  description: string;
  statut: 'EN_ATTENTE' | 'EN_COURS' | 'TERMINEE';
  dateLimite: string;
  responsable: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
}

const TaskManagement: React.FC = () => {
  const { tasks, addTask, updateTask } = useEvent();
  const { isAdmin } = useAuth();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    statut: 'EN_ATTENTE',
    priority: 'MEDIUM'
  });

  const statutLabels = {
    EN_ATTENTE: 'En Attente',
    EN_COURS: 'En Cours',
    TERMINEE: 'Terminée'
  };

  const statutColors = {
    EN_ATTENTE: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    EN_COURS: 'bg-blue-100 text-blue-800 border-blue-200',
    TERMINEE: 'bg-green-100 text-green-800 border-green-200'
  };

  const priorityColors = {
    LOW: 'bg-gray-100 text-gray-800',
    MEDIUM: 'bg-orange-100 text-orange-800',
    HIGH: 'bg-red-100 text-red-800'
  };

  const handleAddTask = () => {
    if (!newTask.description || !newTask.dateLimite || !newTask.responsable) return;

    const task: Task = {
      id: Date.now().toString(),
      description: newTask.description,
      statut: newTask.statut || 'EN_ATTENTE',
      dateLimite: newTask.dateLimite,
      responsable: newTask.responsable,
      priority: newTask.priority || 'MEDIUM'
    };

    addTask(task);
    setNewTask({ statut: 'EN_ATTENTE', priority: 'MEDIUM' });
    setIsAddingTask(false);
  };

  const updateTaskStatus = (taskId: string, newStatus: Task['statut']) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      updateTask({ ...task, statut: newStatus });
    }
  };

  const getTasksByStatus = (status: Task['statut']) => {
    return tasks.filter(task => task.statut === status);
  };

  const isOverdue = (dateLimite: string) => {
    return new Date(dateLimite) < new Date();
  };

  const TaskCard = ({ task }: { task: Task }) => (
    <Card className="mb-4 hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="space-y-3">
          <p className="font-medium text-sm">{task.description}</p>
          
          <div className="flex items-center justify-between">
            <Badge className={priorityColors[task.priority || 'MEDIUM']}>
              {task.priority}
            </Badge>
            {isOverdue(task.dateLimite) && task.statut !== 'TERMINEE' && (
              <Badge className="bg-red-100 text-red-800">
                En retard
              </Badge>
            )}
          </div>
          
          <div className="flex items-center text-xs text-muted-foreground">
            <User className="w-3 h-3 mr-1" />
            {task.responsable}
          </div>
          
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="w-3 h-3 mr-1" />
            {new Date(task.dateLimite).toLocaleDateString('fr-FR')}
          </div>
          
          <div className="flex space-x-1">
            {task.statut !== 'EN_ATTENTE' && (
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => updateTaskStatus(task.id, 'EN_ATTENTE')}
                className="text-xs"
              >
                En Attente
              </Button>
            )}
            {task.statut !== 'EN_COURS' && (
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => updateTaskStatus(task.id, 'EN_COURS')}
                className="text-xs"
              >
                En Cours
              </Button>
            )}
            {task.statut !== 'TERMINEE' && (
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => updateTaskStatus(task.id, 'TERMINEE')}
                className="text-xs"
              >
                Terminée
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-emi-blue">Gestion des Tâches</h2>
          <p className="text-muted-foreground">Organisez et suivez les tâches de votre équipe logistique</p>
        </div>
        {isAdmin && (
          <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
            <DialogTrigger asChild>
              <Button className="bg-emi-blue hover:bg-emi-darkblue">
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle Tâche
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Créer une Nouvelle Tâche</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="description">Description de la Tâche</Label>
                  <Textarea
                    id="description"
                    value={newTask.description || ''}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    placeholder="Décrivez la tâche à accomplir..."
                  />
                </div>
                
                <div>
                  <Label htmlFor="responsable">Responsable</Label>
                  <Input
                    id="responsable"
                    value={newTask.responsable || ''}
                    onChange={(e) => setNewTask({...newTask, responsable: e.target.value})}
                    placeholder="Nom du responsable"
                  />
                </div>
                
                <div>
                  <Label htmlFor="dateLimite">Date Limite</Label>
                  <Input
                    id="dateLimite"
                    type="date"
                    value={newTask.dateLimite || ''}
                    onChange={(e) => setNewTask({...newTask, dateLimite: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="priority">Priorité</Label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={newTask.priority || 'MEDIUM'}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value as Task['priority']})}
                  >
                    <option value="LOW">Basse</option>
                    <option value="MEDIUM">Moyenne</option>
                    <option value="HIGH">Haute</option>
                  </select>
                </div>
                
                <Button onClick={handleAddTask} className="w-full">
                  Créer la Tâche
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(['EN_ATTENTE', 'EN_COURS', 'TERMINEE'] as const).map(status => (
          <div key={status} className="space-y-4">
            <Card className={`border-2 ${statutColors[status]}`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-center text-lg">
                  {statutLabels[status]}
                  <Badge className="ml-2" variant="secondary">
                    {getTasksByStatus(status).length}
                  </Badge>
                </CardTitle>
              </CardHeader>
            </Card>
            
            <div className="space-y-3">
              {getTasksByStatus(status).map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManagement;
