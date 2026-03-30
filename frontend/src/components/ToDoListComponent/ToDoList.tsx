import React, { useEffect, useState } from 'react'
import styles from './ToDoList.module.css'

import NumberFlow from '@number-flow/react'

import { closestCorners, DndContext, type DragEndEvent, DragOverlay, type DragStartEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import TaskItem from './TaskItem'

import Select from '../CustomFunctionality/Select'


interface PriorityInfo {
    label: string
    color: string
}

interface Task {
    id: string
    title: string
    priority: string
    completed: boolean
    createdDate: string  
    createdTime: string 
}

const priorities: Record<string, PriorityInfo> = {
    LOW:    { label: 'LOW',    color: '#2dcc48' },
    MEDIUM: { label: 'MEDIUM', color: '#F4B400' },
    HIGH:   { label: 'HIGH',   color: '#e24540' },
}

function ToDoList(){
    

    const date = new Date();

    const [taskList, setTaskList] = useState<Task[]>(()=>{
        const saved = localStorage.getItem('taskList')
        return saved ? JSON.parse(saved) : []
    })

    useEffect(()=>{
        localStorage.setItem('taskList', JSON.stringify(taskList))
    }, [taskList])


    const taskCompleted = taskList.filter( task=> task.completed).length

    const numberOfTaskActive = taskList.length - taskCompleted

    const taskPercent = taskList.length ? Math.round((taskCompleted / taskList.length) *100) : 100

    const [newTaskPriority, setNewTaskPriority] = useState('LOW');

    const priorityColor = priorities[newTaskPriority].color

        
    const handleModelChange = (e: React.KeyboardEvent<HTMLInputElement>) => {

        const input = e.target as HTMLInputElement;
        
        if( e.key != "Enter" || !input.value.trim()) return

        setTaskList([...taskList, {id: crypto.randomUUID(),
                                   title: input.value, 
                                   priority: newTaskPriority, 
                                   completed:false,
                                   createdDate: `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`,
                                   createdTime:`${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
                                }]);        

        input.value = ""
    }

    const handleToggle = (taskId: string, checked: boolean) =>{

        setTaskList(taskList.map(task => 
                                task.id === taskId ? 
                                {...task, completed:checked} : task))
    }

    const [activeTask, setActiveTask] = useState<Task | null>(null)

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (!over || active.id === over.id) return

        setTaskList((prev) => {
            const oldIndex = prev.findIndex(t => t.id === active.id)
            const newIndex = prev.findIndex(t => t.id === over.id)
            return arrayMove(prev, oldIndex, newIndex)
        })
    }


    const handleDragStart = (event: DragStartEvent) => {
        const task = taskList.find(t => t.id === event.active.id)
        setActiveTask(task ?? null)
    }

    const toDate = (createdDate: string, cratedTime: string) =>{

        const [day, month] = createdDate.split('/')
        const year = new Date().getFullYear();
        return new Date(`${year}-${month}-${day}T${cratedTime}`)
    }
        

    const [sortBy, setSortBy] = useState<'status' | 'priority' | 'date' | null>(null)

    const sorted = [...taskList].sort((a, b) => {
        const order: Record<string, number> = { HIGH: 0, MEDIUM: 1, LOW: 2 }
        const sortByStatus = Number(a.completed) - Number(b.completed)
        const sortByPriority = order[a.priority] - order[b.priority]
        const sortByDate = toDate(a.createdDate, a.createdTime).getTime() -  toDate(b.createdDate, b.createdTime).getTime() 

        if (sortBy === 'status') return -sortByStatus
        if (sortBy === 'priority') return sortByPriority
        if (sortBy === 'date') return -sortByDate

        return 0

    })

    const deleteTask = (index: string)=>{

        const updatedTasks = taskList.filter(task => task.id !== index)
        
        setTaskList(updatedTasks)
    }

    const deleteCompletedTask = () => {

        const updatedTasks = taskList.filter(task => !task.completed)

        setTaskList(updatedTasks)
    }

    const deleteAllTask = () => {
        const confirmed = window.confirm("Sei Sicuro di eliminare tutte le task?")

        if(!confirmed) return
        
        setTaskList([])
    }

    const onChange = (value: string)=>{
        setNewTaskPriority(value)
    }


    return (
        <div className={styles.container}>
            <div className={styles.taskFrame}>
                <div className={styles.taskTitle}>
                    <div className={styles.label}>Focus Session</div>
                    <div className={styles.heading}>Daily Tasks</div>
                </div>
                <div className={styles.progressBarFrame}>
                    <div className={styles.progressLabelContainer}>
                        <div className={styles.label}>PROGRESS</div>
                        <div><NumberFlow value={taskPercent}/>%</div>
                    </div>
                    <div className={styles.progressTrack}>
                        <div className={styles.progressFill} style={{ width: `${taskPercent}%` }} />
                    </div>

                </div>
                <div className={styles.addNewTaskContainer}>
                    <input type='text' maxLength={50}
                           placeholder='Add a new Task (Press Enter to add)...'
                           className={styles.addTaskInput}
                           onKeyDown={handleModelChange}>
                    </input>
                    <div className={styles.prioritySelector}>
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="8" height="8" rx="4" fill={priorityColor}/>
                        </svg>

                        <Select options={["LOW", "MEDIUM","HIGH"]}
                                onChange={onChange}
                                placeholder={"PRIORITY:"}
                        />

                    </div>
                </div>
                <div className={styles.sortingContainer}>
                    <span>SORT BY:</span>
                    <div className={styles.sortingButtons}>
                        <button className={`${styles.simpleButton} ${sortBy === 'date' ? styles.active : ''}`}
                                onClick={() => sortBy === 'date' ? setSortBy(null) : setSortBy('date')}
                                >DATE</button>
                        <button className={`${styles.simpleButton} ${sortBy === 'priority' ? styles.active : ''}`}
                                onClick={() => sortBy === 'priority' ? setSortBy(null) : setSortBy('priority')}
                            >PRIORITY</button>
                        <button className={`${styles.simpleButton} ${sortBy === 'status' ? styles.active : ''}`} 
                                onClick={() => sortBy === 'status' ? setSortBy(null) : setSortBy('status')}
                            >STATUS</button>
                    </div>
                </div>
                <DndContext 
                    collisionDetection={closestCorners} 
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext items={taskList.map(t => t.id)} strategy={verticalListSortingStrategy}>
                        <div className={styles.taskContainer}>
                            {sorted.map((task) => <TaskItem key={task.id} task={task} onToggle={handleToggle} onDelete = {deleteTask}/>)}
                        </div>
                    </SortableContext>
                    <DragOverlay>
                        {activeTask && (
                            <div style={{ 
                                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                                borderRadius: '8px',
                                opacity: 1,
                                transform: 'scale(1.02)'   // leggermente più grande
                            }}>
                                <TaskItem task={activeTask} onToggle={handleToggle} onDelete = {deleteTask} />
                            </div>
                        )}
                    </DragOverlay>
                </DndContext>
                <div className={styles.bottomButtonsContainer}>
                    <div className={styles.clearContainer}>
                        <button className={styles.simpleButton} onClick={deleteCompletedTask}>CLEAR COMPLETED</button>
                    </div>
                    <div className={styles.clearContainer}>
                        <button className={styles.simpleButton} onClick={deleteAllTask}>CLEAR ALL</button>
                    </div>
                </div>
            </div>
            <div className={styles.contextFrame}>
                <div className={styles.infoFrame}>
                    <span className={styles.upTitle}>
                        <NumberFlow value={numberOfTaskActive}/></span>
                    <span className={styles.subtitles}>ACTIVE TASKS</span>
                </div>
                <div className={styles.infoFrame}>
                    <span className={styles.upTitle}><NumberFlow value={taskPercent} />%</span>
                    <span className={styles.subtitles}>EFFICIENCY RATE</span>
                </div>
            </div>
        </div>
    )
}



export default ToDoList